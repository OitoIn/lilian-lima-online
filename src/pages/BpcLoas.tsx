import { Link } from "react-router-dom";
import { ArrowRight, Heart, CheckCircle2, AlertCircle, HelpCircle, Users, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const eligibilityChecklist = {
  deficiencia: [
    "Pessoa com impedimento de longo prazo (físico, mental, intelectual ou sensorial)",
    "Inscrição no Cadastro Único (CadÚnico)",
    "Renda familiar per capita inferior a 1/4 do salário mínimo",
    "Não receber outro benefício da seguridade social",
  ],
  idoso: [
    "Ter 65 anos de idade ou mais",
    "Inscrição no Cadastro Único (CadÚnico)",
    "Renda familiar per capita inferior a 1/4 do salário mínimo",
    "Não receber outro benefício da seguridade social",
  ],
};

const process = [
  {
    step: "1",
    title: "Análise documental",
    description: "Avaliação do seu histórico e documentos para verificar requisitos.",
    icon: FileText,
  },
  {
    step: "2",
    title: "Orientação personalizada",
    description: "Explicação clara sobre seu caso e próximos passos possíveis.",
    icon: MessageSquare,
  },
  {
    step: "3",
    title: "Requerimento",
    description: "Auxílio na preparação e acompanhamento do pedido junto ao INSS.",
    icon: Users,
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
                <li className="text-foreground">BPC/LOAS</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Orientação BPC/LOAS
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Auxílio especializado para pessoas com deficiência ou idosos em situação de 
              vulnerabilidade social que buscam entender e acessar o Benefício de Prestação Continuada.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/triagem-bpc-loas">
                Entender meu caso
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Como funciona o processo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Etapas claras e objetivas para auxiliar você a entender seus direitos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {process.map((item) => (
              <div 
                key={item.step} 
                className="bg-card rounded-xl border border-border p-6 card-hover text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <item.icon className="h-6 w-6 text-secondary mx-auto mb-3" />
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
      </section>

      {/* Quem pode solicitar */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
              Quem pode solicitar o BPC/LOAS?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pessoa com Deficiência */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Pessoa com Deficiência
                </h3>
                <ul className="space-y-3">
                  {eligibilityChecklist.deficiencia.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Idoso */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Idoso (65 anos ou mais)
                </h3>
                <ul className="space-y-3">
                  {eligibilityChecklist.idoso.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-accent/50 rounded-xl border border-secondary/30 p-6 mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Importante</h3>
                  <p className="text-sm text-muted-foreground">
                    Mesmo que você não atenda a todos os requisitos administrativos, pode haver 
                    possibilidade de buscar o benefício judicialmente, mediante análise individualizada 
                    do caso. Os critérios acima são informativos e cada situação deve ser avaliada individualmente.
                  </p>
                </div>
              </div>
            </div>
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
              Conteúdo informativo; não substitui consulta jurídica. Cada caso possui particularidades 
              que devem ser analisadas individualmente.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Entenda se você pode ter direito ao BPC/LOAS
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Faça uma triagem inicial gratuita e receba orientação personalizada sobre seu caso.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/triagem-bpc-loas">
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
