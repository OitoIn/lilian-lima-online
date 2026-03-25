import { Link } from "react-router-dom";
import { BookOpen, Clock, Tag } from "lucide-react";
import { Layout } from "@/components/layout";

const articles = [
  {
    title: "O que é o BPC/LOAS e quem tem direito?",
    excerpt: "Entenda os requisitos básicos do Benefício de Prestação Continuada e como funciona o processo de solicitação junto ao INSS.",
    category: "BPC/LOAS",
    readTime: "5 min",
    href: "/bpc-loas",
  },
  {
    title: "Regras de transição da aposentadoria após a Reforma",
    excerpt: "Conheça as diferentes regras de transição criadas pela Reforma da Previdência e entenda qual pode ser aplicável ao seu caso.",
    category: "Aposentadoria",
    readTime: "8 min",
    href: "/planejamento-previdenciario",
  },
  {
    title: "Como obter e analisar seu CNIS",
    excerpt: "Passo a passo para extrair seu Cadastro Nacional de Informações Sociais e entender as informações do seu histórico contributivo.",
    category: "Documentos",
    readTime: "4 min",
    href: "/analise-previdenciaria",
  },
  {
    title: "Importância do CadÚnico para benefícios assistenciais",
    excerpt: "Saiba como funciona o Cadastro Único e por que ele é essencial para solicitar benefícios como o BPC/LOAS.",
    category: "BPC/LOAS",
    readTime: "4 min",
    href: "/bpc-loas",
  },
  {
    title: "Planejamento previdenciário: quando começar?",
    excerpt: "Descubra o momento ideal para iniciar o planejamento da sua aposentadoria e os benefícios de se antecipar.",
    category: "Planejamento",
    readTime: "6 min",
    href: "/planejamento-previdenciario",
  },
];

const categories = [
  { name: "Todos", count: articles.length },
  { name: "BPC/LOAS", count: articles.filter(a => a.category === "BPC/LOAS").length },
  { name: "Aposentadoria", count: articles.filter(a => a.category === "Aposentadoria").length },
  { name: "Planejamento", count: articles.filter(a => a.category === "Planejamento").length },
  { name: "Documentos", count: articles.filter(a => a.category === "Documentos").length },
];

export default function Conteudo() {
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
                <li className="text-foreground">Conteúdo</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Conteúdo Educativo
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Artigos e orientações para ajudar você a entender melhor seus direitos previdenciários.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Categorias
                </h2>
                <nav aria-label="Categorias de conteúdo">
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.name}>
                        <button
                          className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-left"
                        >
                          <span className="text-foreground">{cat.name}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {cat.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <article
                    key={article.title}
                    className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          <Tag className="h-3 w-3" />
                          {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        <Link to={article.href}>
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      <Link
                        to={article.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Ler mais
                        <BookOpen className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="disclaimer mt-8">
                O conteúdo deste blog tem caráter exclusivamente informativo e educativo. 
                Não constitui aconselhamento jurídico nem substitui a consulta com um advogado 
                para análise do seu caso específico.
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
