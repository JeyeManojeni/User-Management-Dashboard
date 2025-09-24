import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from './ui/Button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOpenFilters: () => void;
  hasActiveFilters: boolean;
}

export function SearchBar({ searchTerm, onSearchChange, onOpenFilters, hasActiveFilters }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users by name, email, department, or ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
      </div>
      
      <Button
        variant="secondary"
        icon={Filter}
        onClick={onOpenFilters}
        className={`shrink-0 ${hasActiveFilters ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}`}
      >
        Filters
        {hasActiveFilters && (
          <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
            !
          </span>
        )}
      </Button>
    </div>
  );
}