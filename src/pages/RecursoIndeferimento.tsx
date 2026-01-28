import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { 
  FileSearch, 
  ClipboardCheck, 
  FileText, 
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Shield,
  ChevronDown
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

export default function RecursoIndeferimento() {
  const handleCtaClick = () => {
    const formSection = document.getElementById("formulario-triagem");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
    // Track event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click_top", {
        event_category: "engagement",
        event_label: "Recurso Indeferimento - CTA Top",
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Recurso Administrativo no INSS - Benefício Indeferido | Lilian Lima Advocacia</title>
        <meta 
          name="description" 
          content="Teve seu benefício do INSS indeferido? Analisamos sua decisão e orientamos o melhor caminho administrativo. Avaliação preliminar gratuita." 
        />
        <link rel="canonical" href="https://lilianlima.adv.br/recurso-indeferimento" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Recurso Administrativo no INSS | Lilian Lima Advocacia" />
        <meta property="og:description" content="Teve seu benefício do INSS indeferido? Analisamos sua decisão e orientamos o melhor caminho administrativo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilianlima.adv.br/recurso-indeferimento" />
        
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
              "telephone": "+55-11-93205-9108",
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
      <section className="hero-gradient hero-pattern py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {/* Institutional Badge */}
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-secondary/30">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                OAB/SP 425.650 • Atuação em Direito Previdenciário
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance animate-fade-in">
              Recurso Administrativo no INSS: organize seus documentos e entenda seus próximos passos.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-delay-1">
              Se seu pedido foi indeferido, avaliamos a decisão e orientamos o melhor caminho administrativo.
            </p>

            <Button 
              size="lg" 
              onClick={handleCtaClick}
              className="animate-fade-in-delay-2 text-base px-8 py-6 h-auto"
            >
              Entender meu caso agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

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

      {/* Formulário de Triagem */}
      <section id="formulario-triagem" className="py-16 md:py-20 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Avaliação Preliminar do Seu Caso
              </h2>
              <p className="text-muted-foreground">
                Preencha o formulário para que possamos analisar sua situação. 
                <br />
                <span className="text-sm flex items-center justify-center gap-1 mt-2">
                  <Clock className="h-4 w-4" /> Tempo estimado: ~2 minutos
                </span>
              </p>
              <div className="section-divider mx-auto mt-4" />
            </div>

            {/* Import the triage form */}
            <TriagemRecursoForm />
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

// Inline Triage Form Component
import { useState, useEffect } from "react";
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
import { Upload, Loader2, ArrowLeft } from "lucide-react";

const steps = [
  { id: 1, name: "Qualificação" },
  { id: 2, name: "Evidências" },
];

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
  const [currentStep, setCurrentStep] = useState(1);
  const [consentimento, setConsentimento] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Passo 1
    nomeCompleto: "",
    email: "",
    whatsapp: "",
    tipoPedido: "",
    dataIndeferimento: "",
    recebeuCartaExigencias: "",
    fezRecurso: "",
    novosDocumentos: "",
    // Passo 2 (opcional)
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
          description: "Você precisa aceitar os termos de consentimento LGPD para continuar.",
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
      // Track step 1 completion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "submit_step1", {
          event_category: "conversion",
          event_label: "Recurso Indeferimento - Step 1",
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
        description: "Você precisa aceitar os termos de consentimento LGPD para enviar o formulário.",
        variant: "destructive",
      });
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

      // Send confirmation email (non-blocking)
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

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "submit_full", {
          event_category: "conversion",
          event_label: "Recurso Indeferimento - Full Submit",
          value: scoreData.scoreTotal,
        });
      }

      toast({
        title: "Triagem enviada!",
        description: "Recebemos sua solicitação. Enviamos um e-mail de confirmação.",
      });

      // Reset form
      setFormData({
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
      setConsentimento(false);
      setCurrentStep(1);
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
      {/* Progress */}
      <nav aria-label="Progresso" className="mb-8">
        <ol className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
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
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Passo 1: Qualificação rápida */}
        {currentStep === 1 && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Informações sobre o Indeferimento
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
              {errors.nomeCompleto && (
                <p className="text-sm text-destructive">{errors.nomeCompleto}</p>
              )}
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
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
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
                {errors.whatsapp && (
                  <p className="text-sm text-destructive">{errors.whatsapp}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tipo do pedido indeferido *</Label>
              <Select
                value={formData.tipoPedido}
                onValueChange={(value) => handleSelectChange("tipoPedido", value)}
              >
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
              {errors.tipoPedido && (
                <p className="text-sm text-destructive">{errors.tipoPedido}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataIndeferimento">Quando ocorreu o indeferimento? (Mês/Ano) *</Label>
              <Input
                id="dataIndeferimento"
                name="dataIndeferimento"
                value={formData.dataIndeferimento}
                onChange={handleInputChange}
                placeholder="MM/AAAA"
                maxLength={7}
                className={errors.dataIndeferimento ? "border-destructive" : ""}
              />
              {errors.dataIndeferimento && (
                <p className="text-sm text-destructive">{errors.dataIndeferimento}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Recebeu Carta de Exigências? *</Label>
              <RadioGroup
                value={formData.recebeuCartaExigencias}
                onValueChange={(value) => handleSelectChange("recebeuCartaExigencias", value)}
                className={errors.recebeuCartaExigencias ? "border border-destructive rounded-md p-2" : ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="carta-sim" />
                  <Label htmlFor="carta-sim" className="font-normal cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="carta-nao" />
                  <Label htmlFor="carta-nao" className="font-normal cursor-pointer">Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao_sei" id="carta-nao-sei" />
                  <Label htmlFor="carta-nao-sei" className="font-normal cursor-pointer">Não sei</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Fez recurso no Meu INSS? *</Label>
              <RadioGroup
                value={formData.fezRecurso}
                onValueChange={(value) => handleSelectChange("fezRecurso", value)}
                className={errors.fezRecurso ? "border border-destructive rounded-md p-2" : ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ainda_nao" id="recurso-ainda-nao" />
                  <Label htmlFor="recurso-ainda-nao" className="font-normal cursor-pointer">Ainda não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ja_recorri" id="recurso-ja" />
                  <Label htmlFor="recurso-ja" className="font-normal cursor-pointer">Já recorri</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao_sei" id="recurso-nao-sei" />
                  <Label htmlFor="recurso-nao-sei" className="font-normal cursor-pointer">Não sei</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Há novos documentos/laudos desde o indeferimento? *</Label>
              <RadioGroup
                value={formData.novosDocumentos}
                onValueChange={(value) => handleSelectChange("novosDocumentos", value)}
                className={errors.novosDocumentos ? "border border-destructive rounded-md p-2" : ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="docs-sim" />
                  <Label htmlFor="docs-sim" className="font-normal cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="docs-nao" />
                  <Label htmlFor="docs-nao" className="font-normal cursor-pointer">Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="em_andamento" id="docs-andamento" />
                  <Label htmlFor="docs-andamento" className="font-normal cursor-pointer">Em andamento</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Consentimento LGPD */}
            <div className="bg-accent/50 rounded-lg border border-secondary/30 p-4 mt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentimento"
                  checked={consentimento}
                  onCheckedChange={(checked) => setConsentimento(checked === true)}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor="consentimento" className="text-sm font-normal cursor-pointer leading-relaxed">
                    Autorizo o uso dos meus dados para análise preliminar do indeferimento e contato por e-mail ou WhatsApp. 
                    Entendo que posso revogar este consentimento a qualquer momento através do e-mail{" "}
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

            <div className="flex justify-end pt-4">
              <Button type="button" onClick={nextStep} disabled={!consentimento}>
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Passo 2: Evidências (Opcional) */}
        {currentStep === 2 && (
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
        )}
      </form>
    </div>
  );
}
