import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  "Verificação completa do histórico contributivo (CNIS)",
  "Identificação de períodos não registrados ou com inconsistências",
  "Análise de vínculos empregatícios e contribuições",
  "Orientação sobre documentos necessários para regularização",
  "Parecer sobre possíveis direitos e caminhos a seguir",
];

const process = [
  {
    step: "1",
    title: "Envio de documentos",
    description: "Você envia seu CNIS e documentos de identificação através do formulário seguro.",
  },
  {
    step: "2",
    title: "Análise técnica",
    description: "Realizo a verificação detalhada do seu histórico contributivo.",
  },
  {
    step: "3",
    title: "Parecer orientativo",
    description: "Você recebe um relatório com os achados e orientações sobre próximos passos.",
  },
];

const faqItems = [
  {
    question: "O que é o CNIS?",
    answer: "O CNIS (Cadastro Nacional de Informações Sociais) é o documento que contém todo o seu histórico de contribuições ao INSS. Ele registra vínculos empregatícios, contribuições como autônomo, períodos de afastamento, entre outras informações importantes para a análise previdenciária.",
  },
  {
    question: "Como obtenho meu CNIS?",
    answer: "O CNIS pode ser obtido pelo site ou aplicativo Meu INSS (gov.br/meuinss) ou presencialmente em uma agência do INSS. Recomendamos solicitar o extrato detalhado, que contém mais informações para análise.",
  },
  {
    question: "Quanto tempo leva a análise?",
    answer: "O prazo para análise depende da complexidade do histórico contributivo. Em geral, o parecer é entregue em até 10 dias úteis após o recebimento de toda a documentação necessária.",
  },
  {
    question: "A análise garante algum benefício?",
    answer: "Não. A análise previdenciária é um serviço de orientação que identifica possíveis direitos e caminhos. O resultado depende de diversos fatores que serão explicados no parecer, e nenhum resultado pode ser garantido.",
  },
];

export default function AnalisePrevidenciaria() {
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
                <li><Link to="/servicos" className="hover:text-foreground">Serviços</Link></li>
                <li>/</li>
                <li className="text-foreground">Análise Previdenciária</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Análise Previdenciária
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Verificação detalhada do seu histórico contributivo para identificar possíveis 
              direitos e orientar sobre os próximos passos junto ao INSS.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What includes */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                  O que inclui a análise?
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Como funciona o processo
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {process.map((item) => (
                    <div key={item.step} className="bg-card rounded-xl border border-border p-5">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold text-sm mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Perguntas Frequentes
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="bg-card rounded-lg border border-border px-4"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Disclaimer */}
              <div className="disclaimer">
                Este conteúdo tem caráter informativo. A análise previdenciária não garante resultados, 
                sendo uma orientação baseada nos documentos fornecidos e na legislação vigente.
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* CTA Card */}
                <div className="bg-primary text-primary-foreground rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold mb-3">
                    Solicite sua análise
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Envie seus documentos para uma análise detalhada do seu histórico contributivo.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/triagem-calculo">
                      Iniciar análise
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Documents Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Documentos necessários
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Documento de identificação (RG ou CNH)</li>
                    <li>• CPF</li>
                    <li>• CNIS atualizado (extrato detalhado)</li>
                    <li>• Carteira de trabalho (se disponível)</li>
                  </ul>
                </div>

                {/* Other Services */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-display text-base font-semibold text-foreground mb-3">
                    Outros serviços
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/planejamento-previdenciario" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        → Planejamento Previdenciário
                      </Link>
                    </li>
                    <li>
                      <Link to="/bpc-loas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        → Orientação BPC/LOAS
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

