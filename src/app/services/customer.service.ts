// TODO: Implement actual endpoint when ready
const API_BASE = '/api/owner';

/**
 * Service for customer
 * All requests must include ownerId to ensure data isolation.
 */
export const customerService = {
  getAll: async (ownerId: string, params?: Record<string, any>) => {
    try {
      const queryParams = new URLSearchParams({ ownerId, ...params }).toString();
      const response = await fetch(`${API_BASE}/customer?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },
  getById: async (ownerId: string, id: string) => {
    try {
      const response = await fetch(`${API_BASE}/customer/${id}?ownerId=${ownerId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error;
    }
  },
  create: async (ownerId: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ownerId }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },
  update: async (ownerId: string, id: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE}/customer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ownerId }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },
  delete: async (ownerId: string, id: string) => {
    try {
      const response = await fetch(`${API_BASE}/customer/${id}?ownerId=${ownerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
};
