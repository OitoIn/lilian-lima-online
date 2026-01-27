export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      triagem_bpc_loas: {
        Row: {
          cadastro_unico: string
          consentimento_lgpd: boolean
          consentimento_lgpd_data: string | null
          created_at: string
          disponibilidade: string | null
          email: string
          id: string
          ip_address: string | null
          municipio: string
          nis: string | null
          nome_completo: string
          perfil: string
          prioridade: string
          renda_per_capita: string
          score_cadunico: number
          score_documentos: number
          score_perfil: number
          score_renda: number
          score_total: number
          tentou_antes: string | null
          uf: string
          updated_at: string
          upload_laudo_medico: boolean | null
          upload_rg_cpf: boolean | null
          user_agent: string | null
          whatsapp: string
        }
        Insert: {
          cadastro_unico: string
          consentimento_lgpd?: boolean
          consentimento_lgpd_data?: string | null
          created_at?: string
          disponibilidade?: string | null
          email: string
          id?: string
          ip_address?: string | null
          municipio: string
          nis?: string | null
          nome_completo: string
          perfil: string
          prioridade?: string
          renda_per_capita: string
          score_cadunico?: number
          score_documentos?: number
          score_perfil?: number
          score_renda?: number
          score_total?: number
          tentou_antes?: string | null
          uf: string
          updated_at?: string
          upload_laudo_medico?: boolean | null
          upload_rg_cpf?: boolean | null
          user_agent?: string | null
          whatsapp: string
        }
        Update: {
          cadastro_unico?: string
          consentimento_lgpd?: boolean
          consentimento_lgpd_data?: string | null
          created_at?: string
          disponibilidade?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          municipio?: string
          nis?: string | null
          nome_completo?: string
          perfil?: string
          prioridade?: string
          renda_per_capita?: string
          score_cadunico?: number
          score_documentos?: number
          score_perfil?: number
          score_renda?: number
          score_total?: number
          tentou_antes?: string | null
          uf?: string
          updated_at?: string
          upload_laudo_medico?: boolean | null
          upload_rg_cpf?: boolean | null
          user_agent?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      triagem_calculo: {
        Row: {
          consentimento_lgpd: boolean
          consentimento_lgpd_data: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          nome_completo: string
          objetivo: string | null
          possui_cnis: string
          prioridade: string
          regimes: string[]
          score_cnis: number
          score_documentos: number
          score_especial: number
          score_regime: number
          score_tempo: number
          score_total: number
          tempo_contribuicao: string
          tentou_meu_inss: string | null
          trabalho_especial: string
          updated_at: string
          upload_cnis: boolean | null
          upload_rg_cpf: boolean | null
          user_agent: string | null
          whatsapp: string
        }
        Insert: {
          consentimento_lgpd?: boolean
          consentimento_lgpd_data?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          nome_completo: string
          objetivo?: string | null
          possui_cnis: string
          prioridade?: string
          regimes?: string[]
          score_cnis?: number
          score_documentos?: number
          score_especial?: number
          score_regime?: number
          score_tempo?: number
          score_total?: number
          tempo_contribuicao: string
          tentou_meu_inss?: string | null
          trabalho_especial: string
          updated_at?: string
          upload_cnis?: boolean | null
          upload_rg_cpf?: boolean | null
          user_agent?: string | null
          whatsapp: string
        }
        Update: {
          consentimento_lgpd?: boolean
          consentimento_lgpd_data?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          nome_completo?: string
          objetivo?: string | null
          possui_cnis?: string
          prioridade?: string
          regimes?: string[]
          score_cnis?: number
          score_documentos?: number
          score_especial?: number
          score_regime?: number
          score_tempo?: number
          score_total?: number
          tempo_contribuicao?: string
          tentou_meu_inss?: string | null
          trabalho_especial?: string
          updated_at?: string
          upload_cnis?: boolean | null
          upload_rg_cpf?: boolean | null
          user_agent?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      triagem_recurso: {
        Row: {
          consentimento_lgpd: boolean
          consentimento_lgpd_data: string | null
          created_at: string
          data_indeferimento: string
          descricao_caso: string | null
          email: string
          fbclid: string | null
          fez_recurso: string
          gclid: string | null
          id: string
          ip_address: string | null
          nome_completo: string
          novos_documentos: string
          prioridade: string
          recebeu_carta_exigencias: string
          score_carta_exigencias: number
          score_data_indeferimento: number
          score_documento_indeferimento: number
          score_fez_recurso: number
          score_novos_documentos: number
          score_tipo_pedido: number
          score_total: number
          tipo_pedido: string
          ttclid: string | null
          updated_at: string
          upload_cnis: boolean | null
          upload_indeferimento: boolean | null
          upload_laudos: boolean | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          whatsapp: string
        }
        Insert: {
          consentimento_lgpd?: boolean
          consentimento_lgpd_data?: string | null
          created_at?: string
          data_indeferimento: string
          descricao_caso?: string | null
          email: string
          fbclid?: string | null
          fez_recurso: string
          gclid?: string | null
          id?: string
          ip_address?: string | null
          nome_completo: string
          novos_documentos: string
          prioridade?: string
          recebeu_carta_exigencias: string
          score_carta_exigencias?: number
          score_data_indeferimento?: number
          score_documento_indeferimento?: number
          score_fez_recurso?: number
          score_novos_documentos?: number
          score_tipo_pedido?: number
          score_total?: number
          tipo_pedido: string
          ttclid?: string | null
          updated_at?: string
          upload_cnis?: boolean | null
          upload_indeferimento?: boolean | null
          upload_laudos?: boolean | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          whatsapp: string
        }
        Update: {
          consentimento_lgpd?: boolean
          consentimento_lgpd_data?: string | null
          created_at?: string
          data_indeferimento?: string
          descricao_caso?: string | null
          email?: string
          fbclid?: string | null
          fez_recurso?: string
          gclid?: string | null
          id?: string
          ip_address?: string | null
          nome_completo?: string
          novos_documentos?: string
          prioridade?: string
          recebeu_carta_exigencias?: string
          score_carta_exigencias?: number
          score_data_indeferimento?: number
          score_documento_indeferimento?: number
          score_fez_recurso?: number
          score_novos_documentos?: number
          score_tipo_pedido?: number
          score_total?: number
          tipo_pedido?: string
          ttclid?: string | null
          updated_at?: string
          upload_cnis?: boolean | null
          upload_indeferimento?: boolean | null
          upload_laudos?: boolean | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          whatsapp?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
