import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, CheckCircle2, HelpCircle, TrendingUp, Calculator, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const deliverables = [
  "Estudo técnico do seu histórico contributivo",
  "Conferência detalhada do CNIS",
  "Identificação de períodos especiais ou vínculos faltantes",
  "Análise das regras de transição aplicáveis",
  "Orientação sobre próximos passos (sem promessas de resultado)",
];

const process = [
  {
    step: "1",
    title: "Triagem inicial",
    description: "Você responde algumas perguntas para entendermos sua situação.",
    icon: ClipboardCheck,
  },
  {
    step: "2",
    title: "Envio de documentos",
    description: "Você envia seu CNIS e documentos por canal seguro.",
    icon: FileCheck,
  },
  {
    step: "3",
    title: "Análise técnica",
    description: "Realizamos a verificação detalhada do seu histórico.",
    icon: Calculator,
  },
  {
    step: "4",
    title: "Orientação",
    description: "Você recebe um relatório com achados e próximos passos.",
    icon: TrendingUp,
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
    question: "A análise ou o planejamento garantem algum resultado?",
    answer: "Não. A análise e o planejamento previdenciário são serviços de orientação que identificam possíveis direitos e caminhos. O resultado depende de diversos fatores que serão explicados no parecer, e nenhum resultado pode ser garantido.",
  },
  {
    question: "Quais as regras de transição existentes?",
    answer: "A Reforma da Previdência (EC 103/2019) criou várias regras de transição: pedágio de 50%, pedágio de 100%, idade progressiva, pontos (idade + tempo), entre outras. A análise verifica qual se aplica ao seu caso.",
  },
];

export default function AnalisePrevidenciaria() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient hero-pattern py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl animate-fade-in-up">
            <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link to="/" className="hover:text-foreground transition-colors">Início</Link></li>
                <li>/</li>
                <li><Link to="/servicos" className="hover:text-foreground transition-colors">Serviços</Link></li>
                <li>/</li>
                <li className="text-foreground">Cálculo Previdenciário</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Entenda suas rotas de aposentadoria
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Análise e planejamento previdenciário para você entender seu histórico contributivo, 
              as regras aplicáveis ao seu caso e os caminhos possíveis junto ao INSS.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/triagem-calculo">
                Entender meu caso
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* O que entregamos */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                O que você recebe
              </h2>
              <ul className="space-y-4">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-6 italic">
                Cada situação é única. A análise identifica possibilidades, não garante resultados.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Documentos necessários
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Documento de identificação (RG ou CNH)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  CPF
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <strong>CNIS atualizado (extrato detalhado)</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Carteira de trabalho (se disponível)
                </li>
              </ul>
              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Como obter o CNIS:</strong> Acesse o Meu INSS pelo site 
                  gov.br/meuinss ou pelo aplicativo, faça login e clique em "Extrato de Contribuição (CNIS)".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Como funciona o processo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Etapas claras para você entender seu histórico previdenciário.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {process.map((item) => (
              <div 
                key={item.step} 
                className="bg-card rounded-xl border border-border p-6 card-hover text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <item.icon className="h-6 w-6 text-secondary mx-auto mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
              Perguntas Frequentes
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-lg border border-border px-5"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
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

            {/* Disclaimer */}
            <div className="disclaimer mt-8">
              Conteúdo informativo; não substitui consulta jurídica. A análise previdenciária 
              não garante resultados. Cada caso possui particularidades que devem ser analisadas individualmente.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Entenda sua situação previdenciária
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Faça uma triagem inicial e receba orientação sobre seu caso.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/triagem-calculo">
                Entender meu caso
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
