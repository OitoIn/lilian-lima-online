import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  servicos: [
    { href: "/analise-previdenciaria", label: "Análise Previdenciária" },
    { href: "/planejamento-previdenciario", label: "Planejamento Previdenciário" },
    { href: "/bpc-loas", label: "Orientação BPC/LOAS" },
  ],
  institucional: [
    { href: "/sobre", label: "Sobre o Escritório" },
    { href: "/conteudo", label: "Conteúdo Educativo" },
    { href: "/contato", label: "Contato" },
  ],
  legal: [
    { href: "/privacidade", label: "Política de Privacidade" },
    { href: "/termos", label: "Termos de Uso" },
    { href: "/acessibilidade", label: "Acessibilidade" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com/", label: "Instagram", icon: Instagram },
  { href: "https://facebook.com/", label: "Facebook", icon: Facebook },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Lilian Lima Advocacia" 
                className="h-12 w-auto brightness-0 invert opacity-90"
                width={48}
                height={48}
              />
              <div>
                <span className="font-display text-lg font-semibold block">
                  Lilian Lima
                </span>
                <span className="text-xs opacity-80 tracking-wider uppercase">
                  Advocacia
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-80 mb-4 leading-relaxed">
              Apoio famílias na busca por seus direitos previdenciários com orientação especializada e atendimento humanizado.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={`Seguir no ${social.label}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {footerLinks.servicos.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Column */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2">
              {footerLinks.institucional.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5511932059108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  <span>(11) 93205-9108</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:lilianlima.sociedade@gmail.com"
                  className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>lilianlima.sociedade@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Rua Lutécia, 429 - Sala 4<br />Vila Carrão - São Paulo/SP</span>
              </li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-primary-foreground/20">
              <p className="text-xs opacity-70">
                Horário de atendimento:<br />
                Segunda a Sexta: 9h às 18h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs opacity-70 text-center md:text-left">
              <p>© {currentYear} Lilian Lima Sociedade Individual de Advocacia. CNPJ 60.878.479/0001-95</p>
              <p className="mt-1">
                OAB/SP 425.650 | Responsável: Lilian Scigliano de Lima
              </p>
            </div>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Disclaimer */}
          <p className="mt-4 text-2xs opacity-60 text-center md:text-left max-w-3xl">
            Este site tem caráter meramente informativo e não constitui publicidade ou captação de clientela. 
            As informações aqui disponibilizadas não substituem a consulta jurídica individualizada.
          </p>
        </div>
      </div>
    </footer>
  );
}
