import React, { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { User, UserFormData } from '../types/user';
import { transformUserToFormData } from '../utils/userTransform';
import { SearchBar } from './SearchBar';
import { FilterModal } from './FilterModal';
import { UserForm } from './UserForm';
import { UserTable } from './UserTable';
import { Pagination } from './Pagination';
import { Button } from './ui/Button';
import { ErrorAlert } from './ui/ErrorAlert';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function UserDashboard() {
  const {
    users,
    loading,
    error,
    searchTerm,
    filters,
    sortConfig,
    pagination,
    setSearchTerm,
    setFilters,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    addUser,
    updateUser,
    deleteUser,
    clearFilters,
    refetch,
  } = useUsers();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchTerm !== '';

  const handleAddUser = () => {
    setFormMode('add');
    setSelectedUser(null);
    setIsUserFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setFormMode('edit');
    setSelectedUser(user);
    setIsUserFormOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      await deleteUser(user.id);
    }
  };

  const handleUserFormSubmit = async (userData: UserFormData): Promise<boolean> => {
    if (formMode === 'add') {
      return await addUser(userData);
    } else if (selectedUser) {
      return await updateUser(selectedUser.id, userData);
    }
    return false;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getUserFormData = (): UserFormData | undefined => {
    if (formMode === 'edit' && selectedUser) {
      return transformUserToFormData(selectedUser);
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your organization's users efficiently
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                icon={RefreshCw}
                onClick={handleRefresh}
                disabled={loading || refreshing}
                className="shrink-0"
              >
                {refreshing ? <LoadingSpinner size="sm" /> : 'Refresh'}
              </Button>
              <Button
                icon={Plus}
                onClick={handleAddUser}
                className="shrink-0"
              >
                Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <ErrorAlert
              message={error}
              onRetry={handleRefresh}
              onDismiss={() => window.location.reload()}
            />
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm text-gray-600">
                {pagination.totalItems} user{pagination.totalItems !== 1 ? 's' : ''} found
                {hasActiveFilters && ' (filtered)'}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearFilters();
                    setSearchTerm('');
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        )}

        {/* User Table */}
        <div className="mb-6">
          <UserTable
            users={users}
            loading={loading}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}

        {/* Modals */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={filters}
          onApplyFilters={setFilters}
          onClearFilters={clearFilters}
        />

        <UserForm
          isOpen={isUserFormOpen}
          onClose={() => setIsUserFormOpen(false)}
          onSubmit={handleUserFormSubmit}
          initialData={getUserFormData()}
          mode={formMode}
        />
      </div>
    </div>
  );
}