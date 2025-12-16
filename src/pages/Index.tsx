import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, FileCheck, Heart, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

const services = [
  {
    icon: FileCheck,
    title: "Análise Previdenciária Completa",
    description: "Verificação detalhada do seu histórico contributivo para identificar possibilidades e direitos junto ao INSS.",
    href: "/analise-previdenciaria",
  },
  {
    icon: Shield,
    title: "Planejamento Previdenciário",
    description: "Orientação estratégica para organizar sua trajetória contributiva e alcançar o benefício mais vantajoso.",
    href: "/planejamento-previdenciario",
  },
  {
    icon: Heart,
    title: "Orientação BPC/LOAS",
    description: "Auxílio especializado para pessoas com deficiência ou idosos em situação de vulnerabilidade social.",
    href: "/bpc-loas",
  },
];

const differentials = [
  {
    icon: Users,
    title: "Atendimento Humanizado",
    description: "Cada caso é tratado com atenção individualizada e empatia.",
  },
  {
    icon: Clock,
    title: "100% Online",
    description: "Atendimento remoto para sua comodidade, de qualquer lugar do Brasil.",
  },
  {
    icon: MapPin,
    title: "Abrangência Nacional",
    description: "Atuação em todo o território brasileiro via plataformas digitais.",
  },
];

const trustIndicators = [
  "Especialização em Direito Previdenciário",
  "Atendimento personalizado e acolhedor",
  "Comunicação clara e acessível",
  "Transparência em todo o processo",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-gradient hero-pattern">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase bg-secondary/50 text-secondary-foreground rounded-full">
              Direito Previdenciário • BPC/LOAS
            </span>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground leading-tight mb-6 text-balance">
              Apoio famílias na busca por seus{" "}
              <span className="text-primary">direitos previdenciários</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Ofereço orientação especializada em BPC/LOAS, análise e planejamento previdenciário. 
              Atendimento 100% online, com linguagem clara e acolhimento em cada etapa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/triagem-bpc-loas">
                  Iniciar Triagem BPC/LOAS
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/triagem-calculo">
                  Análise Previdenciária
                </Link>
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="disclaimer mt-8 max-w-xl mx-auto">
              Conteúdo informativo. A consulta jurídica individualizada é necessária para análise específica do seu caso.
            </p>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background" id="servicos">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
              Áreas de Atuação
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Como posso ajudar você
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Orientação jurídica especializada para auxiliar você a entender seus direitos previdenciários.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group bg-card rounded-xl p-6 lg:p-8 border border-border card-hover animate-fade-in-delay-${index + 1}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {service.description}
                </p>
                
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Entender meu caso
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                Por que escolher
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                Orientação jurídica com empatia e transparência
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Entendo que questões previdenciárias podem ser delicadas e complexas. 
                Por isso, meu compromisso é oferecer um atendimento acolhedor, com explicações 
                claras e acompanhamento próximo em cada etapa do processo.
              </p>

              <ul className="space-y-3">
                {trustIndicators.map((indicator) => (
                  <li key={indicator} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{indicator}</span>
                  </li>
                ))}
              </ul>

              <Button variant="cta-primary" size="lg" className="mt-8" asChild>
                <Link to="/sobre">
                  Conhecer o escritório
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {differentials.map((diff, index) => (
                <div
                  key={diff.title}
                  className={`bg-card rounded-xl p-5 border border-border text-center animate-fade-in-delay-${index + 1}`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                    <diff.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                    {diff.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {diff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
              Pronto para entender seus direitos?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Faça a triagem inicial gratuita e descubra como posso ajudar no seu caso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/triagem-bpc-loas">
                  Triagem BPC/LOAS
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="xl"
                asChild
              >
                <Link to="/triagem-calculo">
                  Análise Previdenciária
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              Atendimento 100% online • Resposta em até 48h úteis
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
