import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { CheckCircle2 } from "lucide-react";

const accessibilityFeatures = [
  "Navegação completa por teclado",
  "Textos com contraste adequado (mínimo 4.5:1)",
  "Estrutura semântica de cabeçalhos",
  "Textos alternativos em imagens",
  "Links e botões com foco visível",
  "Formulários com labels apropriados",
  "Tamanhos de fonte ajustáveis",
  "Design responsivo para diferentes dispositivos",
];

export default function Acessibilidade() {
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
                <li className="text-foreground">Acessibilidade</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Declaração de Acessibilidade
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nosso compromisso é garantir que este site seja acessível a todas as pessoas, 
              incluindo aquelas com deficiência.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl space-y-8">
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Nosso Compromisso
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A Lilian Lima Advocacia está comprometida em garantir acessibilidade digital 
                para pessoas com deficiência. Estamos continuamente melhorando a experiência 
                do usuário para todos e aplicando os padrões de acessibilidade relevantes.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Conformidade
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Este site foi desenvolvido seguindo as diretrizes WCAG 2.2 (Web Content 
                Accessibility Guidelines) nível AA, que definem como tornar o conteúdo 
                web mais acessível para pessoas com deficiência.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Também seguimos a Lei Brasileira de Inclusão (Lei nº 13.146/2015), que 
                estabelece normas de acessibilidade digital no Brasil.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Recursos de Acessibilidade
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Implementamos os seguintes recursos para garantir a acessibilidade:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {accessibilityFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Navegação por Teclado
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode navegar por todo o site usando apenas o teclado:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Tab:</strong> Move para o próximo elemento interativo</li>
                <li><strong>Shift + Tab:</strong> Move para o elemento anterior</li>
                <li><strong>Enter:</strong> Ativa links e botões</li>
                <li><strong>Espaço:</strong> Ativa botões e caixas de seleção</li>
                <li><strong>Setas:</strong> Navegam em menus e listas</li>
                <li><strong>Esc:</strong> Fecha menus e diálogos</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Ajustar Tamanho do Texto
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Você pode ajustar o tamanho do texto usando os controles do seu navegador:
              </p>
              <ul className="space-y-1 text-muted-foreground mt-3">
                <li><strong>Windows/Linux:</strong> Ctrl + para aumentar, Ctrl - para diminuir</li>
                <li><strong>Mac:</strong> Cmd + para aumentar, Cmd - para diminuir</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Feedback
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Estamos sempre buscando melhorar a acessibilidade do nosso site. Se você 
                encontrar alguma barreira de acessibilidade ou tiver sugestões de melhoria, 
                entre em contato:
              </p>
              <p className="text-muted-foreground">
                <strong>E-mail:</strong> acessibilidade@lilianlima.adv.br<br />
                <strong>WhatsApp:</strong> (00) 00000-0000
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Tentaremos responder ao seu feedback dentro de 5 dias úteis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
