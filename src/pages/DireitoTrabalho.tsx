import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  Users, 
  HelpCircle,
  AlertCircle,
  Shield,
  Scale,
  Clock,
  ClipboardCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const situacoesAtuacao = [
  {
    icon: Scale,
    title: "Verbas Rescisórias",
    description: "Análise de direitos decorrentes do encerramento do contrato de trabalho, incluindo aviso prévio, férias proporcionais e saldo de salário.",
  },
  {
    icon: Clock,
    title: "Horas Extras",
    description: "Verificação de jornada de trabalho e eventuais diferenças em horas extras, banco de horas e intervalos não usufruídos.",
  },
  {
    icon: Shield,
    title: "FGTS",
    description: "Análise de depósitos do Fundo de Garantia por Tempo de Serviço e possíveis irregularidades no recolhimento.",
  },
  {
    icon: Briefcase,
    title: "Vínculo sem Registro",
    description: "Orientação para trabalhadores que exerceram atividades sem formalização do vínculo empregatício na carteira de trabalho.",
  },
  {
    icon: Users,
    title: "Estabilidade e Adicionais",
    description: "Avaliação de estabilidades provisórias, adicionais de insalubridade, periculosidade e noturno, conforme a legislação.",
  },
  {
    icon: AlertCircle,
    title: "Assédio e Irregularidades",
    description: "Orientação sobre situações de assédio moral ou sexual e outras irregularidades no ambiente de trabalho.",
  },
  {
    icon: FileText,
    title: "Análise Documental",
    description: "Verificação de contracheques, termos de rescisão, acordos e demais documentos trabalhistas para identificar possíveis irregularidades.",
  },
];

const comoFunciona = [
  {
    step: "1",
    icon: FileText,
    title: "Análise Documental",
    description: "Avaliação dos documentos trabalhistas para identificação da situação e verificação de possíveis irregularidades.",
  },
  {
    step: "2",
    icon: MessageSquare,
    title: "Orientação Personalizada",
    description: "Esclarecimento sobre seus direitos com base na análise realizada, em linguagem clara e acessível.",
  },
  {
    step: "3",
    icon: ClipboardCheck,
    title: "Definição de Estratégia",
    description: "Apresentação das possibilidades e caminhos disponíveis, para que você possa tomar uma decisão informada.",
  },
];

const documentosUteis = [
  "Carteira de Trabalho (física ou digital)",
  "Contracheques ou recibos de pagamento",
  "Termo de Rescisão do Contrato de Trabalho (TRCT)",
  "Extrato do FGTS",
  "Registro de ponto ou controle de jornada",
  "Comunicações escritas (e-mails, mensagens, notificações)",
  "Atestados médicos relacionados ao trabalho",
];

const faqItems = [
  {
    question: "Qual o prazo para buscar direitos trabalhistas?",
    answer: "A legislação prevê prazos específicos para reivindicação de direitos trabalhistas, que variam conforme a situação. É importante buscar orientação o quanto antes para avaliar os prazos aplicáveis ao seu caso, pois cada situação possui particularidades.",
  },
  {
    question: "Preciso ter todos os documentos para iniciar a análise?",
    answer: "Não necessariamente. A análise inicial pode ser feita com os documentos disponíveis. Orientamos sobre quais documentos adicionais podem ser úteis e como obtê-los, caso necessário.",
  },
  {
    question: "O que acontece se eu não tiver registro em carteira?",
    answer: "A ausência de registro formal não impede a busca por direitos trabalhistas. É possível comprovar o vínculo empregatício por outros meios, como testemunhas, mensagens, depósitos bancários e outras evidências. Cada caso é analisado individualmente.",
  },
  {
    question: "Como funciona a análise trabalhista?",
    answer: "A análise trabalhista consiste em uma avaliação dos documentos e informações relacionados ao seu vínculo de trabalho. Verificamos possíveis irregularidades e orientamos sobre os direitos que podem ser aplicáveis à sua situação específica.",
  },
  {
    question: "É possível resolver a questão sem ir à Justiça?",
    answer: "Em muitos casos, é possível buscar uma solução extrajudicial, como negociação direta ou mediação. Avaliamos cada situação para recomendar o caminho mais adequado, priorizando sempre a resolução que melhor atenda aos interesses do trabalhador.",
  },
  {
    question: "O que é a análise de causa trabalhista?",
    answer: "É uma avaliação preliminar e informativa da sua situação laboral. Analisamos os documentos e informações fornecidas para orientar sobre possíveis direitos e caminhos disponíveis. Não se trata de garantia de resultado ou promessa de ação judicial.",
  },
];

export default function DireitoTrabalho() {
  return (
    <Layout>
      <Helmet>
        <title>Direito do Trabalho - Orientação Trabalhista | Lilian Lima Advocacia</title>
        <meta 
          name="description" 
          content="Orientação especializada em Direito do Trabalho. Análise de verbas rescisórias, horas extras, FGTS, vínculo empregatício e irregularidades trabalhistas." 
        />
        <link rel="canonical" href="https://lilianlima.adv.br/direito-trabalho" />
        
        <meta property="og:title" content="Direito do Trabalho | Lilian Lima Advocacia" />
        <meta property="og:description" content="Orientação especializada em Direito do Trabalho. Análise de documentos e direitos trabalhistas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilianlima.adv.br/direito-trabalho" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Direito do Trabalho | Lilian Lima Advocacia" />
        <meta name="twitter:description" content="Orientação especializada em Direito do Trabalho." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Lilian Lima Advocacia - Direito do Trabalho",
            "description": "Orientação especializada em Direito do Trabalho, incluindo análise de verbas rescisórias, horas extras, FGTS e irregularidades trabalhistas.",
            "provider": {
              "@type": "LegalService",
              "name": "Lilian Lima Sociedade Individual de Advocacia",
              "telephone": "+55-11-97633-1094",
              "email": "lilianlima.sociedade@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Lutécia, 429 - Sala 4",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "03423-000",
                "addressCountry": "BR"
              }
            },
            "areaServed": "BR",
            "serviceType": "Direito do Trabalho"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      </Helmet>

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
                <li className="text-foreground">Direito do Trabalho</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                Direito do Trabalho
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              Orientação especializada para trabalhadores que desejam entender seus direitos 
              e avaliar possíveis irregularidades na relação de trabalho.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Cada situação é única. Analisamos sua documentação e oferecemos orientação clara 
              sobre os caminhos disponíveis para o seu caso.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/analise-trabalhista#formulario-triagem">
                Entender meu caso
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Em quais situações atuamos */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Em quais situações atuamos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos orientação em diversas questões trabalhistas, sempre com análise individualizada.
            </p>
            <div className="section-divider mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {situacoesAtuacao.map((item) => (
              <div 
                key={item.title} 
                className="bg-card rounded-xl border border-border p-6 card-hover"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-accent/50 rounded-xl border border-secondary/30 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Os temas acima são exemplificativos. Cada situação é analisada individualmente 
                  e pode envolver aspectos não listados aqui. A existência de irregularidade não 
                  significa automaticamente direito a indenização ou ação judicial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona a análise inicial */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Como funciona a análise inicial
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo claro e objetivo para ajudá-lo a entender sua situação.
            </p>
            <div className="section-divider mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {comoFunciona.map((item) => (
              <div 
                key={item.step} 
                className="bg-card rounded-xl border border-border p-6 text-center card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <item.icon className="h-6 w-6 text-secondary mx-auto mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentos que podem ajudar */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Documentos que podem ajudar
              </h2>
              <p className="text-muted-foreground">
                Ter esses documentos organizados pode facilitar a análise do seu caso:
              </p>
              <div className="section-divider mx-auto mt-4" />
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <ul className="space-y-3">
                {documentosUteis.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-accent/50 rounded-lg border border-secondary/30">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>
                    Não se preocupe se não tiver todos os documentos. A análise inicial pode ser 
                    realizada com o que você tem disponível. Orientaremos sobre como obter os demais.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Perguntas Frequentes
              </h2>
              <div className="section-divider mx-auto" />
            </div>

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
              Entenda sua situação trabalhista
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Preencha o formulário de triagem para uma análise preliminar do seu caso. 
              Orientação clara, sem compromisso.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/analise-trabalhista#formulario-triagem">
                Entender meu caso
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer Final */}
      <section className="py-8 bg-muted/50 border-t border-border">
        <div className="container">
          <p className="disclaimer text-center max-w-3xl mx-auto">
            Este site tem caráter meramente informativo e não constitui publicidade ou captação de clientela. 
            As informações não substituem a consulta jurídica individualizada. A análise de direitos 
            trabalhistas depende das particularidades de cada caso.
          </p>
        </div>
      </section>
    </Layout>
  );
}
