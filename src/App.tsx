import React, { useState, useEffect } from 'react';
import { Filter, Search, Plus, Edit2, Check, X } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Chamado, NewChamado } from './types/chamado';

function App() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [editingTicket, setEditingTicket] = useState<number | null>(null);
  const [editingPendencia, setEditingPendencia] = useState<number | null>(null);
  const [editingSLA, setEditingSLA] = useState<number | null>(null);
  
  const [tickets, setTickets] = useState<Chamado[]>([]);
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
        .order('data_abertura', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
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
    }
  };

  const handleEditPendencia = async (id: number, value: string) => {
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
    }
  };

  const handleEditSLA = async (id: number, value: string) => {
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
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.chamado_facil.includes(searchTerm) ||
      ticket.chamado_sd.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sistema de Controle de Chamados</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-500" />
                <select
                  className="border rounded-md px-3 py-2"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Todos os Status</option>
                  <option value="aberto">Abertos</option>
                  <option value="concluído">Concluídos</option>
                </select>
              </div>
              
              <button
                onClick={() => setIsAddingTicket(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={16} />
                Novo Chamado
              </button>
            </div>
            
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Pesquisar chamados..."
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isAddingTicket && (
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Novo Chamado</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Chamado Fácil"
                  className="border rounded-md px-3 py-2"
                  value={newTicket.chamado_facil}
                  onChange={(e) => setNewTicket({...newTicket, chamado_facil: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Chamado SD"
                  className="border rounded-md px-3 py-2"
                  value={newTicket.chamado_sd}
                  onChange={(e) => setNewTicket({...newTicket, chamado_sd: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Título"
                  className="border rounded-md px-3 py-2 md:col-span-2"
                  value={newTicket.titulo}
                  onChange={(e) => setNewTicket({...newTicket, titulo: e.target.value})}
                />
                <select
                  className="border rounded-md px-3 py-2"
                  value={newTicket.pendencia_retorno}
                  onChange={(e) => setNewTicket({...newTicket, pendencia_retorno: e.target.value})}
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Nordeste">Nordeste</option>
                </select>
                <select
                  className="border rounded-md px-3 py-2"
                  value={newTicket.cumpriu_sla}
                  onChange={(e) => setNewTicket({...newTicket, cumpriu_sla: e.target.value})}
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                <input
                  type="text"
                  placeholder="Usuário Responsável"
                  className="border rounded-md px-3 py-2"
                  value={newTicket.usuario_resp}
                  onChange={(e) => setNewTicket({...newTicket, usuario_resp: e.target.value})}
                />

<input
                  type="date"
                  placeholder="Data"
                  className="border rounded-md px-3 py-2"
                  value={newTicket.data_abertura}
                  onChange={(e) => setNewTicket({...newTicket, data_abertura: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsAddingTicket(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTicket}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Adicionar
                </button>
              </div>
            </div>
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
                            onChange={(e) => handleEditSLA(ticket.id, e.target.value)}
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
                          {ticket.cumpriu_sla}
                          <button
                            onClick={() => setEditingSLA(ticket.id)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingPendencia === ticket.id ? (
                        <div className="flex gap-2">
                          <select
                            className="border rounded-md px-2 py-1"
                            value={ticket.pendencia_retorno}
                            onChange={(e) => handleEditPendencia(ticket.id, e.target.value)}
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${ticket.status === 'Aberto' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
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