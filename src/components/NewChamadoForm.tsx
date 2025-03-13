import React from 'react';
import { NewChamado } from '../types/chamado';

interface Props {
  chamado: NewChamado;
  onChange: (chamado: NewChamado) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const NewChamadoForm: React.FC<Props> = ({
  chamado,
  onChange,
  onSubmit,
  onCancel
}) => (
  <div className="mb-6 p-4 border rounded-md bg-gray-50">
    <h2 className="text-lg font-semibold mb-4">Novo Chamado</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Chamado Fácil"
        className="border rounded-md px-3 py-2"
        value={chamado.chamado_facil}
        onChange={(e) => onChange({ ...chamado, chamado_facil: e.target.value })}
      />
      <input
        type="text"
        placeholder="Chamado Service Desk"
        className="border rounded-md px-3 py-2"
        value={chamado.chamado_sd}
        onChange={(e) => onChange({ ...chamado, chamado_sd: e.target.value })}
      />
      <input
        type="text"
        placeholder="Título"
        className="border rounded-md px-3 py-2 md:col-span-2"
        value={chamado.titulo}
        onChange={(e) => onChange({ ...chamado, titulo: e.target.value })}
      />
      <select
        className="border rounded-md px-3 py-2"
        value={chamado.pendencia_retorno}
        onChange={(e) => onChange({ ...chamado, pendencia_retorno: e.target.value as 'Fácil' | 'Nordeste' })}
      >
        <option value="Fácil">Fácil</option>
        <option value="Nordeste">Nordeste</option>
      </select>
      <select
        className="border rounded-md px-3 py-2"
        value={chamado.cumpriu_sla}
        onChange={(e) => onChange({ ...chamado, cumpriu_sla: e.target.value as 'Sim' | 'Não' })}
      >
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>
      <input
        type="text"
        placeholder="Usuário Responsável"
        className="border rounded-md px-3 py-2"
        value={chamado.usuario_resp}
        onChange={(e) => onChange({ ...chamado, usuario_resp: e.target.value })}
      />
      <input
        type="date"
        placeholder="Data"
        className="border rounded-md px-3 py-2"
        value={chamado.data_abertura}
        onChange={(e) => onChange({ ...chamado, data_abertura: e.target.value })}
      />
    </div>
    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={onCancel}
        className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
      >
        Cancelar
      </button>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Adicionar
      </button>
    </div>
  </div>
);
