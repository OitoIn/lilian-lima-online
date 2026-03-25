-- Tabela de triagem BPC/LOAS
CREATE TABLE public.triagem_bpc_loas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Passo 1: Qualificação rápida
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  perfil TEXT NOT NULL CHECK (perfil IN ('idoso_65', 'impedimento_longo_prazo', 'outro')),
  cadastro_unico TEXT NOT NULL CHECK (cadastro_unico IN ('tenho', 'nao_tenho', 'nao_sei')),
  renda_per_capita TEXT NOT NULL CHECK (renda_per_capita IN ('menor_1_4_sm', 'maior_igual_1_4_sm', 'nao_sei')),
  uf TEXT NOT NULL,
  municipio TEXT NOT NULL,
  
  -- Passo 2: Opcional
  nis TEXT,
  tentou_antes TEXT CHECK (tentou_antes IN ('sim', 'nao') OR tentou_antes IS NULL),
  disponibilidade TEXT CHECK (disponibilidade IN ('horario_comercial', 'horarios_alternativos') OR disponibilidade IS NULL),
  upload_rg_cpf BOOLEAN DEFAULT FALSE,
  upload_laudo_medico BOOLEAN DEFAULT FALSE,
  
  -- Scoring interno (0-100)
  score_total INTEGER NOT NULL DEFAULT 0,
  score_perfil INTEGER NOT NULL DEFAULT 0,
  score_renda INTEGER NOT NULL DEFAULT 0,
  score_cadunico INTEGER NOT NULL DEFAULT 0,
  score_documentos INTEGER NOT NULL DEFAULT 0,
  
  -- Roteamento
  prioridade TEXT NOT NULL DEFAULT 'educar' CHECK (prioridade IN ('alta', 'analisar', 'educar')),
  
  -- Consentimento LGPD (obrigatório)
  consentimento_lgpd BOOLEAN NOT NULL DEFAULT FALSE,
  consentimento_lgpd_data TIMESTAMP WITH TIME ZONE,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Tabela de triagem Cálculo Previdenciário
CREATE TABLE public.triagem_calculo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Passo 1: Qualificação rápida
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  possui_cnis TEXT NOT NULL CHECK (possui_cnis IN ('sim', 'nao', 'nao_sei')),
  tempo_contribuicao TEXT NOT NULL CHECK (tempo_contribuicao IN ('menos_10', '10_19', '20_29', '30_mais')),
  regimes TEXT[] NOT NULL DEFAULT '{}',
  trabalho_especial TEXT NOT NULL CHECK (trabalho_especial IN ('sim', 'nao', 'nao_sei')),
  
  -- Passo 2: Opcional
  objetivo TEXT CHECK (objetivo IN ('avaliar_elegibilidade', 'planejar_data', 'simular_cenarios') OR objetivo IS NULL),
  tentou_meu_inss TEXT CHECK (tentou_meu_inss IN ('sim', 'nao') OR tentou_meu_inss IS NULL),
  upload_cnis BOOLEAN DEFAULT FALSE,
  upload_rg_cpf BOOLEAN DEFAULT FALSE,
  
  -- Scoring interno (0-100)
  score_total INTEGER NOT NULL DEFAULT 0,
  score_cnis INTEGER NOT NULL DEFAULT 0,
  score_tempo INTEGER NOT NULL DEFAULT 0,
  score_regime INTEGER NOT NULL DEFAULT 0,
  score_especial INTEGER NOT NULL DEFAULT 0,
  score_documentos INTEGER NOT NULL DEFAULT 0,
  
  -- Roteamento
  prioridade TEXT NOT NULL DEFAULT 'educar' CHECK (prioridade IN ('alta', 'analisar', 'educar')),
  
  -- Consentimento LGPD (obrigatório)
  consentimento_lgpd BOOLEAN NOT NULL DEFAULT FALSE,
  consentimento_lgpd_data TIMESTAMP WITH TIME ZONE,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Enable RLS
ALTER TABLE public.triagem_bpc_loas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triagem_calculo ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir inserção anônima (formulário público)
CREATE POLICY "Permitir inserção anônima BPC/LOAS" 
ON public.triagem_bpc_loas 
FOR INSERT 
WITH CHECK (consentimento_lgpd = TRUE);

CREATE POLICY "Permitir inserção anônima Cálculo" 
ON public.triagem_calculo 
FOR INSERT 
WITH CHECK (consentimento_lgpd = TRUE);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers para updated_at
CREATE TRIGGER update_triagem_bpc_loas_updated_at
BEFORE UPDATE ON public.triagem_bpc_loas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_triagem_calculo_updated_at
BEFORE UPDATE ON public.triagem_calculo
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_triagem_bpc_loas_prioridade ON public.triagem_bpc_loas(prioridade);
CREATE INDEX idx_triagem_bpc_loas_created_at ON public.triagem_bpc_loas(created_at DESC);
CREATE INDEX idx_triagem_calculo_prioridade ON public.triagem_calculo(prioridade);
CREATE INDEX idx_triagem_calculo_created_at ON public.triagem_calculo(created_at DESC);