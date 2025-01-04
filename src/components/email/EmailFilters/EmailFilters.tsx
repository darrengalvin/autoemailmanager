import { useState, useCallback } from 'react';
import { Filter, SortAsc, SortDesc, Search, Tag, X } from 'lucide-react';

interface EmailFiltersProps {
  onFilterChange: (filters: EmailFilters) => void;
  onSortChange: (sort: EmailSort) => void;
}

interface EmailFilters {
  search: string;
  status: string[];
  priority: string[];
  category: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface EmailSort {
  field: 'date' | 'priority' | 'status';
  direction: 'asc' | 'desc';
}

const defaultFilters: EmailFilters = {
  search: '',
  status: [],
  priority: [],
  category: [],
  dateRange: { start: null, end: null }
};

export function EmailFilters({ onFilterChange, onSortChange }: EmailFiltersProps) {
  const [filters, setFilters] = useState<EmailFilters>(defaultFilters);
  const [sort, setSort] = useState<EmailSort>({
    field: 'date',
    direction: 'desc'
  });

  const handleFilterChange = useCallback((newFilters: Partial<EmailFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  }, [filters, onFilterChange]);

  const handleSortChange = useCallback((field: EmailSort['field']) => {
    const direction = sort.field === field && sort.direction === 'desc' ? 'asc' : 'desc';
    const newSort: EmailSort = { field, direction: direction as 'asc' | 'desc' };
    setSort(newSort);
    onSortChange(newSort);
  }, [sort, onSortChange]);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  }, [onFilterChange]);

  const hasActiveFilters = filters.search || 
    filters.status.length > 0 || 
    filters.priority.length > 0 || 
    filters.category.length > 0 ||
    filters.dateRange.start || 
    filters.dateRange.end;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="w-full pl-9 pr-4 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2">
          <select
            value={filters.status[0] || ''}
            onChange={(e) => handleFilterChange({ status: e.target.value ? [e.target.value] : [] })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="ai_pending">AI Processing</option>
            <option value="human_pending">Needs Review</option>
            <option value="approved">Approved</option>
          </select>

          <select
            value={filters.priority[0] || ''}
            onChange={(e) => handleFilterChange({ priority: e.target.value ? [e.target.value] : [] })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            type="date"
            value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
            onChange={(e) => handleFilterChange({
              dateRange: {
                ...filters.dateRange,
                start: e.target.value ? new Date(e.target.value) : null
              }
            })}
            className="border rounded-md px-3 py-2"
          />

          <button
            onClick={() => handleSortChange('date')}
            className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-50"
          >
            {sort.field === 'date' && sort.direction === 'desc' ? (
              <SortDesc className="w-4 h-4" />
            ) : (
              <SortAsc className="w-4 h-4" />
            )}
            Date
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              title="Clear all filters"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Advanced Filters Button */}
        <button className="flex items-center gap-2 px-3 py-2 text-primary hover:bg-primary/5 rounded-md">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
              Search: {filters.search}
              <button
                onClick={() => handleFilterChange({ search: '' })}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.status.map(status => (
            <span key={status} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Status: {status.replace('_', ' ')}
              <button
                onClick={() => handleFilterChange({ status: [] })}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.priority.map(priority => (
            <span key={priority} className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
              Priority: {priority}
              <button
                onClick={() => handleFilterChange({ priority: [] })}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.dateRange.start && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              From: {filters.dateRange.start.toLocaleDateString()}
              <button
                onClick={() => handleFilterChange({
                  dateRange: { ...filters.dateRange, start: null }
                })}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}