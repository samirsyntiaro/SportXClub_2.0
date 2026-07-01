import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Search,
  MapPin,
  MessageSquare,
  UserPlus,
  Star,
  Trophy,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

const players = [
  {
    id: 1,
    name: "Rahul Sharma",
    sport: "Cricket",
    skillLevel: "Advanced",
    location: "Mumbai, 2.3 km away",
    rating: 4.8,
    matches: 124,
    winRate: "68%",
    preferredPosition: "Batsman",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Priya Patel",
    sport: "Badminton",
    skillLevel: "Intermediate",
    location: "Mumbai, 3.1 km away",
    rating: 4.6,
    matches: 89,
    winRate: "62%",
    preferredPosition: "Singles",
    availability: "Evenings",
  },
  {
    id: 3,
    name: "Arjun Malhotra",
    sport: "Football",
    skillLevel: "Expert",
    location: "Mumbai, 1.8 km away",
    rating: 4.9,
    matches: 156,
    winRate: "74%",
    preferredPosition: "Midfielder",
    availability: "Weekdays",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    sport: "Tennis",
    skillLevel: "Advanced",
    location: "Mumbai, 4.2 km away",
    rating: 4.7,
    matches: 98,
    winRate: "71%",
    preferredPosition: "Baseline",
    availability: "Mornings",
  },
  {
    id: 5,
    name: "Vikram Singh",
    sport: "Basketball",
    skillLevel: "Intermediate",
    location: "Mumbai, 2.7 km away",
    rating: 4.5,
    matches: 76,
    winRate: "58%",
    preferredPosition: "Forward",
    availability: "Weekends",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    sport: "Volleyball",
    skillLevel: "Advanced",
    location: "Mumbai, 3.5 km away",
    rating: 4.8,
    matches: 112,
    winRate: "69%",
    preferredPosition: "Setter",
    availability: "Evenings",
  },
];

const skillColors = {
  Beginner: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Advanced: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Expert: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export function PlayerMatching() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl ">Find Players</h1>
        <p className="text-muted-foreground mt-1">Connect with players nearby and build your team</p>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search players..." className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                All Sports
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Cricket
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Football
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Tennis
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Basketball
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Players", value: "2,450" },
          { label: "Online Now", value: "342" },
          { label: "Near You", value: "128" },
          { label: "Matches Today", value: "56" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl  mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Players Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-all border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {player.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className=" mb-1">{player.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {player.sport}
                      </Badge>
                      <Badge className={`text-xs border-0 ${skillColors[player.skillLevel as keyof typeof skillColors]}`}>
                        {player.skillLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{player.location}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm ">{player.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="h-3 w-3 text-primary" />
                      <span className="text-sm ">{player.matches}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Matches</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="h-3 w-3 text-accent" />
                      <span className="text-sm ">{player.winRate}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span className="">{player.preferredPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="">{player.availability}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <UserPlus className="h-4 w-4" />
                    Invite
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" size="lg">
          Load More Players
        </Button>
      </div>
    </div>
  );
}

