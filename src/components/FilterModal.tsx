import React, { useState } from 'react';
import { UserFilters } from '../types/user';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: UserFilters;
  onApplyFilters: (filters: UserFilters) => void;
  onClearFilters: () => void;
}

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onClearFilters,
}: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState<UserFilters>(filters);

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleClear = () => {
    const emptyFilters: UserFilters = {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    };
    setTempFilters(emptyFilters);
    onClearFilters();
    onClose();
  };

  const hasActiveFilters = Object.values(tempFilters).some(value => value !== '');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Users" size="md">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={tempFilters.firstName}
            onChange={(value) => handleFilterChange('firstName', value)}
            placeholder="Filter by first name"
          />
          <Input
            label="Last Name"
            value={tempFilters.lastName}
            onChange={(value) => handleFilterChange('lastName', value)}
            placeholder="Filter by last name"
          />
          <Input
            label="Email"
            type="email"
            value={tempFilters.email}
            onChange={(value) => handleFilterChange('email', value)}
            placeholder="Filter by email"
          />
          <Input
            label="Department"
            value={tempFilters.department}
            onChange={(value) => handleFilterChange('department', value)}
            placeholder="Filter by department"
          />
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={!hasActiveFilters}
          >
            Clear All Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}