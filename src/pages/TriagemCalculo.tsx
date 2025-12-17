import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ArrowLeft, Shield, Loader2 } from "lucide-react";
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
import { calculateCalculoScore } from "@/lib/scoring";
import { z } from "zod";

const steps = [
  { id: 1, name: "Qualificação" },
  { id: 2, name: "Complementar" },
];

// Validation schema
const step1Schema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(20),
  possuiCnis: z.enum(["sim", "nao", "nao_sei"]),
  tempoContribuicao: z.enum(["menos_10", "10_19", "20_29", "30_mais"]),
  trabalhoEspecial: z.enum(["sim", "nao", "nao_sei"]),
});

export default function TriagemCalculo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [consentimento, setConsentimento] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Passo 1
    nomeCompleto: "",
    email: "",
    whatsapp: "",
    possuiCnis: "",
    tempoContribuicao: "",
    regimes: [] as string[],
    trabalhoEspecial: "",
    // Passo 2 (opcional)
    objetivo: "",
    tentouMeuInss: "",
    uploadCnis: false,
    uploadRgCpf: false,
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

  const handleRegimeChange = (regime: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, regimes: [...formData.regimes, regime] });
    } else {
      setFormData({ ...formData, regimes: formData.regimes.filter((r) => r !== regime) });
    }
  };

  const validateStep1 = () => {
    try {
      step1Schema.parse(formData);
      if (formData.regimes.length === 0) {
        setErrors({ regimes: "Selecione pelo menos um regime" });
        return false;
      }
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
      const scoreData = calculateCalculoScore({
        possuiCnis: formData.possuiCnis,
        tempoContribuicao: formData.tempoContribuicao,
        regimes: formData.regimes,
        trabalhoEspecial: formData.trabalhoEspecial,
        uploadCnis: formData.uploadCnis,
        uploadRgCpf: formData.uploadRgCpf,
      });

      // Insert into database
      const { error } = await supabase.from("triagem_calculo").insert({
        nome_completo: formData.nomeCompleto.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: formData.whatsapp.trim(),
        possui_cnis: formData.possuiCnis,
        tempo_contribuicao: formData.tempoContribuicao,
        regimes: formData.regimes,
        trabalho_especial: formData.trabalhoEspecial,
        objetivo: formData.objetivo || null,
        tentou_meu_inss: formData.tentouMeuInss || null,
        upload_cnis: formData.uploadCnis,
        upload_rg_cpf: formData.uploadRgCpf,
        score_total: scoreData.scoreTotal,
        score_cnis: scoreData.scoreCnis,
        score_tempo: scoreData.scoreTempo,
        score_regime: scoreData.scoreRegime,
        score_especial: scoreData.scoreEspecial,
        score_documentos: scoreData.scoreDocumentos,
        prioridade: scoreData.prioridade,
        consentimento_lgpd: true,
        consentimento_lgpd_data: new Date().toISOString(),
      });

      if (error) throw error;

      // Send confirmation email (non-blocking)
      supabase.functions.invoke("send-triagem-confirmation", {
        body: {
          tipo: "calculo",
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
        (window as any).gtag("event", "triagem_calculo_submit", {
          event_category: "conversion",
          event_label: "Cálculo Triage Submitted",
        });
      }

      // Reset form
      setFormData({
        nomeCompleto: "",
        email: "",
        whatsapp: "",
        possuiCnis: "",
        tempoContribuicao: "",
        regimes: [],
        trabalhoEspecial: "",
        objetivo: "",
        tentouMeuInss: "",
        uploadCnis: false,
        uploadRgCpf: false,
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
                <li><Link to="/analise-previdenciaria" className="hover:text-foreground">Cálculo Previdenciário</Link></li>
                <li>/</li>
                <li className="text-foreground">Triagem</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Triagem para Análise Previdenciária
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Responda algumas perguntas para entendermos sua situação e oferecermos a melhor orientação.
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Passo 1: Qualificação rápida */}
              {currentStep === 1 && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Informações para Análise
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
                    <Label>Possui CNIS (Extrato do INSS)? *</Label>
                    <RadioGroup
                      value={formData.possuiCnis}
                      onValueChange={(value) => handleSelectChange("possuiCnis", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="cnis-sim" />
                        <Label htmlFor="cnis-sim" className="font-normal cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="cnis-nao" />
                        <Label htmlFor="cnis-nao" className="font-normal cursor-pointer">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao_sei" id="cnis-nao-sei" />
                        <Label htmlFor="cnis-nao-sei" className="font-normal cursor-pointer">Não sei o que é</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Tempo aproximado de contribuição *</Label>
                    <Select
                      value={formData.tempoContribuicao}
                      onValueChange={(value) => handleSelectChange("tempoContribuicao", value)}
                    >
                      <SelectTrigger className={errors.tempoContribuicao ? "border-destructive" : ""}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menos_10">Menos de 10 anos</SelectItem>
                        <SelectItem value="10_19">Entre 10 e 19 anos</SelectItem>
                        <SelectItem value="20_29">Entre 20 e 29 anos</SelectItem>
                        <SelectItem value="30_mais">30 anos ou mais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Regime(s) de contribuição *</Label>
                    <p className="text-sm text-muted-foreground">Selecione todos que se aplicam</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="regime-inss"
                          checked={formData.regimes.includes("inss")}
                          onCheckedChange={(checked) => handleRegimeChange("inss", checked as boolean)}
                        />
                        <Label htmlFor="regime-inss" className="font-normal cursor-pointer">
                          INSS (Regime Geral)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="regime-rpps"
                          checked={formData.regimes.includes("rpps")}
                          onCheckedChange={(checked) => handleRegimeChange("rpps", checked as boolean)}
                        />
                        <Label htmlFor="regime-rpps" className="font-normal cursor-pointer">
                          RPPS (Servidor Público)
                        </Label>
                      </div>
                    </div>
                    {errors.regimes && (
                      <p className="text-sm text-destructive">{errors.regimes}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Teve trabalho especial (insalubre/perigoso)? *</Label>
                    <RadioGroup
                      value={formData.trabalhoEspecial}
                      onValueChange={(value) => handleSelectChange("trabalhoEspecial", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="especial-sim" />
                        <Label htmlFor="especial-sim" className="font-normal cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="especial-nao" />
                        <Label htmlFor="especial-nao" className="font-normal cursor-pointer">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao_sei" id="especial-nao-sei" />
                        <Label htmlFor="especial-nao-sei" className="font-normal cursor-pointer">Não sei</Label>
                      </div>
                    </RadioGroup>
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

                    <div className="space-y-3">
                      <Label>Qual é o seu objetivo?</Label>
                      <Select
                        value={formData.objetivo}
                        onValueChange={(value) => handleSelectChange("objetivo", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="avaliar_elegibilidade">Avaliar elegibilidade para aposentadoria</SelectItem>
                          <SelectItem value="planejar_data">Planejar melhor data para aposentar</SelectItem>
                          <SelectItem value="simular_cenarios">Simular cenários e regras de transição</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Já tentou solicitar pelo Meu INSS?</Label>
                      <RadioGroup
                        value={formData.tentouMeuInss}
                        onValueChange={(value) => handleSelectChange("tentouMeuInss", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="meuinss-sim" />
                          <Label htmlFor="meuinss-sim" className="font-normal cursor-pointer">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="meuinss-nao" />
                          <Label htmlFor="meuinss-nao" className="font-normal cursor-pointer">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4 pt-2">
                      <Label className="text-base">Documentos disponíveis</Label>
                      <p className="text-sm text-muted-foreground">
                        Marque os documentos que você pode enviar posteriormente (recomendado, mas não obrigatório agora).
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="uploadCnis"
                            checked={formData.uploadCnis}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, uploadCnis: checked as boolean })
                            }
                          />
                          <Label htmlFor="uploadCnis" className="font-normal cursor-pointer">
                            CNIS (Extrato de Contribuição)
                          </Label>
                        </div>
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
                          Seus dados serão utilizados exclusivamente para análise preliminar previdenciária.
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
                        . Autorizo o tratamento dos meus dados para fins de análise preliminar previdenciária. 
                        Sei que posso revogar este consentimento a qualquer momento pelo e-mail contato@lilianlima.adv.br.
                      </Label>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="disclaimer">
                    Este formulário tem caráter de triagem inicial e não constitui contratação de serviços 
                    jurídicos nem promessa de resultado. A análise é baseada nas informações fornecidas 
                    e na legislação vigente.
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
