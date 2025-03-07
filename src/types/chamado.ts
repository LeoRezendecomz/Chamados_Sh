export interface Chamado {
  id: number;
  chamado_facil: string;
  chamado_sd: string;
  titulo: string;
  data_abertura: string;
  cumpriu_sla: string;
  pendencia_retorno: string;
  usuario_resp: string;
  status: string;
}

export interface NewChamado {
  chamado_facil: string;
  chamado_sd: string;
  titulo: string;
  data_abertura: string;
  cumpriu_sla: string;
  pendencia_retorno: string;
  usuario_resp: string;
  status: string;
}