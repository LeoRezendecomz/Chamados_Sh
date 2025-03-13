import React from 'react';
import { ChamadoStats } from '../types/chamado';

interface Props {
  stats: ChamadoStats;
}

export const ChamadoStatsComponent: React.FC<Props> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Chamados Abertos</h2>
      <p className="text-2xl font-bold text-blue-600">{stats.abertos}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Chamados Concluídos</h2>
      <p className="text-2xl font-bold text-green-600">{stats.concluidos}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Pendência Nordeste</h2>
      <p className="text-2xl font-bold text-yellow-600">{stats.nordeste}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Pendência Fácil</h2>
      <p className="text-2xl font-bold text-indigo-600">{stats.facil}</p>
    </div>
  </div>
);
