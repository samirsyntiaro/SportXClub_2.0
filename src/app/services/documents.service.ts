// TODO: Implement actual endpoint when ready
const API_BASE = '/api/owner';

/**
 * Service for documents
 * All requests must include ownerId to ensure data isolation.
 */
export const documentsService = {
  getAll: async (ownerId: string, params?: Record<string, any>) => {
    try {
      const queryParams = new URLSearchParams({ ownerId, ...params }).toString();
      const response = await fetch(`${API_BASE}/documents?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },
  getById: async (ownerId: string, id: string) => {
    try {
      const response = await fetch(`${API_BASE}/documents/${id}?ownerId=${ownerId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching documents details:', error);
      throw error;
    }
  },
  create: async (ownerId: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ownerId }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error creating documents:', error);
      throw error;
    }
  },
  update: async (ownerId: string, id: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE}/documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ownerId }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error updating documents:', error);
      throw error;
    }
  },
  delete: async (ownerId: string, id: string) => {
    try {
      const response = await fetch(`${API_BASE}/documents/${id}?ownerId=${ownerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error deleting documents:', error);
      throw error;
    }
  }
};
