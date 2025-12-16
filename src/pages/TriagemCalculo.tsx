import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Upload, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Informações Pessoais" },
  { id: 2, name: "Documentos" },
  { id: 3, name: "Confirmação" },
];

export default function TriagemCalculo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [consentimento, setConsentimento] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    objetivo: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
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
      title: "Solicitação enviada!",
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
                <li><Link to="/analise-previdenciaria" className="hover:text-foreground">Análise Previdenciária</Link></li>
                <li>/</li>
                <li className="text-foreground">Triagem</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Triagem para Análise Previdenciária
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Preencha o formulário para solicitar uma análise do seu histórico contributivo.
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
                      <div className={`w-12 sm:w-24 h-0.5 mx-2 ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </li>
                ))}
              </ol>
            </nav>

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

                  <div className="space-y-2">
                    <Label htmlFor="objetivo">Qual seu objetivo com a análise?</Label>
                    <Input
                      id="objetivo"
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleInputChange}
                      placeholder="Ex: Saber quando posso me aposentar, verificar tempo de contribuição..."
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Documents */}
              {currentStep === 2 && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Documentos Necessários
                  </h2>
                  
                  <p className="text-muted-foreground text-sm">
                    Para realizar a análise previdenciária, você precisará enviar os seguintes documentos:
                  </p>

                  <div className="space-y-4">
                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">RG e CPF</p>
                          <p className="text-sm text-muted-foreground">Documento de identidade com foto</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">CNIS (Extrato Detalhado)</p>
                          <p className="text-sm text-muted-foreground">Disponível no Meu INSS (gov.br/meuinss)</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Carteira de Trabalho (opcional)</p>
                          <p className="text-sm text-muted-foreground">Páginas com vínculos empregatícios</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/50 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Os documentos podem ser enviados após o primeiro contato, por e-mail ou WhatsApp, 
                        em canal seguro.
                      </p>
                      <p>
                        <strong>Como obter o CNIS:</strong> Acesse o Meu INSS pelo site gov.br/meuinss ou 
                        pelo aplicativo, faça login e clique em "Extrato de Contribuição (CNIS)".
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
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
                      {formData.objetivo && (
                        <div className="pt-2 border-t border-border">
                          <dt className="text-muted-foreground mb-1">Objetivo:</dt>
                          <dd className="text-foreground">{formData.objetivo}</dd>
                        </div>
                      )}
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
                        e autorizo o tratamento dos meus dados pessoais para fins de análise previdenciária. 
                        Entendo que posso revogar este consentimento a qualquer momento.
                      </Label>
                    </div>
                  </div>

                  <div className="disclaimer">
                    Este formulário tem caráter de triagem inicial e não constitui contratação de serviços 
                    jurídicos nem promessa de resultado. A análise previdenciária é baseada nos documentos 
                    fornecidos e na legislação vigente.
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
                
                {currentStep < 3 ? (
                  <Button type="button" variant="hero" onClick={nextStep}>
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" variant="hero">
                    Enviar Solicitação
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
