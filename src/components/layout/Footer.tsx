import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.075-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64.001 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.896 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.86 11.86 0 0 0 5.74 1.472h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.479-8.437"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2m0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6m5.75-2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
      />
    </svg>
  );
}

const footerLinks = {
  servicos: [
    { href: "/analise-previdenciaria", label: "Análise Previdenciária" },
    { href: "/planejamento-previdenciario", label: "Planejamento Previdenciário" },
    { href: "/bpc-loas", label: "Orientação BPC/LOAS" },
    { href: "/direito-trabalho", label: "Direito do Trabalho" },
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
  { href: "https://www.instagram.com/advocacialilianlima/", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.facebook.com/profile.php?id=61580119115489", label: "Facebook", icon: FacebookIcon },
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
              <span className="flex shrink-0 rounded-lg bg-white/15 p-1.5 shadow-md ring-1 ring-white/20">
                <img 
                  src={logo} 
                  alt="Lilian Lima Advocacia" 
                  className="h-10 w-auto md:h-12 drop-shadow-sm"
                  width={56}
                  height={56}
                />
              </span>
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
                  href="https://wa.me/5511976331094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
                  <span>(11) 97633-1094</span>
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
          
          <p className="mt-4 text-2xs opacity-50 text-center md:text-right">
            Desenvolvido por{" "}
            <a 
              href="https://oito.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity underline"
            >
              OitoIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
