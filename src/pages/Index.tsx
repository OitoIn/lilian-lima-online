import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, FileCheck, Heart, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { PhiValidator } from "@/components/PhiValidator";

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
      {/* Hero Section - φ proportioned */}
      <section 
        className="relative hero-gradient hero-pattern"
        data-test="phi"
      >
        <div className="container py-phi-5 md:py-phi-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-phi-2 py-phi-1 mb-phi-3 text-phi-sm font-medium tracking-wider uppercase bg-secondary/50 text-secondary-foreground rounded-full">
              Direito Previdenciário • BPC/LOAS
            </span>
            
            {/* h1 uses φ² (2.618rem) from CSS */}
            <h1 className="font-display text-phi-2xl md:text-phi-2xl lg:text-phi-3xl font-semibold text-foreground leading-tight mb-phi-3 text-balance">
              Apoio famílias na busca por seus{" "}
              <span className="text-primary">direitos previdenciários</span>
            </h1>
            
            {/* Body text uses φ (1.618rem) */}
            <p className="text-phi-md md:text-phi-lg text-muted-foreground mb-phi-4 leading-relaxed max-w-2xl mx-auto">
              Ofereço orientação especializada em BPC/LOAS, análise e planejamento previdenciário. 
              Atendimento 100% online, com linguagem clara e acolhimento em cada etapa.
            </p>
            
            {/* CTA buttons with φ spacing */}
            <div className="flex flex-col sm:flex-row gap-phi-2 justify-center">
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

            {/* Disclaimer with φ spacing */}
            <p className="disclaimer mt-phi-4 max-w-xl mx-auto">
              Conteúdo informativo. A consulta jurídica individualizada é necessária para análise específica do seu caso.
            </p>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-phi-4 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section - φ grid for cards */}
      <section 
        className="section-phi bg-background" 
        id="servicos"
        data-test="phi"
      >
        <div className="container">
          <div className="text-center mb-phi-5">
            <span className="inline-block px-phi-2 py-phi-1 mb-phi-2 text-phi-sm font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
              Áreas de Atuação
            </span>
            {/* h2 uses φ (1.618rem) */}
            <h2 className="font-display text-phi-lg md:text-phi-xl lg:text-phi-2xl font-semibold text-foreground mb-phi-2">
              Como posso ajudar você
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Orientação jurídica especializada para auxiliar você a entender seus direitos previdenciários.
            </p>
          </div>

          {/* Cards grid with φ-based gaps */}
          <div className="grid md:grid-cols-3 gap-phi-3 lg:gap-phi-4">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group bg-card rounded-xl p-phi-3 lg:p-phi-4 border border-border card-hover animate-fade-in-delay-${index + 1} aspect-phi-portrait md:aspect-auto`}
                data-test="phi"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-phi-2 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                
                {/* h3 uses √φ (1.272rem) */}
                <h3 className="font-display text-phi-md font-semibold text-foreground mb-phi-1">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-phi-2 leading-relaxed">
                  {service.description}
                </p>
                
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-phi-1 text-phi-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Entender meu caso
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - φ grid layout (0.618fr / 0.382fr) */}
      <section 
        className="section-phi bg-muted/30"
        data-test="phi"
      >
        <div className="container">
          <div className="grid lg:grid-cols-phi gap-phi-5 items-center">
            {/* Major column (61.8%) */}
            <div>
              <span className="inline-block px-phi-2 py-phi-1 mb-phi-2 text-phi-sm font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                Por que escolher
              </span>
              <h2 className="font-display text-phi-lg md:text-phi-xl lg:text-phi-2xl font-semibold text-foreground mb-phi-3">
                Orientação jurídica com empatia e transparência
              </h2>
              <p className="text-muted-foreground mb-phi-4 leading-relaxed">
                Entendo que questões previdenciárias podem ser delicadas e complexas. 
                Por isso, meu compromisso é oferecer um atendimento acolhedor, com explicações 
                claras e acompanhamento próximo em cada etapa do processo.
              </p>

              <ul className="space-y-phi-1">
                {trustIndicators.map((indicator) => (
                  <li key={indicator} className="flex items-center gap-phi-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{indicator}</span>
                  </li>
                ))}
              </ul>

              <Button variant="cta-primary" size="lg" className="mt-phi-4" asChild>
                <Link to="/sobre">
                  Conhecer o escritório
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Minor column (38.2%) - differentials cards */}
            <div className="grid gap-phi-2">
              {differentials.map((diff, index) => (
                <div
                  key={diff.title}
                  className={`bg-card rounded-xl p-phi-3 border border-border text-center animate-fade-in-delay-${index + 1}`}
                  data-test="phi"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-phi-1">
                    <diff.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-phi-sm font-semibold text-foreground mb-phi-1">
                    {diff.title}
                  </h3>
                  <p className="text-phi-xs text-muted-foreground">
                    {diff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - φ proportioned */}
      <section 
        className="section-phi bg-primary text-primary-foreground"
        data-test="phi"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-phi-lg md:text-phi-xl lg:text-phi-2xl font-semibold mb-phi-3">
              Pronto para entender seus direitos?
            </h2>
            <p className="text-primary-foreground/80 mb-phi-4 text-phi-md">
              Faça a triagem inicial gratuita e descubra como posso ajudar no seu caso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-phi-2 justify-center">
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

            <p className="mt-phi-3 text-phi-sm text-primary-foreground/60">
              Atendimento 100% online • Resposta em até 48h úteis
            </p>
          </div>
        </div>
      </section>

      {/* φ Validator - only in development */}
      <PhiValidator />
    </Layout>
  );
}
