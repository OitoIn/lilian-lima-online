import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

const services = [
  {
    icon: FileCheck,
    title: "Análise Previdenciária Completa",
    description: "Verificação detalhada do seu histórico contributivo junto ao INSS para identificar possibilidades e direitos.",
    features: [
      "Análise do CNIS (Cadastro Nacional de Informações Sociais)",
      "Verificação de períodos contributivos",
      "Identificação de possíveis pendências ou inconsistências",
      "Orientação sobre documentos necessários",
    ],
    href: "/analise-previdenciaria",
    cta: "Solicitar análise",
  },
  {
    icon: Shield,
    title: "Planejamento Previdenciário",
    description: "Orientação estratégica para organizar sua trajetória contributiva e alcançar o benefício mais adequado.",
    features: [
      "Projeção de cenários de aposentadoria",
      "Orientação sobre contribuições futuras",
      "Análise de regras de transição",
      "Simulação de valores de benefício",
    ],
    href: "/planejamento-previdenciario",
    cta: "Planejar aposentadoria",
  },
  {
    icon: Heart,
    title: "Orientação BPC/LOAS",
    description: "Auxílio especializado para pessoas com deficiência ou idosos em situação de vulnerabilidade social.",
    features: [
      "Análise de requisitos de elegibilidade",
      "Orientação sobre o CadÚnico",
      "Auxílio na documentação necessária",
      "Acompanhamento do processo administrativo",
    ],
    href: "/bpc-loas",
    cta: "Verificar elegibilidade",
  },
];

export default function Servicos() {
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
                <li className="text-foreground">Serviços</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Serviços Jurídicos
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conheça as áreas de atuação e como posso auxiliar você a entender e buscar seus direitos previdenciários.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="space-y-8">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Info */}
                  <div className="lg:col-span-2 p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-2 mt-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="bg-muted/30 p-6 md:p-8 flex flex-col justify-center items-start lg:items-center">
                    <p className="text-sm text-muted-foreground mb-4 lg:text-center">
                      Saiba mais sobre este serviço e verifique se é adequado para sua situação.
                    </p>
                    <Button variant="hero" asChild>
                      <Link to={service.href}>
                        {service.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="disclaimer mt-8">
            Este conteúdo tem caráter informativo e não constitui promessa de resultado. 
            Cada caso deve ser analisado individualmente em consulta jurídica.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Não sabe qual serviço é o mais adequado?
            </h2>
            <p className="text-muted-foreground mb-6">
              Entre em contato para uma orientação inicial. Vou ajudar você a entender qual caminho seguir.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contato">
                Entrar em contato
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
