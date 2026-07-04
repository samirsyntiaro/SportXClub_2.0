import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Clock,
  Activity,
  AlertCircle,
  Loader2
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { analyticsService } from "../../services/analytics.service";
import { Button } from "../../components/ui/button";

// TODO: Replace with actual auth context ownerId
const OWNER_ID = "owner-123";

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // TODO: Implement actual endpoint when ready
        // We will call analyticsService to fetch everything.
        // For now, since it's a placeholder service that throws "fetch is not mocking" error if not careful,
        // we will wrap the call. Since there is NO mock API and we MUST use actual service methods,
        // we'll simulate the component structure that handles the Promise from the service.
        const result = await analyticsService.getAll(OWNER_ID, { type: 'dashboard_overview' });
        setData(result);
      } catch (err: any) {
        // As requested by user: "If backend endpoints are missing, create proper service functions and TODO placeholders instead of fake data."
        // We will show the error state gracefully without mock data.
        setError("Backend API is not yet available. Implement the endpoint to see dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center text-muted-foreground space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-lg text-foreground">API Endpoint Missing</p>
        <p className="text-sm max-w-md text-center">{error}</p>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm font-mono text-left w-full max-w-lg overflow-hidden">
          <p className="text-muted-foreground mb-2">// Expected API Response Structure:</p>
          <pre className="text-xs">
{`{
  stats: {
    totalTurfs: number,
    activeTurfs: number,
    monthlyRevenue: number,
    pendingPayments: number,
    todaysBookings: number,
    upcomingBookings: number,
    reviewsCount: number,
    averageRating: number
  },
  recentActivity: {
    bookings: Array<{...}>,
    cancellations: Array<{...}>
  },
  charts: {
    revenue: Array<{month: string, amount: number}>,
    bookingTrend: Array<{date: string, count: number}>
  }
}`}
          </pre>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // If data exists, render the dashboard. (This will only happen when API is ready)
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Monitor your turf performance, bookings, and revenue.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Monthly Revenue",
            value: `₹${data.stats.monthlyRevenue}`,
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-950/30",
          },
          {
            title: "Today's Bookings",
            value: data.stats.todaysBookings,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-950/30",
          },
          {
            title: "Active Turfs",
            value: `${data.stats.activeTurfs} / ${data.stats.totalTurfs}`,
            icon: MapPin,
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-950/30",
          },
          {
            title: "Average Rating",
            value: `${data.stats.averageRating} (${data.stats.reviewsCount})`,
            icon: Star,
            color: "text-amber-600",
            bgColor: "bg-amber-50 dark:bg-amber-950/30",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {data.charts?.revenue ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.charts.revenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">No revenue data available</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Booking Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {data.charts?.bookingTrend ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.charts.bookingTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">No booking trend data available</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            {data.recentActivity?.bookings?.length > 0 ? (
              <div className="space-y-4">
                {data.recentActivity.bookings.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">{activity.time}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground text-sm">No recent activity</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}