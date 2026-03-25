
CREATE TABLE public.triagem_trabalhista (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  cidade text NOT NULL,
  uf text NOT NULL,
  situacao_principal text NOT NULL,
  vinculo_atual text NOT NULL,
  data_problema text NOT NULL,
  possui_documentos text NOT NULL,
  upload_documentos boolean DEFAULT false,
  descricao_caso text,
  tentativa_resolucao text,
  testemunhas_mensagens text,
  score_total integer NOT NULL DEFAULT 0,
  score_documentos integer NOT NULL DEFAULT 0,
  score_tipo_caso integer NOT NULL DEFAULT 0,
  score_desligamento integer NOT NULL DEFAULT 0,
  score_upload integer NOT NULL DEFAULT 0,
  score_descricao integer NOT NULL DEFAULT 0,
  score_tentativa integer NOT NULL DEFAULT 0,
  score_testemunhas integer NOT NULL DEFAULT 0,
  prioridade text NOT NULL DEFAULT 'nutrir',
  consentimento_lgpd boolean NOT NULL DEFAULT false,
  consentimento_lgpd_data timestamp with time zone,
  ip_address text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  gclid text,
  fbclid text,
  ttclid text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.triagem_trabalhista ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção anônima Trabalhista"
  ON public.triagem_trabalhista
  FOR INSERT
  TO public
  WITH CHECK (consentimento_lgpd = true);

CREATE TRIGGER update_triagem_trabalhista_updated_at
  BEFORE UPDATE ON public.triagem_trabalhista
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
