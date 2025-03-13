import React from 'react';
import { ChamadoStats } from '../types/chamado';

interface ChamadoStatsComponentProps {
  stats: ChamadoStats;
}

export function ChamadoStatsComponent({ stats }: ChamadoStatsComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Chamados Abertos</h3>
        <p className="text-3xl font-bold text-green-600">{stats.abertos}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Chamados Concluídos</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.concluidos}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Pendência Nordeste</h3>
        <p className="text-3xl font-bold text-yellow-600">{stats.nordeste}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Pendência Fácil</h3>
        <p className="text-3xl font-bold text-indigo-600">{stats.facil}</p>
      </div>
    </div>
  );
}
