import React from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import { FilterOptions } from '../types/chamado';

interface Props {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onAddNew: () => void;
  stats: { nordeste: number; facil: number };
}

export const FilterBar: React.FC<Props> = ({
  filters,
  onFilterChange,
  onAddNew,
  stats
}) => (
  <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="text-gray-500" />
        <select
          className="border rounded-md px-3 py-2"
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          <option value="all">Todos os Status</option>
          <option value="aberto">Abertos</option>
          <option value="concluído">Concluídos</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="text-gray-500" />
        <select
          className="border rounded-md px-3 py-2"
          value={filters.pendencia}
          onChange={(e) => onFilterChange({ ...filters, pendencia: e.target.value })}
        >
          <option value="all">Todas as Pendências</option>
          <option value="Fácil">Fácil ({stats.facil})</option>
          <option value="Nordeste">Nordeste ({stats.nordeste})</option>
        </select>
      </div>
      
      <button
        onClick={onAddNew}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} />
        Novo Chamado
      </button>
    </div>
    
    <div className="relative flex items-center w-full md:w-auto">
      <Search className="absolute left-3 text-gray-500" />
      <input
        type="text"
        placeholder="Pesquisar chamados..."
        className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      />
    </div>
  </div>
);
