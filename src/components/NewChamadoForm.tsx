import React from 'react';
import { NewChamado } from '../types/chamado';

interface NewChamadoFormProps {
  chamado: NewChamado;
  onChange: (chamado: NewChamado) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function NewChamadoForm({ chamado, onChange, onSubmit, onCancel }: NewChamadoFormProps) {
  return (
    <div className="bg-gray-50 p-6 mb-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Novo Chamado</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="chamado_facil" className="block text-sm font-medium text-gray-700 mb-1">
            Chamado Fácil
          </label>
          <input
            type="text"
            id="chamado_facil"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={chamado.chamado_facil}
            onChange={(e) => onChange({ ...chamado, chamado_facil: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="chamado_sd" className="block text-sm font-medium text-gray-700 mb-1">
            Chamado SD
          </label>
          <input
            type="text"
            id="chamado_sd"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={chamado.chamado_sd}
            onChange={(e) => onChange({ ...chamado, chamado_sd: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={chamado.titulo}
            onChange={(e) => onChange({ ...chamado, titulo: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="data_abertura" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Abertura
          </label>
          <input
            type="date"
            id="data_abertura"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={chamado.data_abertura}
            onChange={(e) => onChange({ ...chamado, data_abertura: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="usuario_resp" className="block text-sm font-medium text-gray-700 mb-1">
            Usuário Responsável
          </label>
          <input
            type="text"
            id="usuario_resp"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={chamado.usuario_resp}
            onChange={(e) => onChange({ ...chamado, usuario_resp: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
