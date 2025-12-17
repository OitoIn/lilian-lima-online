import { Link } from "react-router-dom";
import { MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Resposta mais rápida em horário comercial",
    value: "(11) 93205-9108",
    href: "https://wa.me/5511932059108",
    cta: "Iniciar conversa",
  },
  {
    icon: Mail,
    title: "E-mail",
    description: "Para mensagens mais detalhadas",
    value: "lilianlima.sociedade@gmail.com",
    href: "mailto:lilianlima.sociedade@gmail.com",
    cta: "Enviar e-mail",
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
];

export default function Contato() {
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
                <li className="text-foreground">Contato</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estou à disposição para ouvir você e esclarecer suas dúvidas sobre questões previdenciárias.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                Canais de Atendimento
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method) => (
                  <div key={method.title} className="bg-card rounded-xl border border-border p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <p className="text-foreground font-medium mb-4">
                      {method.value}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={method.href} target="_blank" rel="noopener noreferrer">
                        {method.cta}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Google My Business */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      Google Meu Negócio
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Veja avaliações e informações sobre o escritório no Google.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href="https://g.page/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Ver no Google Maps
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Redes Sociais
                </h3>
                <p className="text-muted-foreground mb-4">
                  Acompanhe conteúdos educativos sobre direitos previdenciários:
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                      aria-label={`Seguir no ${social.label}`}
                    >
                      <social.icon className="h-4 w-4" />
                      <span className="text-sm">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Hours */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Horário de Atendimento
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Segunda a Sexta</span>
                      <span className="text-foreground font-medium">9h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábado e Domingo</span>
                      <span className="text-foreground">Fechado</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Mensagens enviadas fora do horário comercial serão respondidas no próximo dia útil.
                  </p>
                </div>

                {/* Location */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Endereço
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Rua Lutécia, 429 - Sala 4<br />
                    Vila Carrão - São Paulo/SP<br />
                    CEP: 03423-000
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Atendimento presencial e online para todo o Brasil.
                  </p>
                </div>

                {/* Response time */}
                <div className="bg-primary text-primary-foreground rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold mb-2">
                    Tempo de Resposta
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Mensagens são respondidas em até <strong>48 horas úteis</strong>. 
                    Para urgências, prefira o WhatsApp em horário comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 md:pb-16">
        <div className="container">
          <div className="disclaimer max-w-3xl">
            O primeiro contato tem caráter informativo e não constitui relação de clientela. 
            A contratação de serviços jurídicos será formalizada mediante instrumento próprio.
          </div>
        </div>
      </section>
    </Layout>
  );
}
