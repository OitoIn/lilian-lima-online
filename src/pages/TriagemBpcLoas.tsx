import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Upload, AlertCircle, ArrowRight, ArrowLeft, Shield, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UF_LIST } from "@/lib/uf-municipios";
import { calculateBpcLoasScore } from "@/lib/scoring";
import { z } from "zod";

const steps = [
  { id: 1, name: "Qualificação" },
  { id: 2, name: "Complementar" },
];

const eligibilityChecklist = [
  "Pessoa com deficiência de qualquer idade OU idoso com 65 anos ou mais",
  "Renda familiar per capita inferior a 1/4 do salário mínimo",
  "Estar inscrito (ou disposto a se inscrever) no CadÚnico",
];

// Validation schema
const step1Schema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(20),
  perfil: z.enum(["idoso_65", "impedimento_longo_prazo", "outro"]),
  cadastroUnico: z.enum(["tenho", "nao_tenho", "nao_sei"]),
  rendaPerCapita: z.enum(["menor_1_4_sm", "maior_igual_1_4_sm", "nao_sei"]),
  uf: z.string().min(2, "Selecione um estado"),
  municipio: z.string().min(2, "Informe o município"),
});

export default function TriagemBpcLoas() {
  const [currentStep, setCurrentStep] = useState(1);
  const [consentimento, setConsentimento] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Passo 1
    nomeCompleto: "",
    email: "",
    whatsapp: "",
    perfil: "",
    cadastroUnico: "",
    rendaPerCapita: "",
    uf: "",
    municipio: "",
    // Passo 2 (opcional)
    nis: "",
    tentouAntes: "",
    disponibilidade: "",
    uploadRgCpf: false,
    uploadLaudoMedico: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (currentStep === 1 && !validateStep1()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
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
      const scoreData = calculateBpcLoasScore({
        perfil: formData.perfil,
        rendaPerCapita: formData.rendaPerCapita,
        cadastroUnico: formData.cadastroUnico,
        uploadRgCpf: formData.uploadRgCpf,
        uploadLaudoMedico: formData.uploadLaudoMedico,
      });

      // Insert into database
      const { error } = await supabase.from("triagem_bpc_loas").insert({
        nome_completo: formData.nomeCompleto.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: formData.whatsapp.trim(),
        perfil: formData.perfil,
        cadastro_unico: formData.cadastroUnico,
        renda_per_capita: formData.rendaPerCapita,
        uf: formData.uf,
        municipio: formData.municipio.trim(),
        nis: formData.nis.trim() || null,
        tentou_antes: formData.tentouAntes || null,
        disponibilidade: formData.disponibilidade || null,
        upload_rg_cpf: formData.uploadRgCpf,
        upload_laudo_medico: formData.uploadLaudoMedico,
        score_total: scoreData.scoreTotal,
        score_perfil: scoreData.scorePerfil,
        score_renda: scoreData.scoreRenda,
        score_cadunico: scoreData.scoreCadunico,
        score_documentos: scoreData.scoreDocumentos,
        prioridade: scoreData.prioridade,
        consentimento_lgpd: true,
        consentimento_lgpd_data: new Date().toISOString(),
      });

      if (error) throw error;

      // Send confirmation email (non-blocking)
      supabase.functions.invoke("send-triagem-confirmation", {
        body: {
          tipo: "bpc_loas",
          nome: formData.nomeCompleto.trim(),
          email: formData.email.trim().toLowerCase(),
        },
      }).then(({ error: emailError }) => {
        if (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }
      });

      toast({
        title: "Triagem enviada!",
        description: "Recebemos sua solicitação. Enviamos um e-mail de confirmação.",
      });

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "triagem_bpc_loas_submit", {
          event_category: "conversion",
          event_label: "BPC/LOAS Triage Submitted",
        });
      }

      // Reset form
      setFormData({
        nomeCompleto: "",
        email: "",
        whatsapp: "",
        perfil: "",
        cadastroUnico: "",
        rendaPerCapita: "",
        uf: "",
        municipio: "",
        nis: "",
        tentouAntes: "",
        disponibilidade: "",
        uploadRgCpf: false,
        uploadLaudoMedico: false,
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
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <nav className="text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link to="/" className="hover:text-foreground">Início</Link></li>
                <li>/</li>
                <li><Link to="/bpc-loas" className="hover:text-foreground">BPC/LOAS</Link></li>
                <li>/</li>
                <li className="text-foreground">Triagem</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Triagem BPC/LOAS
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Preencha o formulário para uma análise preliminar da sua situação em relação ao Benefício de Prestação Continuada.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
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

            {/* Eligibility Checklist */}
            {currentStep === 1 && (
              <div className="bg-accent/50 rounded-xl border border-secondary/30 p-6 mb-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Critérios gerais de elegibilidade:
                </h2>
                <ul className="space-y-2">
                  {eligibilityChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Estes são critérios gerais. Cada situação é analisada individualmente.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Passo 1: Qualificação rápida */}
              {currentStep === 1 && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Informações para Análise Preliminar
                  </h2>
                  
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

                  <div className="space-y-3">
                    <Label>Qual é o seu perfil? *</Label>
                    <RadioGroup
                      value={formData.perfil}
                      onValueChange={(value) => handleSelectChange("perfil", value)}
                      className={errors.perfil ? "border border-destructive rounded-md p-2" : ""}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="idoso_65" id="idoso_65" />
                        <Label htmlFor="idoso_65" className="font-normal cursor-pointer">
                          Idoso (65 anos ou mais)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="impedimento_longo_prazo" id="impedimento_longo_prazo" />
                        <Label htmlFor="impedimento_longo_prazo" className="font-normal cursor-pointer">
                          Pessoa com impedimento de longo prazo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outro" id="outro" />
                        <Label htmlFor="outro" className="font-normal cursor-pointer">
                          Outro / Gostaria de avaliar
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.perfil && (
                      <p className="text-sm text-destructive">{errors.perfil}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Cadastro Único (CadÚnico) *</Label>
                    <RadioGroup
                      value={formData.cadastroUnico}
                      onValueChange={(value) => handleSelectChange("cadastroUnico", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tenho" id="cad-tenho" />
                        <Label htmlFor="cad-tenho" className="font-normal cursor-pointer">Tenho</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao_tenho" id="cad-nao" />
                        <Label htmlFor="cad-nao" className="font-normal cursor-pointer">Não tenho</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao_sei" id="cad-nao-sei" />
                        <Label htmlFor="cad-nao-sei" className="font-normal cursor-pointer">Não sei</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Renda familiar per capita *</Label>
                    <Select
                      value={formData.rendaPerCapita}
                      onValueChange={(value) => handleSelectChange("rendaPerCapita", value)}
                    >
                      <SelectTrigger className={errors.rendaPerCapita ? "border-destructive" : ""}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menor_1_4_sm">Menos de 1/4 do salário mínimo</SelectItem>
                        <SelectItem value="maior_igual_1_4_sm">1/4 do salário mínimo ou mais</SelectItem>
                        <SelectItem value="nao_sei">Não sei calcular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
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
                            <SelectItem key={uf.value} value={uf.value}>
                              {uf.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="municipio">Município *</Label>
                      <Input
                        id="municipio"
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleInputChange}
                        placeholder="Digite seu município"
                        className={errors.municipio ? "border-destructive" : ""}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Passo 2: Informações complementares (opcional) */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                        Informações Complementares
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Estas informações são opcionais, mas ajudam a agilizar a análise.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nis">Número do NIS (CadÚnico)</Label>
                      <Input
                        id="nis"
                        name="nis"
                        value={formData.nis}
                        onChange={handleInputChange}
                        placeholder="Digite o número do NIS (opcional)"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Já tentou solicitar o BPC antes?</Label>
                      <RadioGroup
                        value={formData.tentouAntes}
                        onValueChange={(value) => handleSelectChange("tentouAntes", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="tentou-sim" />
                          <Label htmlFor="tentou-sim" className="font-normal cursor-pointer">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="tentou-nao" />
                          <Label htmlFor="tentou-nao" className="font-normal cursor-pointer">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Disponibilidade para atendimento</Label>
                      <Select
                        value={formData.disponibilidade}
                        onValueChange={(value) => handleSelectChange("disponibilidade", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="horario_comercial">Horário comercial</SelectItem>
                          <SelectItem value="horarios_alternativos">Preciso de horários alternativos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4 pt-2">
                      <Label className="text-base">Documentos disponíveis</Label>
                      <p className="text-sm text-muted-foreground">
                        Marque os documentos que você pode enviar posteriormente (não é obrigatório agora).
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="uploadRgCpf"
                            checked={formData.uploadRgCpf}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, uploadRgCpf: checked as boolean })
                            }
                          />
                          <Label htmlFor="uploadRgCpf" className="font-normal cursor-pointer">
                            RG e CPF
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="uploadLaudoMedico"
                            checked={formData.uploadLaudoMedico}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, uploadLaudoMedico: checked as boolean })
                            }
                          />
                          <Label htmlFor="uploadLaudoMedico" className="font-normal cursor-pointer">
                            Laudo ou relatório médico (se aplicável)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consentimento LGPD */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-display text-base font-semibold text-foreground">
                          Consentimento LGPD
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Seus dados serão utilizados exclusivamente para análise preliminar de elegibilidade ao BPC/LOAS.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="consentimento"
                        checked={consentimento}
                        onCheckedChange={(checked) => setConsentimento(checked as boolean)}
                      />
                      <Label htmlFor="consentimento" className="text-sm font-normal text-muted-foreground leading-relaxed cursor-pointer">
                        Li e concordo com a{" "}
                        <Link to="/privacidade" className="text-primary hover:underline" target="_blank">
                          Política de Privacidade
                        </Link>
                        . Autorizo o tratamento dos meus dados para fins de análise preliminar de elegibilidade ao BPC/LOAS. 
                        Sei que posso revogar este consentimento a qualquer momento pelo e-mail contato@lilianlima.adv.br.
                      </Label>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="disclaimer">
                    Este formulário tem caráter de triagem inicial e não constitui contratação de serviços 
                    jurídicos nem promessa de resultado. A análise de elegibilidade depende da verificação 
                    individualizada dos documentos e informações fornecidas.
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                ) : (
                  <div />
                )}
                
                {currentStep < 2 ? (
                  <Button type="button" variant="hero" onClick={nextStep}>
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" variant="hero" disabled={isSubmitting || !consentimento}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Triagem
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
