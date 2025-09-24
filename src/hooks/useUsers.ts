import { useState, useEffect, useCallback } from 'react';
import { User, UserFormData, UserFilters, PaginationState, SortConfig } from '../types/user';
import { userAPI, APIError } from '../utils/api';
import { transformFormDataToUser, getUserDisplayData } from '../utils/userTransform';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<UserFilters>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await userAPI.getUsers();
      setUsers(fetchedUsers);
      setPagination(prev => ({ ...prev, totalItems: fetchedUsers.length }));
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (userData: UserFormData): Promise<boolean> => {
    try {
      setError(null);
      const newUserData = transformFormDataToUser(userData);
      const newUser = await userAPI.createUser(newUserData);
      
      // Since JSONPlaceholder returns a mock response, we'll add the user locally
      const userWithId = { ...newUser, id: Math.max(...users.map(u => u.id)) + 1 };
      setUsers(prev => [userWithId, ...prev]);
      setPagination(prev => ({ ...prev, totalItems: prev.totalItems + 1 }));
      return true;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to add user';
      setError(errorMessage);
      return false;
    }
  };

  const updateUser = async (id: number, userData: UserFormData): Promise<boolean> => {
    try {
      setError(null);
      const updatedUserData = transformFormDataToUser(userData, id);
      await userAPI.updateUser(id, updatedUserData);
      
      setUsers(prev => prev.map(user => 
        user.id === id 
          ? { ...user, ...updatedUserData } as User
          : user
      ));
      return true;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to update user';
      setError(errorMessage);
      return false;
    }
  };

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      await userAPI.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      setPagination(prev => ({ ...prev, totalItems: prev.totalItems - 1 }));
      return true;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to delete user';
      setError(errorMessage);
      return false;
    }
  };

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const displayData = getUserDisplayData(user);
    
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = (
        displayData.firstName.toLowerCase().includes(searchLower) ||
        displayData.lastName.toLowerCase().includes(searchLower) ||
        displayData.email.toLowerCase().includes(searchLower) ||
        displayData.department.toLowerCase().includes(searchLower) ||
        displayData.id.toString().includes(searchLower)
      );
      if (!matchesSearch) return false;
    }

    // Individual filters
    if (filters.firstName && !displayData.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) {
      return false;
    }
    if (filters.lastName && !displayData.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) {
      return false;
    }
    if (filters.email && !displayData.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (filters.department && !displayData.department.toLowerCase().includes(filters.department.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort logic
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aData = getUserDisplayData(a);
    const bData = getUserDisplayData(b);
    
    let aValue: string | number;
    let bValue: string | number;

    if (sortConfig.key === 'id') {
      aValue = a.id;
      bValue = b.id;
    } else {
      aValue = aData[sortConfig.key].toString().toLowerCase();
      bValue = bData[sortConfig.key].toString().toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const totalFilteredItems = sortedUsers.length;
  const totalPages = Math.ceil(totalFilteredItems / pagination.pageSize);
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pagination.pageSize);

  const handleSort = (key: keyof UserFormData | 'id') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({ 
      ...prev, 
      pageSize, 
      currentPage: 1 
    }));
  };

  const clearFilters = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return {
    users: paginatedUsers,
    loading,
    error,
    searchTerm,
    filters,
    sortConfig,
    pagination: {
      ...pagination,
      totalItems: totalFilteredItems,
      totalPages,
    },
    setSearchTerm,
    setFilters,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    addUser,
    updateUser,
    deleteUser,
    clearFilters,
    refetch: fetchUsers,
  };
}