import { Link } from "react-router-dom";
import { Users, Scale, Heart, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Cada pessoa que nos procura traz uma história única. Tratamos cada caso com respeito, empatia e atenção individualizada.",
  },
  {
    icon: BookOpen,
    title: "Clareza",
    description: "Acreditamos que o conhecimento deve ser acessível. Explicamos cada etapa do processo em linguagem simples e direta.",
  },
  {
    icon: Scale,
    title: "Ética",
    description: "Atuamos com total transparência, seguindo rigorosamente as normas da OAB e os princípios éticos da advocacia.",
  },
  {
    icon: Users,
    title: "Proximidade",
    description: "Mantemos comunicação constante e acessível, para que você se sinta acompanhado em todas as fases.",
  },
];

export default function Sobre() {
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
                <li className="text-foreground">Sobre</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Sobre o Escritório
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conheça nossa abordagem e os valores que guiam nosso trabalho no atendimento 
              a questões previdenciárias e assistenciais.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Nossa Abordagem
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  O escritório Lilian Lima Advocacia foi fundado com um propósito claro: 
                  oferecer orientação jurídica especializada em Direito Previdenciário de forma 
                  acessível, humana e transparente.
                </p>
                <p>
                  Entendemos que questões relacionadas à previdência social frequentemente surgem 
                  em momentos delicados da vida das pessoas e suas famílias. Por isso, nossa 
                  abordagem prioriza o acolhimento e a clareza em todas as etapas.
                </p>
                <p>
                  Com atendimento 100% online, buscamos eliminar barreiras geográficas e 
                  proporcionar comodidade, sem perder a proximidade e a atenção que cada 
                  caso merece.
                </p>
              </div>

              <div className="mt-8 p-6 bg-card rounded-xl border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Áreas de Atuação
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Análise e Revisão de Benefícios Previdenciários</li>
                  <li>• Planejamento Previdenciário</li>
                  <li>• Orientação em BPC/LOAS</li>
                  <li>• Aposentadorias (Idade, Tempo, Especial)</li>
                  <li>• Auxílios e Pensões</li>
                </ul>
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Nossos Valores
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value) => (
                  <div key={value.title} className="bg-card rounded-xl border border-border p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach to sensitive topics */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
              Temas Sensíveis
            </h2>
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Reconhecemos que muitos dos temas que tratamos envolvem situações de vulnerabilidade, 
                doenças, deficiências ou dificuldades financeiras. Por isso, adotamos diretrizes 
                específicas em nossa comunicação:
              </p>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0" />
                  <span>Tratamos cada situação com empatia e respeito</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0" />
                  <span>Evitamos linguagem que possa ser interpretada como exploração de vulnerabilidades</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0" />
                  <span>Não fazemos promessas de resultados ou utilizamos casos de terceiros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0" />
                  <span>Priorizamos informação educativa e orientação clara</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Tem dúvidas sobre seu caso?
            </h2>
            <p className="text-muted-foreground mb-6">
              Entre em contato para uma orientação inicial. Estamos prontos para ouvir você.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contato">Entrar em contato</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
