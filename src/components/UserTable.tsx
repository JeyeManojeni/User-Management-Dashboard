import React, { useState } from 'react';
import { Edit2, Trash2, ChevronUp, ChevronDown, User } from 'lucide-react';
import { User as UserType, UserFormData, SortConfig } from '../types/user';
import { getUserDisplayData } from '../utils/userTransform';
import { Button } from './ui/Button';
import { LoadingSkeleton } from './ui/LoadingSpinner';

interface UserTableProps {
  users: UserType[];
  loading: boolean;
  sortConfig: SortConfig;
  onSort: (key: keyof UserFormData | 'id') => void;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
}

export function UserTable({ users, loading, sortConfig, onSort, onEdit, onDelete }: UserTableProps) {
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  const handleDelete = async (user: UserType) => {
    setDeletingUserId(user.id);
    await onDelete(user);
    setDeletingUserId(null);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const SortableHeader = ({ 
    children, 
    sortKey 
  }: { 
    children: React.ReactNode; 
    sortKey: keyof UserFormData | 'id' 
  }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <button
        onClick={() => onSort(sortKey)}
        className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200"
      >
        {children}
        {getSortIcon(sortKey)}
      </button>
    </th>
  );

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-6 py-4">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader sortKey="id">ID</SortableHeader>
              <SortableHeader sortKey="firstName">First Name</SortableHeader>
              <SortableHeader sortKey="lastName">Last Name</SortableHeader>
              <SortableHeader sortKey="email">Email</SortableHeader>
              <SortableHeader sortKey="department">Department</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => {
              const displayData = getUserDisplayData(user);
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{displayData.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {displayData.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {displayData.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <a 
                      href={`mailto:${displayData.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {displayData.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {displayData.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Edit2}
                        onClick={() => onEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => handleDelete(user)}
                        disabled={deletingUserId === user.id}
                        className="text-red-600 hover:text-red-800"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}