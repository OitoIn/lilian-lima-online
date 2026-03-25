-- Tabela para triagem de Recursos Administrativos INSS
CREATE TABLE public.triagem_recurso (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Dados de contato
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  
  -- Dados do indeferimento
  tipo_pedido TEXT NOT NULL, -- beneficio_incapacidade, aposentadoria, bpc_loas, salario_maternidade, auxilio_reclusao, outro
  data_indeferimento TEXT NOT NULL, -- Mês/Ano
  recebeu_carta_exigencias TEXT NOT NULL, -- sim, nao, nao_sei
  fez_recurso TEXT NOT NULL, -- ainda_nao, ja_recorri, nao_sei
  novos_documentos TEXT NOT NULL, -- sim, nao, em_andamento
  
  -- Uploads opcionais (Passo 2)
  upload_indeferimento BOOLEAN DEFAULT false,
  upload_cnis BOOLEAN DEFAULT false,
  upload_laudos BOOLEAN DEFAULT false,
  descricao_caso TEXT,
  
  -- Scoring interno
  score_total INTEGER NOT NULL DEFAULT 0,
  score_documento_indeferimento INTEGER NOT NULL DEFAULT 0,
  score_novos_documentos INTEGER NOT NULL DEFAULT 0,
  score_carta_exigencias INTEGER NOT NULL DEFAULT 0,
  score_fez_recurso INTEGER NOT NULL DEFAULT 0,
  score_tipo_pedido INTEGER NOT NULL DEFAULT 0,
  score_data_indeferimento INTEGER NOT NULL DEFAULT 0,
  
  -- Roteamento
  prioridade TEXT NOT NULL DEFAULT 'nutrir', -- alta, analisar, nutrir
  
  -- LGPD/Compliance
  consentimento_lgpd BOOLEAN NOT NULL DEFAULT false,
  consentimento_lgpd_data TIMESTAMP WITH TIME ZONE,
  
  -- Metadados
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  gclid TEXT,
  fbclid TEXT,
  ttclid TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.triagem_recurso ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts only with LGPD consent
CREATE POLICY "Permitir inserção anônima Recurso" 
ON public.triagem_recurso 
FOR INSERT 
WITH CHECK (consentimento_lgpd = true);

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_triagem_recurso_updated_at
BEFORE UPDATE ON public.triagem_recurso
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();