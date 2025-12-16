import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle2, HelpCircle, TrendingUp, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  "Projeção de diferentes cenários de aposentadoria",
  "Análise das regras de transição aplicáveis ao seu caso",
  "Simulação de valores estimados de benefício",
  "Orientação sobre contribuições futuras",
  "Identificação de estratégias para seu perfil",
];

const whoNeeds = [
  {
    title: "Quem está próximo de se aposentar",
    description: "Para entender qual regra pode ser mais adequada ao seu caso.",
    icon: Target,
  },
  {
    title: "Quem quer organizar contribuições",
    description: "Para planejar contribuições futuras de forma estratégica.",
    icon: BarChart3,
  },
  {
    title: "Quem tem dúvidas sobre regras",
    description: "Para compreender qual regra se aplica ao seu histórico.",
    icon: TrendingUp,
  },
];

const faqItems = [
  {
    question: "O que é planejamento previdenciário?",
    answer: "É uma análise técnica que considera seu histórico contributivo, idade, tempo de contribuição e as regras previdenciárias vigentes para traçar cenários e orientar sobre possíveis caminhos para alcançar seu benefício.",
  },
  {
    question: "Quando devo fazer o planejamento?",
    answer: "Idealmente, o planejamento deve ser feito com antecedência de alguns anos antes da aposentadoria. Porém, também é útil para quem já está próximo de se aposentar ou mesmo para quem quer organizar sua vida contributiva desde cedo.",
  },
  {
    question: "O planejamento garante um valor de aposentadoria?",
    answer: "Não. O planejamento trabalha com projeções e simulações baseadas nas regras atuais e no histórico informado. Mudanças na legislação ou nos dados contributivos podem alterar os resultados. As simulações são orientativas, não garantias.",
  },
  {
    question: "Quais as regras de transição existentes?",
    answer: "A Reforma da Previdência (EC 103/2019) criou várias regras de transição: pedágio de 50%, pedágio de 100%, idade progressiva, pontos (idade + tempo), entre outras. O planejamento analisa qual pode se aplicar ao seu caso.",
  },
];

export default function PlanejamentoPrevidenciario() {
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
                <li className="text-foreground">Planejamento Previdenciário</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Planejamento Previdenciário
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Orientação estratégica para organizar sua trajetória contributiva e 
              entender os caminhos possíveis para alcançar seu benefício.
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

      {/* O que inclui */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                O que inclui o planejamento?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-6 italic">
                As projeções são orientativas. Cada situação é analisada individualmente.
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
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Informações sobre contribuições como autônomo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é indicado */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Para quem é indicado?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whoNeeds.map((item) => (
              <div 
                key={item.title} 
                className="bg-card rounded-xl border border-border p-6 card-hover text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
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
              Conteúdo informativo; não substitui consulta jurídica. As projeções e simulações são orientativas 
              e não constituem promessa de resultado.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Planeje seu futuro previdenciário
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Faça uma triagem inicial e receba orientação personalizada sobre seu caso.
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
