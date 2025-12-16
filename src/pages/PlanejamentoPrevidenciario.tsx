import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle2, HelpCircle, TrendingUp } from "lucide-react";
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
  "Orientação sobre contribuições futuras mais vantajosas",
  "Identificação da melhor estratégia para seu perfil",
];

const whoNeeds = [
  {
    title: "Quem está próximo de se aposentar",
    description: "Para entender qual regra é mais vantajosa e quando solicitar o benefício.",
  },
  {
    title: "Quem quer organizar contribuições",
    description: "Para planejar contribuições futuras de forma estratégica.",
  },
  {
    title: "Quem tem dúvidas sobre regras de transição",
    description: "Para compreender qual regra se aplica ao seu histórico.",
  },
];

const faqItems = [
  {
    question: "O que é planejamento previdenciário?",
    answer: "É uma análise técnica que considera seu histórico contributivo, idade, tempo de contribuição e as regras previdenciárias vigentes para traçar cenários e orientar sobre a melhor estratégia para alcançar seu benefício de forma mais vantajosa.",
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
    answer: "A Reforma da Previdência (EC 103/2019) criou várias regras de transição: pedágio de 50%, pedágio de 100%, idade progressiva, pontos (idade + tempo), entre outras. O planejamento analisa qual se aplica e é mais vantajosa para você.",
  },
];

export default function PlanejamentoPrevidenciario() {
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
                <li className="text-foreground">Planejamento Previdenciário</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Planejamento Previdenciário
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Orientação estratégica para organizar sua trajetória contributiva e alcançar 
              o benefício mais adequado ao seu perfil e objetivos.
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
                  O que inclui o planejamento?
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

              {/* Who needs */}
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Para quem é indicado?
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {whoNeeds.map((item) => (
                    <div key={item.title} className="bg-card rounded-xl border border-border p-5">
                      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-3">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2 text-sm">
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
                Este conteúdo tem caráter informativo. As projeções e simulações são orientativas 
                e não constituem promessa de resultado. O planejamento não garante valores específicos de benefício.
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* CTA Card */}
                <div className="bg-primary text-primary-foreground rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold mb-3">
                    Comece seu planejamento
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Envie seus documentos para uma análise detalhada e planejamento personalizado.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/triagem-calculo">
                      Iniciar planejamento
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
                    <li>• Informações sobre contribuições como autônomo</li>
                  </ul>
                </div>

                {/* Other Services */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-display text-base font-semibold text-foreground mb-3">
                    Outros serviços
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/analise-previdenciaria" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        → Análise Previdenciária
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
