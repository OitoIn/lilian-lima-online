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
import { calculateRecursoScore } from "@/lib/scoring";
import { z } from "zod";
import { 
  FileSearch, 
  ClipboardCheck, 
  FileText, 
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Shield,
  ChevronDown,
  Upload,
  Loader2,
  ArrowLeft
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const comoFunciona = [
  {
    icon: FileSearch,
    title: "Análise do Indeferimento",
    description: "Avaliamos a decisão do INSS e identificamos os motivos do indeferimento do seu benefício.",
  },
  {
    icon: ClipboardCheck,
    title: "Checklist Documental",
    description: "Orientamos sobre os documentos necessários e verificamos o que pode ser complementado.",
  },
  {
    icon: FileText,
    title: "Plano de Ação",
    description: "Definimos a melhor estratégia: recurso administrativo, cumprimento de exigência, novo requerimento ou, se necessário, via judicial.",
  },
];

const casosRecurso = [
  "Benefício por Incapacidade (auxílio-doença, aposentadoria por invalidez)",
  "Aposentadoria por tempo de contribuição ou idade",
  "BPC/LOAS para idosos ou pessoas com deficiência",
  "Salário-Maternidade",
  "Auxílio-Reclusão",
  "Pensão por Morte",
];

const documentosUteis = [
  "Comunicação de Indeferimento ou Extrato do Meu INSS",
  "Carta de Exigências do INSS (se recebeu)",
  "CNIS (Cadastro Nacional de Informações Sociais)",
  "Laudos e atestados médicos atualizados",
  "RG e CPF",
  "Comprovante de residência",
];

const faqItems = [
  {
    question: "Qual o prazo para recorrer de um indeferimento do INSS?",
    answer: "O prazo pode variar conforme o tipo de benefício e a situação específica. É importante consultar um profissional para avaliar o prazo aplicável ao seu caso, pois cada situação possui particularidades que podem afetar essa contagem.",
  },
  {
    question: "Qual a diferença entre recurso, cumprimento de exigência e novo requerimento?",
    answer: "O recurso é utilizado quando você discorda da decisão do INSS. O cumprimento de exigência serve para apresentar documentos solicitados pelo INSS dentro do prazo. Já o novo requerimento pode ser feito quando há novos documentos ou quando o prazo para recurso se esgotou. Cada opção tem suas vantagens dependendo da situação.",
  },
  {
    question: "Como obter o CNIS e laudos médicos?",
    answer: "O CNIS pode ser obtido pelo portal ou aplicativo Meu INSS. Laudos médicos devem ser solicitados aos profissionais de saúde que acompanham seu caso, com informações detalhadas sobre diagnóstico, tratamento e prognóstico.",
  },
  {
    question: "Posso recorrer mesmo sem todos os documentos?",
    answer: "Em alguns casos, é possível iniciar o recurso e complementar a documentação posteriormente. Contudo, ter os documentos completos desde o início pode fortalecer seu pedido. Avaliamos cada situação para orientar a melhor estratégia.",
  },
  {
    question: "O que acontece se meu recurso for negado?",
    answer: "Se o recurso administrativo for indeferido, ainda podem existir outras alternativas, como o pedido de revisão ou ações judiciais. Cada caso deve ser analisado individualmente para definir os próximos passos mais adequados.",
  },
  {
    question: "O recurso pode ser judicializado?",
    answer: "Sim. Caso as vias administrativas se esgotem ou não sejam recomendadas para o seu caso, é possível buscar a revisão da decisão do INSS através de ação judicial. Avaliamos cada situação para orientar se a judicialização é a melhor alternativa, considerando prazos, documentação disponível e particularidades do seu benefício.",
  },
];

// Inline Triage Form Component - moved before main component

const tiposPedido = [
  { value: "beneficio_incapacidade", label: "Benefício por Incapacidade" },
  { value: "aposentadoria", label: "Aposentadoria" },
  { value: "bpc_loas", label: "BPC/LOAS" },
  { value: "salario_maternidade", label: "Salário-Maternidade" },
  { value: "auxilio_reclusao", label: "Auxílio-Reclusão" },
  { value: "outro", label: "Outro" },
];

// Validation schema
const step1Schema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(20),
  tipoPedido: z.string().min(1, "Selecione o tipo de pedido"),
  dataIndeferimento: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato: MM/AAAA"),
  recebeuCartaExigencias: z.string().min(1, "Selecione uma opção"),
  fezRecurso: z.string().min(1, "Selecione uma opção"),
  novosDocumentos: z.string().min(1, "Selecione uma opção"),
});

function TriagemRecursoForm() {
  const [questionStep, setQuestionStep] = useState(0);
  const [consentimento, setConsentimento] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRequired, setShowRequired] = useState<Record<string, boolean>>({});
  const [inlineMessage, setInlineMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    whatsapp: "",
    tipoPedido: "",
    dataIndeferimento: "",
    recebeuCartaExigencias: "",
    fezRecurso: "",
    novosDocumentos: "",
    uploadIndeferimento: false,
    uploadCnis: false,
    uploadLaudos: false,
    descricaoCaso: "",
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

  const clearContactRequiredState = () => {
    setShowRequired((prev) => {
      const next = { ...prev };
      delete next.nomeCompleto;
      delete next.whatsapp;
      delete next.email;
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.nomeCompleto;
      delete next.whatsapp;
      delete next.email;
      return next;
    });
    setInlineMessage(null);
  };

  useEffect(() => {
    // Não mostrar mensagens/asteriscos ao apenas entrar em uma etapa
    if (inlineMessage) setInlineMessage(null);

    // Ao entrar na etapa final (contatos), só deve marcar obrigatório se tentar enviar.
    if (questionStep === 6) {
      clearContactRequiredState();
    }
  }, [questionStep]);

  // Capture UTM params on mount
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

    // Track form view
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_hero", {
        event_category: "engagement",
        event_label: "Recurso Indeferimento",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply mask for data indeferimento (MM/YYYY)
    if (name === "dataIndeferimento") {
      let masked = value.replace(/\D/g, "");
      if (masked.length >= 2) {
        masked = masked.slice(0, 2) + "/" + masked.slice(2, 6);
      }
      setFormData({ ...formData, [name]: masked });
    } else if (name === "whatsapp") {
      // Phone mask
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
    if (showRequired[name]) {
      setShowRequired((prev) => ({ ...prev, [name]: false }));
    }
    if (inlineMessage) setInlineMessage(null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (showRequired[name]) {
      setShowRequired((prev) => ({ ...prev, [name]: false }));
    }
    if (inlineMessage) setInlineMessage(null);
  };

  const validateAllRequired = () => {
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

  const markRequired = (keys: string[]) => {
    setShowRequired((prev) => {
      const next = { ...prev };
      keys.forEach((k) => {
        next[k] = true;
      });
      return next;
    });
  };

  const validateFields = (fields: Array<keyof z.infer<typeof step1Schema>>) => {
    try {
      step1Schema.pick(
        fields.reduce(
          (acc, k) => {
            acc[k] = true;
            return acc;
          },
          {} as Record<(typeof fields)[number], true>,
        ),
      ).parse(formData);

      setErrors((prev) => {
        const next = { ...prev };
        fields.forEach((f) => delete next[String(f)]);
        return next;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors((prev) => ({ ...prev, ...newErrors }));
      }
      return false;
    }
  };

  const handleNextQuestion = () => {
    const ok = (() => {
      switch (questionStep) {
        case 0:
          return validateFields(["tipoPedido"]);
        case 1:
          return validateFields(["dataIndeferimento"]);
        case 2:
          return validateFields(["recebeuCartaExigencias"]);
        case 3:
          return validateFields(["fezRecurso"]);
        case 4:
          return validateFields(["novosDocumentos"]);
        case 5:
          if (!consentimento) {
            return false;
          }
          return true;
        case 6:
        default:
          return true;
      }
    })();

    if (!ok) {
      if (questionStep === 0) markRequired(["tipoPedido"]);
      if (questionStep === 1) markRequired(["dataIndeferimento"]);
      if (questionStep === 2) markRequired(["recebeuCartaExigencias"]);
      if (questionStep === 3) markRequired(["fezRecurso"]);
      if (questionStep === 4) markRequired(["novosDocumentos"]);
      if (questionStep === 5) markRequired(["consentimento"]);
      setInlineMessage("Campo obrigatório");
      return;
    }

    // Ao avançar para a etapa final, garantir que não fica nenhuma marcação
    // de validação anterior (ex.: tentativa de enviar antes de preencher).
    if (questionStep === 5) {
      clearContactRequiredState();
    }

    setQuestionStep((s) => Math.min(6, s + 1));
    if (inlineMessage) setInlineMessage(null);
  };

  const handlePrevQuestion = () => {
    setQuestionStep((s) => Math.max(0, s - 1));
    if (inlineMessage) setInlineMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentimento) {
      setInlineMessage("Consentimento necessário");
      return;
    }

    if (!validateAllRequired()) {
      markRequired(["nomeCompleto", "whatsapp", "email"]);
      setInlineMessage("Campo obrigatório");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate score
      const scoreData = calculateRecursoScore({
        tipoPedido: formData.tipoPedido,
        dataIndeferimento: formData.dataIndeferimento,
        recebeuCartaExigencias: formData.recebeuCartaExigencias,
        fezRecurso: formData.fezRecurso,
        novosDocumentos: formData.novosDocumentos,
        uploadIndeferimento: formData.uploadIndeferimento,
        uploadCnis: formData.uploadCnis,
        uploadLaudos: formData.uploadLaudos,
      });

      // Insert into database
      const { error } = await supabase.from("triagem_recurso").insert({
        nome_completo: formData.nomeCompleto.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: formData.whatsapp.trim(),
        tipo_pedido: formData.tipoPedido,
        data_indeferimento: formData.dataIndeferimento,
        recebeu_carta_exigencias: formData.recebeuCartaExigencias,
        fez_recurso: formData.fezRecurso,
        novos_documentos: formData.novosDocumentos,
        upload_indeferimento: formData.uploadIndeferimento,
        upload_cnis: formData.uploadCnis,
        upload_laudos: formData.uploadLaudos,
        descricao_caso: formData.descricaoCaso.trim() || null,
        score_total: scoreData.scoreTotal,
        score_documento_indeferimento: scoreData.scoreDocumentoIndeferimento,
        score_novos_documentos: scoreData.scoreNovosDocumentos,
        score_carta_exigencias: scoreData.scoreCartaExigencias,
        score_fez_recurso: scoreData.scoreFezRecurso,
        score_tipo_pedido: scoreData.scoreTipoPedido,
        score_data_indeferimento: scoreData.scoreDataIndeferimento,
        prioridade: scoreData.prioridade,
        consentimento_lgpd: true,
        consentimento_lgpd_data: new Date().toISOString(),
        utm_source: utmParams.utm_source || null,
        utm_medium: utmParams.utm_medium || null,
        utm_campaign: utmParams.utm_campaign || null,
        gclid: utmParams.gclid || null,
        fbclid: utmParams.fbclid || null,
        ttclid: utmParams.ttclid || null,
      });

      if (error) throw error;

      // Send data to webhook (non-blocking)
      const webhookData = {
        // Informações do Lead
        nome_completo: formData.nomeCompleto.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: formData.whatsapp.trim(),
        
        // Informações do Caso
        tipo_pedido: formData.tipoPedido,
        tipo_pedido_label: tiposPedido.find(t => t.value === formData.tipoPedido)?.label || formData.tipoPedido,
        data_indeferimento: formData.dataIndeferimento,
        recebeu_carta_exigencias: formData.recebeuCartaExigencias === "sim" ? "Sim" : "Não",
        fez_recurso: formData.fezRecurso === "sim" ? "Sim" : "Não",
        novos_documentos: formData.novosDocumentos === "sim" ? "Sim" : "Não",
        descricao_caso: formData.descricaoCaso.trim() || null,
        
        // Documentos disponíveis
        tem_documento_indeferimento: formData.uploadIndeferimento ? "Sim" : "Não",
        tem_cnis: formData.uploadCnis ? "Sim" : "Não",
        tem_laudos: formData.uploadLaudos ? "Sim" : "Não",
        
        // Score e Prioridade
        score_total: scoreData.scoreTotal,
        prioridade: scoreData.prioridade,
        prioridade_label: scoreData.prioridade === "analisar" ? "Analisar" : "Nutrir",
        
        // Origem do Lead
        origem: "LP - Recurso Indeferimento",
        landing_page: "recurso-indeferimento",
        data_envio: new Date().toISOString(),
        data_envio_formatada: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        
        // UTM Parameters
        utm_source: utmParams.utm_source || null,
        utm_medium: utmParams.utm_medium || null,
        utm_campaign: utmParams.utm_campaign || null,
        gclid: utmParams.gclid || null,
        fbclid: utmParams.fbclid || null,
        ttclid: utmParams.ttclid || null,
      };

      // Send to webhook - IMPORTANTE: aguardar conclusão antes do redirect
      let webhookSent = false;
      try {
        console.log("Enviando dados para webhook...", webhookData);
        const webhookResponse = await fetch("https://hook.us2.make.com/8db9f1th9ia3fro1qdwrvfl2jyop6e3g", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        });

        if (!webhookResponse.ok) {
          console.error("Webhook response not OK:", webhookResponse.status, webhookResponse.statusText);
          const responseText = await webhookResponse.text();
          console.error("Webhook response body:", responseText);
        } else {
          webhookSent = true;
          console.log("✅ Webhook data sent successfully");
          const responseText = await webhookResponse.text();
          console.log("Webhook response:", responseText);
        }
      } catch (webhookError) {
        console.error("❌ Error sending to webhook:", webhookError);
        // Não bloqueia o fluxo se o webhook falhar
      }
      
      // Log para debug
      if (!webhookSent) {
        console.warn("⚠️ Webhook não foi enviado com sucesso, mas continuando o fluxo...");
      }

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "submit_full", {
          event_category: "conversion",
          event_label: "Recurso Indeferimento - Full Submit",
          value: scoreData.scoreTotal,
        });
      }

      // Send confirmation email (non-blocking - não espera)
      supabase.functions.invoke("send-triagem-confirmation", {
        body: {
          tipo: "recurso",
          nome: formData.nomeCompleto.trim(),
          email: formData.email.trim().toLowerCase(),
        },
      }).then(({ error: emailError }) => {
        if (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }
      });

      // Show success message
      toast({
        title: "Triagem enviada!",
        description: "Recebemos sua solicitação. Redirecionando...",
      });

      // Redirect to thank you page - webhook já foi enviado acima com await
      const nomeParam = encodeURIComponent(formData.nomeCompleto.trim());
      // Pequeno delay para garantir que tudo foi processado (webhook já foi enviado)
      setTimeout(() => {
        console.log("Redirecionando para página de obrigado...");
        window.location.href = `/obrigado.html?nome=${nomeParam}`;
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua triagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        onKeyDown={(e) => {
          // Prevent Enter from submitting the <form> early.
          // For this flow, Enter should behave like "Próxima pergunta" for steps < final.
          if (e.key !== "Enter" || e.shiftKey) return;
          if (questionStep >= 6) return;

          const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase?.() || "";
          if (tag === "textarea") return;

          e.preventDefault();
          handleNextQuestion();
        }}
      >
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Faça sua análise gratuita
          </h3>

          {questionStep === 0 && (
            <div className="space-y-2">
              <Label>
                Tipo do pedido indeferido
                {showRequired.tipoPedido && !formData.tipoPedido ? <span className="text-destructive"> *</span> : null}
              </Label>
              <Select value={formData.tipoPedido} onValueChange={(value) => handleSelectChange("tipoPedido", value)}>
                <SelectTrigger className={errors.tipoPedido ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {tiposPedido.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tipoPedido && <p className="text-sm text-destructive">{errors.tipoPedido}</p>}
            </div>
          )}

          {questionStep === 1 && (
            <div className="space-y-2">
              <Label htmlFor="dataIndeferimento">
                Quando ocorreu o indeferimento? (Mês/Ano)
                {showRequired.dataIndeferimento && !formData.dataIndeferimento ? (
                  <span className="text-destructive"> *</span>
                ) : null}
              </Label>
              <Input
                id="dataIndeferimento"
                name="dataIndeferimento"
                value={formData.dataIndeferimento}
                onChange={handleInputChange}
                placeholder="MM/AAAA"
                maxLength={7}
                inputMode="numeric"
                className={errors.dataIndeferimento ? "border-destructive" : ""}
              />
              {errors.dataIndeferimento && <p className="text-sm text-destructive">{errors.dataIndeferimento}</p>}
            </div>
          )}

          {questionStep === 2 && (
            <div className="space-y-3">
              <Label>
                Recebeu Carta de Exigências?
                {showRequired.recebeuCartaExigencias && !formData.recebeuCartaExigencias ? (
                  <span className="text-destructive"> *</span>
                ) : null}
              </Label>
              <RadioGroup
                value={formData.recebeuCartaExigencias}
                onValueChange={(value) => handleSelectChange("recebeuCartaExigencias", value)}
                className={errors.recebeuCartaExigencias ? "border border-destructive rounded-md p-2" : ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="carta-sim" />
                  <Label htmlFor="carta-sim" className="font-normal cursor-pointer">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="carta-nao" />
                  <Label htmlFor="carta-nao" className="font-normal cursor-pointer">
                    Não
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao_sei" id="carta-nao-sei" />
                  <Label htmlFor="carta-nao-sei" className="font-normal cursor-pointer">
                    Não sei
                  </Label>
                </div>
              </RadioGroup>
              {errors.recebeuCartaExigencias && (
                <p className="text-sm text-destructive">{errors.recebeuCartaExigencias}</p>
              )}
            </div>
          )}

          {questionStep === 3 && (
            <div className="space-y-3">
              <Label>
                Fez recurso no Meu INSS?
                {showRequired.fezRecurso && !formData.fezRecurso ? <span className="text-destructive"> *</span> : null}
              </Label>
              <RadioGroup
                value={formData.fezRecurso}
                onValueChange={(value) => handleSelectChange("fezRecurso", value)}
                className={errors.fezRecurso ? "border border-destructive rounded-md p-2" : ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ainda_nao" id="recurso-ainda-nao" />
                  <Label htmlFor="recurso-ainda-nao" className="font-normal cursor-pointer">
                    Ainda não
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ja_recorri" id="recurso-ja" />
                  <Label htmlFor="recurso-ja" className="font-normal cursor-pointer">
                    Já recorri
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao_sei" id="recurso-nao-sei" />
                  <Label htmlFor="recurso-nao-sei" className="font-normal cursor-pointer">
                    Não sei
                  </Label>
                </div>
              </RadioGroup>
              {errors.fezRecurso && <p className="text-sm text-destructive">{errors.fezRecurso}</p>}
            </div>
          )}

          {questionStep === 4 && (
            <div className="space-y-3">
              <Label>
                Há novos documentos/laudos desde o indeferimento?
                {showRequired.novosDocumentos && !formData.novosDocumentos ? (
                  <span className="text-destructive"> *</span>
                ) : null}
              </Label>
              <RadioGroup
                value={formData.novosDocumentos}
                onValueChange={(value) => handleSelectChange("novosDocumentos", value)}
                className={errors.novosDocumentos ? "border border-destructive rounded-md p-2" : ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="docs-sim" />
                  <Label htmlFor="docs-sim" className="font-normal cursor-pointer">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="docs-nao" />
                  <Label htmlFor="docs-nao" className="font-normal cursor-pointer">
                    Não
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="em_andamento" id="docs-andamento" />
                  <Label htmlFor="docs-andamento" className="font-normal cursor-pointer">
                    Em andamento
                  </Label>
                </div>
              </RadioGroup>
              {errors.novosDocumentos && <p className="text-sm text-destructive">{errors.novosDocumentos}</p>}
            </div>
          )}

          {questionStep === 5 && (
            <div className="space-y-3">
              <Label className="text-base">
                Autorização para uso de dados
                {showRequired.consentimento && !consentimento ? <span className="text-destructive"> *</span> : null}
              </Label>
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
                      Autorizo o uso dos meus dados para análise preliminar do indeferimento e contato por e-mail ou
                      WhatsApp. Entendo que posso revogar este consentimento a qualquer momento através do e-mail{" "}
                      <a href="mailto:lilianlima.sociedade@gmail.com" className="text-primary underline">
                        lilianlima.sociedade@gmail.com
                      </a>
                      .
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
            </div>
          )}

          {questionStep === 6 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">
                  Nome completo
                  {showRequired.nomeCompleto && !formData.nomeCompleto ? <span className="text-destructive"> *</span> : null}
                </Label>
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
                  <Label htmlFor="whatsapp">
                    WhatsApp
                    {showRequired.whatsapp && !formData.whatsapp ? <span className="text-destructive"> *</span> : null}
                  </Label>
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
                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-mail
                    {showRequired.email && !formData.email ? <span className="text-destructive"> *</span> : null}
                  </Label>
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
              </div>
            </div>
          )}

          {inlineMessage ? (
            <p className="text-sm text-destructive font-medium mt-2" role="alert">
              {inlineMessage}
            </p>
          ) : null}

          <div className="flex items-center justify-between pt-2">
            {questionStep > 0 ? (
              <Button type="button" variant="outline" onClick={handlePrevQuestion} disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <div />
            )}

            {questionStep < 6 ? (
              <Button type="button" onClick={handleNextQuestion} disabled={isSubmitting}>
                Próxima pergunta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting || !consentimento}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar dados
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Passo 2: Evidências (Opcional) - TEMPORARIAMENTE DESABILITADO
            Para reativar: descomentar o código abaixo e ajustar nextStep() */}
        {/* {currentStep === 2 && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Documentos (Opcional)
              </h3>
              <p className="text-sm text-muted-foreground">
                Enviar documentos ajuda a agilizar a análise, mas não é obrigatório neste momento.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-secondary/50 transition-colors">
                <Checkbox
                  id="uploadIndeferimento"
                  checked={formData.uploadIndeferimento}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, uploadIndeferimento: checked === true })
                  }
                />
                <div className="flex-1">
                  <Label htmlFor="uploadIndeferimento" className="cursor-pointer font-medium">
                    Decisão de Indeferimento / Comprovante
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, JPG ou PNG (até 10MB)
                  </p>
                </div>
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-secondary/50 transition-colors">
                <Checkbox
                  id="uploadCnis"
                  checked={formData.uploadCnis}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, uploadCnis: checked === true })
                  }
                />
                <div className="flex-1">
                  <Label htmlFor="uploadCnis" className="cursor-pointer font-medium">
                    CNIS (Extrato Previdenciário)
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF (até 10MB)
                  </p>
                </div>
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-secondary/50 transition-colors">
                <Checkbox
                  id="uploadLaudos"
                  checked={formData.uploadLaudos}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, uploadLaudos: checked === true })
                  }
                />
                <div className="flex-1">
                  <Label htmlFor="uploadLaudos" className="cursor-pointer font-medium">
                    Laudos / Atestados Recentes
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, JPG ou PNG (até 10MB)
                  </p>
                </div>
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricaoCaso">Descrição breve do caso (opcional)</Label>
              <Textarea
                id="descricaoCaso"
                name="descricaoCaso"
                value={formData.descricaoCaso}
                onChange={handleInputChange}
                placeholder="Descreva brevemente sua situação..."
                maxLength={400}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.descricaoCaso.length}/400 caracteres
              </p>
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
        )} */}
      </form>
    </div>
  );
}

export default function RecursoIndeferimento() {
  const location = useLocation();

  // Scroll to form when hash changes or on mount
  useEffect(() => {
    const scrollToForm = () => {
      const hash = window.location.hash;
      if (hash === "#formulario-triagem") {
        // Wait for DOM to be ready and images to load
        const attemptScroll = (attempts = 0) => {
          const formSection = document.getElementById("formulario-triagem");
          if (formSection) {
            // Calculate offset for sticky header
            const headerOffset = 100;
            const elementPosition = formSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          } else if (attempts < 10) {
            // Retry if element not found yet
            setTimeout(() => attemptScroll(attempts + 1), 100);
          }
        };

        // Initial delay to ensure page is rendered
        setTimeout(() => attemptScroll(), 500);
      }
    };

    // Scroll on mount and when location changes
    scrollToForm();

    // Also listen for hash changes
    const handleHashChange = () => {
      setTimeout(() => scrollToForm(), 100);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [location.pathname, location.hash]);

  return (
    <Layout>
      <Helmet>
        <title>Recurso Administrativo no INSS - Benefício Indeferido | Lilian Lima Advocacia</title>
        <meta 
          name="description" 
          content="Teve seu benefício do INSS indeferido? Analisamos sua decisão e orientamos o melhor caminho administrativo. Avaliação preliminar gratuita." 
        />
        <link rel="canonical" href="https://indeferidos.advocacialilianlima.com.br/recurso-indeferimento" />
        <link rel="preload" as="image" href="/recurso-hero-bg.jpg" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Recurso Administrativo no INSS | Lilian Lima Advocacia" />
        <meta property="og:description" content="Teve seu benefício do INSS indeferido? Analisamos sua decisão e orientamos o melhor caminho administrativo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://indeferidos.advocacialilianlima.com.br/recurso-indeferimento" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recurso Administrativo no INSS | Lilian Lima Advocacia" />
        <meta name="twitter:description" content="Teve seu benefício do INSS indeferido? Analisamos sua decisão e orientamos o melhor caminho administrativo." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Lilian Lima Advocacia - Recurso Administrativo INSS",
            "description": "Serviço de análise e orientação para recursos administrativos contra indeferimento de benefícios do INSS.",
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
            "serviceType": "Recurso Administrativo INSS"
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
      <section className="hero-gradient hero-pattern relative overflow-hidden py-6 md:py-10">
        <img
          src="/recurso-hero-bg.jpg"
          width={1600}
          height={900}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ opacity: 0.14 }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Tinta sutil para harmonizar a foto com a paleta do site */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 15%, hsl(var(--secondary) / 0.22) 0%, transparent 55%),
              radial-gradient(circle at 85% 35%, hsl(var(--primary) / 0.22) 0%, transparent 50%)
            `,
          }}
        />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {/* Institutional Badge */}
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-1 border border-secondary/30">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                OAB/SP 425.650 • Atuação em Direito Previdenciário e Trabalhista
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 text-balance animate-fade-in">
              Recurso Administrativo no INSS: organize seus documentos e entenda seus próximos passos.
            </h1>
            
            {/* Formulário de Triagem */}
            <div id="formulario-triagem" className="max-w-2xl mx-auto mb-6 animate-fade-in-delay-1">
              <TriagemRecursoForm />
            </div>

            <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed animate-fade-in-delay-1">
              Se seu pedido foi indeferido, avaliamos a decisão e orientamos o melhor caminho administrativo.
            </p>

            <p className="text-sm text-muted-foreground mt-6 animate-fade-in-delay-3">
              Tempo estimado: ~2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Como funciona a análise
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

      {/* Quando Faz Sentido Recorrer */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Quando pode ser recomendado recorrer
              </h2>
              <p className="text-muted-foreground">
                O recurso administrativo pode ser uma opção em diversos tipos de benefícios:
              </p>
              <div className="section-divider mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {casosRecurso.map((caso) => (
                <div 
                  key={caso}
                  className="flex items-start gap-3 bg-card rounded-lg border border-border p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{caso}</span>
                </div>
              ))}
            </div>

            <p className="disclaimer mt-8 text-center">
              Cada situação é única e deve ser analisada individualmente. O sucesso de um recurso 
              depende de diversos fatores específicos de cada caso.
            </p>
          </div>
        </div>
      </section>

      {/* Documentos Úteis */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Documentos que podem auxiliar na análise
              </h2>
              <p className="text-muted-foreground">
                Ter esses documentos organizados facilita a avaliação do seu caso:
              </p>
              <div className="section-divider mx-auto mt-4" />
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <ul className="space-y-3">
                {documentosUteis.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-accent/50 rounded-lg border border-secondary/30">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>
                    Não se preocupe se não tiver todos os documentos agora. 
                    Você pode enviá-los posteriormente após a análise inicial.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/30">
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
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Disclaimer Final */}
      <section className="py-8 bg-muted/50 border-t border-border">
        <div className="container">
          <p className="disclaimer text-center max-w-3xl mx-auto">
            Conteúdo informativo; não substitui consulta jurídica. 
            Cada caso possui particularidades que devem ser analisadas individualmente.
          </p>
        </div>
      </section>
    </Layout>
  );
}
