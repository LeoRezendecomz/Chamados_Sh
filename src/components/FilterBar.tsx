import React from 'react';
import { FilterOptions } from '../types/chamado';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          <option value="all">Todos</option>
          <option value="aberto">Aberto</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label htmlFor="pendencia" className="block text-sm font-medium text-gray-700 mb-1">
          Pendência
        </label>
        <select
          id="pendencia"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={filters.pendencia}
          onChange={(e) => onFilterChange({ ...filters, pendencia: e.target.value })}
        >
          <option value="all">Todas</option>
          <option value="Fácil">Fácil</option>
          <option value="Nordeste">Nordeste</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Buscar
        </label>
        <input
          type="text"
          id="search"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Buscar por título ou número"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>
    </div>
  );
}
