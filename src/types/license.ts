export interface License {
  id: string
  resumo: string
  estado: 'ativo' | 'terminado' | 'a_contratar'
  fornecedor_codigo: string
  conta_cg: string
  centro_atividade: string
  estrutura: string
  codigo_epico?: string
  proposta: string
  licenciamento: string
  periodo_inicio: Date
  periodo_fim: Date
  preco_sem_iva: number
  valor_mensal_sem_iva: number
  preco_com_iva: number
  valor_mensal_com_iva: number
  created_at: Date
  updated_at: Date
  created_by?: string
}

export interface Alert {
  id: string
  license_id: string
  alert_date: Date
  days_before: number
  status: 'pending' | 'sent' | 'dismissed'
  created_at: Date
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  alert_preferences?: {
    email_enabled: boolean
    days_before_expiry: number[]
  }
  created_at: Date
}