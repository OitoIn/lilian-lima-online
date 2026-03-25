import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { calculateTrabalhistaScore } from "@/lib/scoring";
import { UF_LIST } from "@/lib/uf-municipios";
import { z } from "zod";
import { 
  FileText, 
  ClipboardCheck, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Upload,
  Loader2,
  Briefcase,
  Scale,
  MessageSquare,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ── Data ──

const situacoesAnalise = [
  "Verbas rescisórias não recebidas ou pagas incorretamente",
  "Horas extras não computadas ou não pagas",
  "FGTS não depositado ou depositado incorretamente",
  "Trabalho sem registro em carteira",
  "Estabilidade descumprida",
  "Adicionais de insalubridade, periculosidade ou noturno",
  "Assédio moral ou sexual no ambiente de trabalho",
  "Irregularidades em rescisão contratual",
];

const comoFunciona = [
  {
    icon: FileText,
    title: "Triagem Inicial",
    description: "Preencha o formulário com informações básicas sobre sua situação trabalhista.",
  },
  {
    icon: ClipboardCheck,
    title: "Análise Preliminar",
    description: "Nossa equipe avalia as informações e identifica as questões relevantes do seu caso.",
  },
  {
    icon: MessageSquare,
    title: "Orientação",
    description: "Entramos em contato para esclarecer seus direitos e apresentar as opções disponíveis.",
  },
];

const faqItems = [
  {
    question: "O que é a análise de causas trabalhistas?",
    answer: "É uma avaliação preliminar e informativa da sua situação laboral. Analisamos os documentos e informações fornecidas para orientar sobre possíveis direitos e caminhos disponíveis. Não se trata de promessa de resultado.",
  },
  {
    question: "A análise tem algum custo?",
    answer: "A triagem inicial é gratuita e visa entender sua situação. Caso seja identificada a necessidade de acompanhamento jurídico, os termos serão apresentados de forma clara e transparente.",
  },
  {
    question: "Preciso ter todos os documentos para fazer a triagem?",
    answer: "Não. A triagem pode ser realizada com as informações disponíveis. Orientamos sobre documentos adicionais que podem ser úteis para uma análise mais completa.",
  },
  {
    question: "Quanto tempo demora para receber um retorno?",
    answer: "Buscamos entrar em contato em até 48 horas úteis após o recebimento da triagem. O prazo pode variar conforme o volume de solicitações.",
  },
  {
    question: "Posso resolver sem ir à Justiça?",
    answer: "Em muitas situações, é possível buscar soluções extrajudiciais, como negociação direta ou mediação. Avaliamos cada caso para recomendar o caminho mais adequado.",
  },
];

// ── Validation ──

const situacoesPrincipais = [
  { value: "verbas_rescisorias", label: "Verbas rescisórias" },
  { value: "horas_extras", label: "Horas extras" },
  { value: "fgts", label: "FGTS" },
  { value: "vinculo_sem_registro", label: "Vínculo sem registro" },
  { value: "estabilidade", label: "Estabilidade" },
  { value: "adicionais", label: "Adicionais trabalhistas" },
  { value: "assedio", label: "Assédio ou irregularidades" },
  { value: "rescisao", label: "Irregularidades na rescisão" },
  { value: "outro", label: "Outra situação" },
];

const vinculoOptions = [
  { value: "empregado_ativo", label: "Ainda estou empregado(a)" },
  { value: "desligado_recente", label: "Fui desligado(a) recentemente (até 6 meses)" },
  { value: "desligado_antigo", label: "Fui desligado(a) há mais de 6 meses" },
  { value: "nunca_registrado", label: "Nunca fui registrado(a)" },
];

const step1Schema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(20),
  cidade: z.string().min(2, "Informe a cidade").max(100),
  uf: z.string().min(2, "Selecione o estado"),
  situacaoPrincipal: z.string().min(1, "Selecione a situação"),
  vinculoAtual: z.string().min(1, "Selecione o vínculo"),
  dataProblema: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato: MM/AAAA"),
  possuiDocumentos: z.string().min(1, "Selecione uma opção"),
});

// ── Inline Triage Form ──

function TriagemTrabalhistaForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [consentimento, setConsentimento] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    nomeCompleto: "",
    email: "",
    whatsapp: "",
    cidade: "",
    uf: "",
    situacaoPrincipal: "",
    vinculoAtual: "",
    dataProblema: "",
    possuiDocumentos: "",
    // Step 2
    uploadDocumentos: false,
    descricaoCaso: "",
    tentativaResolucao: "",
    testemunhasMensagens: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    gclid: "",
    fbclid: "",
    ttclid: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      gclid: urlParams.get("gclid") || "",
      fbclid: urlParams.get("fbclid") || "",
      ttclid: urlParams.get("ttclid") || "",
    });

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_hero", {
        event_category: "engagement",
        event_label: "Análise Trabalhista",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "dataProblema") {
      let masked = value.replace(/\D/g, "");
      if (masked.length >= 2) {
        masked = masked.slice(0, 2) + "/" + masked.slice(2, 6);
      }
      setFormData({ ...formData, [name]: masked });
    } else if (name === "whatsapp") {
      let masked = value.replace(/\D/g, "");
      if (masked.length > 0) {
        masked = "(" + masked;
        if (masked.length > 3) masked = masked.slice(0, 3) + ") " + masked.slice(3);
        if (masked.length > 10) masked = masked.slice(0, 10) + "-" + masked.slice(10, 14);
      }
      setFormData({ ...formData, [name]: masked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep1 = () => {
    try {
      step1Schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!consentimento) {
        toast({
          title: "Consentimento necessário",
          description: "Você precisa aceitar os termos de consentimento LGPD.",
          variant: "destructive",
        });
        return;
      }
      if (!validateStep1()) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      // Track step 1
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "submit_step1", {
          event_category: "conversion",
          event_label: "Trabalhista - Step 1",
        });
      }
    }
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentimento) {
      toast({
        title: "Consentimento necessário",
        description: "Aceite os termos de consentimento LGPD para enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const scoreData = calculateTrabalhistaScore({
        possuiDocumentos: formData.possuiDocumentos,
        situacaoPrincipal: formData.situacaoPrincipal,
        vinculoAtual: formData.vinculoAtual,
        uploadDocumentos: formData.uploadDocumentos,
        descricaoCaso: formData.descricaoCaso.trim(),
        tentativaResolucao: formData.tentativaResolucao,
        testemunhasMensagens: formData.testemunhasMensagens,
      });

      const { error } = await supabase.from("triagem_trabalhista" as any).insert({
        nome_completo: formData.nomeCompleto.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: formData.whatsapp.trim(),
        cidade: formData.cidade.trim(),
        uf: formData.uf,
        situacao_principal: formData.situacaoPrincipal,
        vinculo_atual: formData.vinculoAtual,
        data_problema: formData.dataProblema,
        possui_documentos: formData.possuiDocumentos,
        upload_documentos: formData.uploadDocumentos,
        descricao_caso: formData.descricaoCaso.trim() || null,
        tentativa_resolucao: formData.tentativaResolucao || null,
        testemunhas_mensagens: formData.testemunhasMensagens || null,
        score_total: scoreData.scoreTotal,
        score_documentos: scoreData.scoreDocumentos,
        score_tipo_caso: scoreData.scoreTipoCaso,
        score_desligamento: scoreData.scoreDesligamento,
        score_upload: scoreData.scoreUpload,
        score_descricao: scoreData.scoreDescricao,
        score_tentativa: scoreData.scoreTentativa,
        score_testemunhas: scoreData.scoreTestemunhas,
        prioridade: scoreData.prioridade,
        consentimento_lgpd: true,
        consentimento_lgpd_data: new Date().toISOString(),
        utm_source: utmParams.utm_source || null,
        utm_medium: utmParams.utm_medium || null,
        utm_campaign: utmParams.utm_campaign || null,
        gclid: utmParams.gclid || null,
        fbclid: utmParams.fbclid || null,
        ttclid: utmParams.ttclid || null,
      } as any);

      if (error) throw error;

      // Send confirmation email (non-blocking)
      supabase.functions.invoke("send-triagem-confirmation", {
        body: {
          tipo: "trabalhista",
          nome: formData.nomeCompleto.trim(),
          email: formData.email.trim().toLowerCase(),
        },
      }).catch((err) => console.error("Email error:", err));

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "submit_full", {
          event_category: "conversion",
          event_label: "Trabalhista - Full Submit",
          value: scoreData.scoreTotal,
        });
      }

      toast({
        title: "Triagem enviada!",
        description: "Recebemos sua solicitação. Redirecionando...",
      });

      const nomeParam = encodeURIComponent(formData.nomeCompleto.trim());
      setTimeout(() => {
        window.location.href = `/obrigado?nome=${nomeParam}`;
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress */}
      <nav aria-label="Progresso" className="mb-4">
        <ol className="flex items-center justify-center gap-4">
          {[
            { id: 1, name: "Dados e Situação" },
            { id: 2, name: "Complementar" },
          ].map((step, index) => (
            <li key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                currentStep >= step.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.name}
              </span>
              {index < 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Informações para análise preliminar
          </h3>

          <div className="space-y-2">
            <Label htmlFor="nomeCompleto">Nome completo *</Label>
            <Input
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleInputChange}
              placeholder="Digite seu nome completo"
              className={errors.nomeCompleto ? "border-destructive" : ""}
            />
            {errors.nomeCompleto && <p className="text-sm text-destructive">{errors.nomeCompleto}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Sua cidade"
                className={errors.cidade ? "border-destructive" : ""}
              />
              {errors.cidade && <p className="text-sm text-destructive">{errors.cidade}</p>}
            </div>
            <div className="space-y-2">
              <Label>Estado (UF) *</Label>
              <Select
                value={formData.uf}
                onValueChange={(value) => handleSelectChange("uf", value)}
              >
                <SelectTrigger className={errors.uf ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {UF_LIST.map((uf) => (
                    <SelectItem key={uf.value} value={uf.value}>{uf.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.uf && <p className="text-sm text-destructive">{errors.uf}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Situação principal *</Label>
            <Select
              value={formData.situacaoPrincipal}
              onValueChange={(value) => handleSelectChange("situacaoPrincipal", value)}
            >
              <SelectTrigger className={errors.situacaoPrincipal ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione a situação..." />
              </SelectTrigger>
              <SelectContent>
                {situacoesPrincipais.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.situacaoPrincipal && <p className="text-sm text-destructive">{errors.situacaoPrincipal}</p>}
          </div>

          <div className="space-y-3">
            <Label>Vínculo atual com a empresa *</Label>
            <RadioGroup
              value={formData.vinculoAtual}
              onValueChange={(value) => handleSelectChange("vinculoAtual", value)}
              className={errors.vinculoAtual ? "border border-destructive rounded-md p-2" : ""}
            >
              {vinculoOptions.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`vinculo-${opt.value}`} />
                  <Label htmlFor={`vinculo-${opt.value}`} className="font-normal cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.vinculoAtual && <p className="text-sm text-destructive">{errors.vinculoAtual}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataProblema">Data aproximada do problema ou desligamento *</Label>
            <Input
              id="dataProblema"
              name="dataProblema"
              value={formData.dataProblema}
              onChange={handleInputChange}
              placeholder="MM/AAAA"
              maxLength={7}
              inputMode="numeric"
              className={errors.dataProblema ? "border-destructive" : ""}
            />
            {errors.dataProblema && <p className="text-sm text-destructive">{errors.dataProblema}</p>}
          </div>

          <div className="space-y-3">
            <Label>Possui documentos básicos (carteira de trabalho, contracheques, TRCT)? *</Label>
            <RadioGroup
              value={formData.possuiDocumentos}
              onValueChange={(value) => handleSelectChange("possuiDocumentos", value)}
              className={errors.possuiDocumentos ? "border border-destructive rounded-md p-2" : ""}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="docs-sim" />
                <Label htmlFor="docs-sim" className="font-normal cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parcialmente" id="docs-parcial" />
                <Label htmlFor="docs-parcial" className="font-normal cursor-pointer">Parcialmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="docs-nao" />
                <Label htmlFor="docs-nao" className="font-normal cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
            {errors.possuiDocumentos && <p className="text-sm text-destructive">{errors.possuiDocumentos}</p>}
          </div>

          {/* LGPD Consent */}
          <div className="bg-accent/50 rounded-lg border border-secondary/30 p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consentimento"
                checked={consentimento}
                onCheckedChange={(checked) => setConsentimento(checked === true)}
                className="mt-1"
              />
              <div>
                <Label htmlFor="consentimento" className="text-sm font-normal cursor-pointer leading-relaxed">
                  Autorizo o uso dos meus dados para análise preliminar da minha situação trabalhista 
                  e contato por e-mail ou WhatsApp. Entendo que posso revogar este consentimento a 
                  qualquer momento através do e-mail{" "}
                  <a href="mailto:lilianlima.sociedade@gmail.com" className="text-primary underline">
                    lilianlima.sociedade@gmail.com
                  </a>.
                </Label>
                <p className="text-xs text-muted-foreground mt-2">
                  <Link to="/privacidade" className="underline hover:text-foreground">
                    Política de Privacidade
                  </Link>
                  {" • "}
                  Base legal: Consentimento (Art. 7º, I, LGPD)
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="button" onClick={nextStep}>
              Próxima etapa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Informações complementares (opcional)
            </h3>
            <p className="text-sm text-muted-foreground">
              Estas informações ajudam a agilizar a análise, mas não são obrigatórias.
            </p>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-secondary/50 transition-colors">
            <Checkbox
              id="uploadDocumentos"
              checked={formData.uploadDocumentos}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, uploadDocumentos: checked === true })
              }
            />
            <div className="flex-1">
              <Label htmlFor="uploadDocumentos" className="cursor-pointer font-medium">
                Tenho documentos digitalizados para enviar
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Carteira de trabalho, contracheques, TRCT, etc. (serão solicitados por e-mail seguro)
              </p>
            </div>
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricaoCaso">Descrição breve do caso</Label>
            <Textarea
              id="descricaoCaso"
              name="descricaoCaso"
              value={formData.descricaoCaso}
              onChange={handleInputChange}
              placeholder="Descreva brevemente sua situação trabalhista..."
              maxLength={500}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.descricaoCaso.length}/500 caracteres
            </p>
          </div>

          <div className="space-y-3">
            <Label>Já tentou resolver a questão de alguma forma?</Label>
            <RadioGroup
              value={formData.tentativaResolucao}
              onValueChange={(value) => handleSelectChange("tentativaResolucao", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="tentativa-sim" />
                <Label htmlFor="tentativa-sim" className="font-normal cursor-pointer">
                  Sim, tentei resolver diretamente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="tentativa-nao" />
                <Label htmlFor="tentativa-nao" className="font-normal cursor-pointer">Não</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sindicato" id="tentativa-sindicato" />
                <Label htmlFor="tentativa-sindicato" className="font-normal cursor-pointer">
                  Procurei o sindicato
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Possui testemunhas ou mensagens que comprovem a situação?</Label>
            <RadioGroup
              value={formData.testemunhasMensagens}
              onValueChange={(value) => handleSelectChange("testemunhasMensagens", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="testemunhas-sim" />
                <Label htmlFor="testemunhas-sim" className="font-normal cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parcialmente" id="testemunhas-parcial" />
                <Label htmlFor="testemunhas-parcial" className="font-normal cursor-pointer">
                  Parcialmente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="testemunhas-nao" />
                <Label htmlFor="testemunhas-nao" className="font-normal cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Seus dados serão armazenados de forma segura conforme nossa Política de Privacidade. 
            Os uploads indicados serão solicitados posteriormente por e-mail seguro.
          </p>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Triagem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

// ── Landing Page ──

export default function AnaliseTrabalhista() {
  const location = useLocation();

  useEffect(() => {
    const scrollToForm = () => {
      const hash = window.location.hash;
      if (hash === "#formulario-triagem") {
        const attemptScroll = (attempts = 0) => {
          const formSection = document.getElementById("formulario-triagem");
          if (formSection) {
            const headerOffset = 100;
            const elementPosition = formSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          } else if (attempts < 10) {
            setTimeout(() => attemptScroll(attempts + 1), 100);
          }
        };
        setTimeout(() => attemptScroll(), 500);
      }
    };

    scrollToForm();
    const handleHashChange = () => setTimeout(() => scrollToForm(), 100);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [location.pathname, location.hash]);

  return (
    <Layout>
      <Helmet>
        <title>Análise de Causas Trabalhistas | Lilian Lima Advocacia</title>
        <meta 
          name="description" 
          content="Análise preliminar e gratuita da sua situação trabalhista. Verbas rescisórias, horas extras, FGTS, vínculo sem registro e irregularidades no trabalho." 
        />
        <link rel="canonical" href="https://lilianlima.adv.br/analise-trabalhista" />
        
        <meta property="og:title" content="Análise de Causas Trabalhistas | Lilian Lima Advocacia" />
        <meta property="og:description" content="Análise preliminar da sua situação trabalhista. Orientação clara e especializada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilianlima.adv.br/analise-trabalhista" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Análise de Causas Trabalhistas | Lilian Lima Advocacia" />
        <meta name="twitter:description" content="Análise preliminar da sua situação trabalhista." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Lilian Lima Advocacia - Análise Trabalhista",
            "description": "Análise preliminar de causas trabalhistas: verbas rescisórias, horas extras, FGTS, vínculo sem registro e irregularidades.",
            "provider": {
              "@type": "LegalService",
              "name": "Lilian Lima Sociedade Individual de Advocacia",
              "telephone": "+55-11-97633-1094",
              "email": "lilianlima.sociedade@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Lutécia, 429 - Sala 4",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "03423-000",
                "addressCountry": "BR"
              }
            },
            "areaServed": "BR",
            "serviceType": "Análise Trabalhista"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="hero-gradient hero-pattern py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-secondary/30">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                OAB/SP 425.650 • Orientação em Direito do Trabalho
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 text-balance animate-fade-in">
              Análise de Causas Trabalhistas: entenda seus direitos com orientação clara.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-delay-1">
              Preencha o formulário abaixo e receba uma avaliação preliminar da sua situação 
              trabalhista. Sem compromisso, com acolhimento.
            </p>

            <Button 
              variant="hero" 
              size="lg" 
              className="animate-fade-in-delay-2"
              onClick={() => {
                const el = document.getElementById("formulario-triagem");
                if (el) {
                  const headerOffset = 100;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
            >
              Iniciar análise gratuita
              <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="text-sm text-muted-foreground mt-4 animate-fade-in-delay-3">
              Tempo estimado: ~3 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Credibilidade institucional */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-card rounded-xl border border-border p-6">
              <Briefcase className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">Experiência</h3>
              <p className="text-sm text-muted-foreground">
                Atuação dedicada em Direito do Trabalho e Previdenciário
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">Ética</h3>
              <p className="text-sm text-muted-foreground">
                Atuação pautada pelo Código de Ética da OAB
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <Scale className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">Transparência</h3>
              <p className="text-sm text-muted-foreground">
                Orientação clara, sem promessas de resultado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Situações que podem ser analisadas */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Situações que podem ser analisadas
              </h2>
              <div className="section-divider mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {situacoesAnalise.map((situacao) => (
                <div 
                  key={situacao}
                  className="flex items-start gap-3 bg-card rounded-lg border border-border p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{situacao}</span>
                </div>
              ))}
            </div>

            <p className="disclaimer mt-6 text-center">
              A existência de uma situação listada não implica automaticamente em direito a indenização ou ação judicial. 
              Cada caso é analisado individualmente.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Como funciona
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {comoFunciona.map((item, index) => (
              <div 
                key={item.title}
                className="bg-card rounded-xl border border-border p-6 text-center card-hover"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-sm text-secondary font-medium mb-2">Passo {index + 1}</div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Triagem */}
      <section id="formulario-triagem" className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Formulário de Triagem
              </h2>
              <p className="text-muted-foreground">
                Preencha as informações abaixo para uma análise preliminar da sua situação.
              </p>
            </div>

            <TriagemTrabalhistaForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Perguntas Frequentes
              </h2>
              <div className="section-divider mx-auto" />
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pl-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Dê o primeiro passo para entender seus direitos
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Preencha a triagem e receba orientação personalizada sobre sua situação trabalhista.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => {
                const el = document.getElementById("formulario-triagem");
                if (el) {
                  const headerOffset = 100;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
            >
              Iniciar análise gratuita
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer Final */}
      <section className="py-8 bg-muted/50 border-t border-border">
        <div className="container">
          <p className="disclaimer text-center max-w-3xl mx-auto">
            Conteúdo informativo; não substitui consulta jurídica. Cada caso possui particularidades 
            que devem ser analisadas individualmente. A análise de direitos trabalhistas não implica 
            em garantia de resultado ou promessa de ação judicial.
          </p>
        </div>
      </section>
    </Layout>
  );
}
