export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Chamados_SH: {
        Row: {
          id: number
          chamado_facil: string
          chamado_sd: string
          titulo: string
          data_abertura: string
          cumpriu_sla: 'Sim' | 'Não'
          pendencia_retorno: 'Fácil' | 'Nordeste'
          usuario_resp: string
          status: 'Aberto' | 'Concluído'
        }
        Insert: {
          id?: number
          chamado_facil: string
          chamado_sd: string
          titulo: string
          data_abertura: string
          cumpriu_sla: 'Sim' | 'Não'
          pendencia_retorno: 'Fácil' | 'Nordeste'
          usuario_resp: string
          status: 'Aberto' | 'Concluído'
        }
        Update: {
          id?: number
          chamado_facil?: string
          chamado_sd?: string
          titulo?: string
          data_abertura?: string
          cumpriu_sla?: 'Sim' | 'Não'
          pendencia_retorno?: 'Fácil' | 'Nordeste'
          usuario_resp?: string
          status?: 'Aberto' | 'Concluído'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
