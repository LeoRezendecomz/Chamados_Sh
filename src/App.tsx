import React, { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Chamado, NewChamado, ChamadoStats, FilterOptions } from './types/chamado';
import { ChamadoStatsComponent } from './components/ChamadoStats';
import { FilterBar } from './components/FilterBar';
import { NewChamadoForm } from './components/NewChamadoForm';

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    pendencia: 'all',
    search: ''
  });
  
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [editingTicket, setEditingTicket] = useState<number | null>(null);
  const [editingPendencia, setEditingPendencia] = useState<number | null>(null);
  const [editingSLA, setEditingSLA] = useState<number | null>(null);
  const [tickets, setTickets] = useState<Chamado[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState<NewChamado>({
    chamado_facil: '',
    chamado_sd: '',
    titulo: '',
    data_abertura: '',
    cumpriu_sla: 'Sim',
    pendencia_retorno: 'Fácil',
    usuario_resp: '',
    status: 'Aberto'
  });

  useEffect(() => {
    fetchChamados();
  }, []);

  const fetchChamados = async () => {
    try {
      const { data, error } = await supabase
        .from('Chamados_SH')
        .select('*')
        .order('data_abertura', { ascending: true });

      if (error) {
        if (error.message.includes('connect to Supabase')) {
          setError('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
        } else {
          setError('Error fetching data. Please try again later.');
        }
        return;
      }

      setError(null);
      setTickets(data || []);
    } catch (error) {
      setError('Error connecting to the database. Please check your connection.');
      console.error('Error fetching chamados:', error);
    }
  };

  const handleAddTicket = async () => {
    try {
      const { error } = await supabase
        .from('Chamados_SH')
        .insert([newTicket]);

      if (error) throw error;

      await fetchChamados();
      setNewTicket({
        chamado_facil: '',
        chamado_sd: '',
        titulo: '',
        data_abertura: '',
        cumpriu_sla: 'Sim',
        pendencia_retorno: 'Fácil',
        usuario_resp: '',
        status: 'Aberto'
      });
      setIsAddingTicket(false);
    } catch (error) {
      console.error('Error adding ticket:', error);
      setError('Error adding new ticket. Please try again.');
    }
  };

  const handleEditTicket = async (id: number) => {
    try {
      const ticket = tickets.find(t => t.id === id);
      if (!ticket) return;

      const { error } = await supabase
        .from('Chamados_SH')
        .update({ status: ticket.status === 'Aberto' ? 'Concluído' : 'Aberto' })
        .eq('id', id);

      if (error) throw error;

      await fetchChamados();
      setEditingTicket(null);
    } catch (error) {
      console.error('Error updating ticket:', error);
      setError('Error updating ticket status. Please try again.');
    }
  };

  const handleEditPendencia = async (id: number, value: 'Fácil' | 'Nordeste') => {
    try {
      const { error } = await supabase
        .from('Chamados_SH')
        .update({ pendencia_retorno: value })
        .eq('id', id);

      if (error) throw error;

      await fetchChamados();
      setEditingPendencia(null);
    } catch (error) {
      console.error('Error updating pendencia:', error);
      setError('Error updating pendência. Please try again.');
    }
  };

  const handleEditSLA = async (id: number, value: 'Sim' | 'Não') => {
    try {
      const { error } = await supabase
        .from('Chamados_SH')
        .update({ cumpriu_sla: value })
        .eq('id', id);

      if (error) throw error;

      await fetchChamados();
      setEditingSLA(null);
    } catch (error) {
      console.error('Error updating SLA:', error);
      setError('Error updating SLA status. Please try again.');
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filters.status === 'all' || ticket.status.toLowerCase() === filters.status.toLowerCase();
    const matchesPendencia = filters.pendencia === 'all' || ticket.pendencia_retorno === filters.pendencia;
    const matchesSearch = filters.search === '' || 
      (ticket.titulo?.toLowerCase().includes(filters.search.toLowerCase()) ||
       ticket.chamado_facil?.includes(filters.search) ||
       ticket.chamado_sd?.includes(filters.search));

    return matchesStatus && matchesPendencia && matchesSearch;
  });

  const stats: ChamadoStats = {
    abertos: tickets.filter(t => t.status === 'Aberto').length,
    concluidos: tickets.filter(t => t.status === 'Concluído').length,
    nordeste: tickets.filter(t => t.pendencia_retorno === 'Nordeste').length,
    facil: tickets.filter(t => t.pendencia_retorno === 'Fácil').length
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Controle de Chamados (Nordeste/Fácil)</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <ChamadoStatsComponent stats={stats} />
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onAddNew={() => setIsAddingTicket(true)}
            stats={{ nordeste: stats.nordeste, facil: stats.facil }}
          />

          {isAddingTicket && (
            <NewChamadoForm
              chamado={newTicket}
              onChange={setNewTicket}
              onSubmit={handleAddTicket}
              onCancel={() => setIsAddingTicket(false)}
            />
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Chamado Fácil</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Chamado SD</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Data de Abertura</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cumpriu o SLA</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pendência de Retorno</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usuário Resp</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.chamado_facil}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.chamado_sd}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.titulo}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.data_abertura}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingSLA === ticket.id ? (
                        <div className="flex gap-2">
                          <select
                            className="border rounded-md px-2 py-1"
                            value={ticket.cumpriu_sla}
                            onChange={(e) => handleEditSLA(ticket.id, e.target.value as 'Sim' | 'Não')}
                          >
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </select>
                          <button
                            onClick={() => setEditingSLA(null)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={ticket.cumpriu_sla === 'Sim' ? 'text-green-600' : 'text-red-600'}>
                            {ticket.cumpriu_sla}
                          </span>
                          <button
                            onClick={() => setEditingSLA(ticket.id)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-sm ${
                      ticket.pendencia_retorno === 'Nordeste' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {editingPendencia === ticket.id ? (
                        <div className="flex gap-2">
                          <select
                            className="border rounded-md px-2 py-1"
                            value={ticket.pendencia_retorno}
                            onChange={(e) => handleEditPendencia(ticket.id, e.target.value as 'Fácil' | 'Nordeste')}
                          >
                            <option value="Fácil">Fácil</option>
                            <option value="Nordeste">Nordeste</option>
                          </select>
                          <button
                            onClick={() => setEditingPendencia(null)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {ticket.pendencia_retorno}
                          <button
                            onClick={() => setEditingPendencia(ticket.id)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.usuario_resp}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticket.status === 'Aberto' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {editingTicket === ticket.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTicket(ticket.id)}
                            className="p-1 text-green-600 hover:text-green-800"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => setEditingTicket(null)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingTicket(ticket.id)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
