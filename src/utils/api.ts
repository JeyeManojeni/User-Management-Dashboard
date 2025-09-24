import { User } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new APIError(
      `API Error: ${response.status} ${response.statusText}`,
      response.status
    );
  }
  
  return response.json();
}

export const userAPI = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      return handleResponse<User[]>(response);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to fetch users. Please check your connection.');
    }
  },

  async getUser(id: number): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      return handleResponse<User>(response);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to fetch user details.');
    }
  },

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return handleResponse<User>(response);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to create user.');
    }
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...userData }),
      });
      return handleResponse<User>(response);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to update user.');
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new APIError(
          `Failed to delete user: ${response.status} ${response.statusText}`,
          response.status
        );
      }
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to delete user.');
    }
  },
};