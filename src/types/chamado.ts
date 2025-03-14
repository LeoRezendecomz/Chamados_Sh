export interface Chamado {
  id: number;
  chamado_facil: string;
  chamado_sd: string;
  titulo: string;
  data_abertura: string;
  cumpriu_sla: 'Sim' | 'Não';
  pendencia_retorno: 'Fácil' | 'Nordeste';
  usuario_resp: string;
  status: 'Aberto' | 'Concluído';
  observacao: string;
}

export interface NewChamado {
  chamado_facil: string;
  chamado_sd: string;
  titulo: string;
  data_abertura: string;
  cumpriu_sla: 'Sim' | 'Não';
  pendencia_retorno: 'Fácil' | 'Nordeste';
  usuario_resp: string;
  status: 'Aberto' | 'Concluído';
  observacao: string;
}

export interface ChamadoStats {
  abertos: number;
  concluidos: number;
  nordeste: number;
  facil: number;
}

export interface FilterOptions {
  status: string;
  pendencia: string;
  search: string;
}
