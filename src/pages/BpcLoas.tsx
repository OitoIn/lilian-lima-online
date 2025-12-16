import { Link } from "react-router-dom";
import { ArrowRight, Heart, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const eligibilityRequirements = [
  {
    title: "Para Pessoas com Deficiência",
    items: [
      "Comprovação de deficiência que impede a participação plena na sociedade",
      "Renda familiar per capita inferior a 1/4 do salário mínimo",
      "Estar inscrito no CadÚnico",
      "Não receber outro benefício da seguridade social",
    ],
  },
  {
    title: "Para Idosos (65 anos ou mais)",
    items: [
      "Ter 65 anos de idade ou mais",
      "Renda familiar per capita inferior a 1/4 do salário mínimo",
      "Estar inscrito no CadÚnico",
      "Não receber outro benefício da seguridade social",
    ],
  },
];

const faqItems = [
  {
    question: "O que é o BPC/LOAS?",
    answer: "O Benefício de Prestação Continuada (BPC) é um benefício assistencial previsto na Lei Orgânica da Assistência Social (LOAS). Ele garante um salário mínimo mensal para pessoas com deficiência e idosos com 65 anos ou mais que comprovem não possuir meios de garantir seu próprio sustento.",
  },
  {
    question: "Qual a diferença entre BPC e aposentadoria?",
    answer: "O BPC é um benefício assistencial que não exige contribuições ao INSS, mas possui critérios específicos de renda e condição social. Já a aposentadoria é um benefício previdenciário que exige tempo de contribuição. O BPC não gera direito ao 13º salário nem deixa pensão por morte.",
  },
  {
    question: "Como funciona o critério de renda familiar?",
    answer: "A renda familiar per capita é calculada dividindo a soma de toda renda da família pelo número de pessoas que compõem o núcleo familiar. O resultado deve ser inferior a 1/4 do salário mínimo vigente. Existem situações em que o juiz pode flexibilizar esse critério analisando outros fatores.",
  },
  {
    question: "Preciso estar inscrito no CadÚnico?",
    answer: "Sim, a inscrição no Cadastro Único (CadÚnico) é requisito obrigatório para solicitar o BPC. A inscrição é feita gratuitamente no CRAS (Centro de Referência de Assistência Social) do seu município.",
  },
  {
    question: "O benefício pode ser cancelado?",
    answer: "O BPC passa por revisões periódicas a cada dois anos. O benefício pode ser cessado se houver mudança nas condições que deram origem ao direito, como alteração na renda familiar ou na condição de deficiência.",
  },
];

export default function BpcLoas() {
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
                <li className="text-foreground">BPC/LOAS</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Orientação BPC/LOAS
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Auxílio especializado para pessoas com deficiência ou idosos em situação de 
              vulnerabilidade social que buscam entender e acessar o Benefício de Prestação Continuada.
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
              {/* What is */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                  O que é o BPC/LOAS?
                </h2>
                <div className="prose prose-olive max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    O Benefício de Prestação Continuada (BPC) é um direito garantido pela Constituição 
                    Federal e regulamentado pela Lei Orgânica da Assistência Social (LOAS). Ele assegura 
                    o pagamento de um salário mínimo mensal para:
                  </p>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Pessoas com deficiência de qualquer idade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Idosos com 65 anos ou mais</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Em ambos os casos, é necessário comprovar que a renda familiar per capita é 
                    inferior a 1/4 do salário mínimo e que não há condições de prover a própria 
                    manutenção nem tê-la provida pela família.
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                  Requisitos de Elegibilidade
                </h2>
                
                {eligibilityRequirements.map((group) => (
                  <div key={group.title} className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      {group.title}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-foreground">
                          <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="bg-accent/50 rounded-xl border border-secondary/30 p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Importante</h3>
                      <p className="text-sm text-muted-foreground">
                        Mesmo que você não atenda a todos os requisitos administrativos, pode haver 
                        possibilidade de buscar o benefício judicialmente, mediante análise individualizada 
                        do caso.
                      </p>
                    </div>
                  </div>
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
                Este conteúdo tem caráter informativo e educativo. Não constitui promessa de resultado 
                nem substitui a consulta jurídica individualizada para análise específica do seu caso.
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* CTA Card */}
                <div className="bg-primary text-primary-foreground rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold mb-3">
                    Verifique sua elegibilidade
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Faça a triagem inicial e descubra se você pode ter direito ao BPC/LOAS.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/triagem-bpc-loas">
                      Iniciar triagem
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Help Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Precisa de ajuda?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Se tiver dúvidas sobre o BPC/LOAS ou sobre seu caso específico, entre em contato.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contato">
                      Falar conosco
                    </Link>
                  </Button>
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
                      <Link to="/planejamento-previdenciario" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        → Planejamento Previdenciário
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
