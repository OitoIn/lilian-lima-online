import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Upload, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Informações Pessoais" },
  { id: 2, name: "Situação Familiar" },
  { id: 3, name: "Documentos" },
  { id: 4, name: "Confirmação" },
];

const eligibilityChecklist = [
  "Pessoa com deficiência de qualquer idade OU idoso com 65 anos ou mais",
  "Renda familiar per capita inferior a 1/4 do salário mínimo",
  "Não receber outro benefício da previdência social",
  "Estar inscrito no CadÚnico (ou disposto a se inscrever)",
];

export default function TriagemBpcLoas() {
  const [currentStep, setCurrentStep] = useState(1);
  const [consentimento, setConsentimento] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    tipoSolicitante: "",
    rendaFamiliar: "",
    cadastroUnico: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentimento) {
      toast({
        title: "Consentimento necessário",
        description: "Você precisa aceitar os termos de consentimento para enviar o formulário.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Triagem enviada!",
      description: "Recebemos sua solicitação. Entraremos em contato em até 48h úteis.",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
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
              Preencha o formulário para uma análise inicial da sua elegibilidade ao Benefício de Prestação Continuada.
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
              <ol className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
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
                    <span className={`ml-2 text-sm hidden sm:inline ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
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
                  Antes de continuar, verifique os requisitos:
                </h2>
                <ul className="space-y-2">
                  {eligibilityChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Informações Pessoais
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Family Situation */}
              {currentStep === 2 && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Situação Familiar
                  </h2>
                  
                  <div className="space-y-3">
                    <Label>Tipo de solicitante *</Label>
                    <RadioGroup
                      value={formData.tipoSolicitante}
                      onValueChange={(value) => setFormData({ ...formData, tipoSolicitante: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="deficiencia" id="deficiencia" />
                        <Label htmlFor="deficiencia" className="font-normal">
                          Pessoa com deficiência
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="idoso" id="idoso" />
                        <Label htmlFor="idoso" className="font-normal">
                          Idoso (65 anos ou mais)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Renda familiar mensal (soma de toda a família) *</Label>
                    <RadioGroup
                      value={formData.rendaFamiliar}
                      onValueChange={(value) => setFormData({ ...formData, rendaFamiliar: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ate-1/4" id="renda1" />
                        <Label htmlFor="renda1" className="font-normal">
                          Até 1/4 salário mínimo por pessoa
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1/4-1/2" id="renda2" />
                        <Label htmlFor="renda2" className="font-normal">
                          Entre 1/4 e 1/2 salário mínimo por pessoa
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="acima-1/2" id="renda3" />
                        <Label htmlFor="renda3" className="font-normal">
                          Acima de 1/2 salário mínimo por pessoa
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Está inscrito no CadÚnico? *</Label>
                    <RadioGroup
                      value={formData.cadastroUnico}
                      onValueChange={(value) => setFormData({ ...formData, cadastroUnico: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="cad-sim" />
                        <Label htmlFor="cad-sim" className="font-normal">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="cad-nao" />
                        <Label htmlFor="cad-nao" className="font-normal">Não, mas pretendo me inscrever</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao-sei" id="cad-nao-sei" />
                        <Label htmlFor="cad-nao-sei" className="font-normal">Não sei</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Documentos
                  </h2>
                  
                  <p className="text-muted-foreground text-sm">
                    Para uma análise completa, você precisará enviar os seguintes documentos 
                    (pode ser depois do primeiro contato):
                  </p>

                  <div className="space-y-4">
                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">RG e CPF</p>
                          <p className="text-sm text-muted-foreground">Documento de identidade</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Laudos Médicos</p>
                          <p className="text-sm text-muted-foreground">Se for pessoa com deficiência</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Comprovante CadÚnico</p>
                          <p className="text-sm text-muted-foreground">Folha resumo do cadastro</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/50 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Os documentos podem ser enviados após o primeiro contato, por e-mail ou WhatsApp, 
                      em canal seguro. Todos os dados são tratados conforme nossa Política de Privacidade.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                      Confirme suas informações
                    </h2>
                    
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Nome:</dt>
                        <dd className="text-foreground">{formData.nome || "-"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">CPF:</dt>
                        <dd className="text-foreground">{formData.cpf || "-"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">E-mail:</dt>
                        <dd className="text-foreground">{formData.email || "-"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Telefone:</dt>
                        <dd className="text-foreground">{formData.telefone || "-"}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-display text-base font-semibold text-foreground mb-3">
                      Consentimento LGPD
                    </h3>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="consentimento"
                        checked={consentimento}
                        onCheckedChange={(checked) => setConsentimento(checked as boolean)}
                      />
                      <Label htmlFor="consentimento" className="text-sm font-normal text-muted-foreground leading-relaxed">
                        Declaro que li e concordo com a{" "}
                        <Link to="/privacidade" className="text-primary hover:underline" target="_blank">
                          Política de Privacidade
                        </Link>{" "}
                        e autorizo o tratamento dos meus dados pessoais para fins de análise 
                        de elegibilidade ao BPC/LOAS. Entendo que posso revogar este consentimento 
                        a qualquer momento.
                      </Label>
                    </div>
                  </div>

                  <div className="disclaimer">
                    Este formulário tem caráter de triagem inicial e não constitui contratação de serviços 
                    jurídicos nem promessa de resultado. A análise de elegibilidade depende da verificação 
                    dos documentos e informações fornecidas.
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                ) : (
                  <div />
                )}
                
                {currentStep < 4 ? (
                  <Button type="button" variant="hero" onClick={nextStep}>
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" variant="hero">
                    Enviar Triagem
                    <ArrowRight className="h-4 w-4" />
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
