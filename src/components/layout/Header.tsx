import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

// WhatsApp Official Logo SVG
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const navLinks = [
  { href: "/recurso-indeferimento", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/conteudo", label: "Conteúdo" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/recurso-indeferimento") return location.pathname === "/recurso-indeferimento" || location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <a href="#main-content" className="skip-link">
        Ir para conteúdo principal
      </a>
      
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Lilian Lima Advocacia - Página inicial"
        >
          <span className="flex shrink-0 rounded-lg bg-primary/8 p-1.5 shadow-sm ring-1 ring-primary/10">
            <img 
              src={logo} 
              alt="Lilian Lima Advocacia" 
              className="h-10 w-auto md:h-12 drop-shadow-sm"
              width={56}
              height={56}
            />
          </span>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-semibold text-foreground leading-tight block">
              Lilian Lima
            </span>
            <span className="text-xs text-muted-foreground tracking-wider uppercase">
              Advocacia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive(link.href)
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="hero-outline" size="sm" asChild>
            <a 
              href="https://wa.me/5511976331094" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Entrar em contato via WhatsApp"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </Button>
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => {
              if (location.pathname === "/") {
                // Already on the page, just scroll
                setTimeout(() => {
                  const formSection = document.getElementById("formulario-triagem");
                  if (formSection) {
                    const headerOffset = 100;
                    const elementPosition = formSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }, 100);
              } else {
                // Navigate to page first, then scroll
                navigate("/");
                setTimeout(() => {
                  const formSection = document.getElementById("formulario-triagem");
                  if (formSection) {
                    const headerOffset = 100;
                    const elementPosition = formSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }, 500);
              }
            }}
          >
            Iniciar Triagem
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-foreground hover:bg-accent rounded-md"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 space-y-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-border mt-4">
              <Button 
                variant="hero" 
                className="w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (location.pathname === "/") {
                    // Already on the page, just scroll
                    setTimeout(() => {
                      const formSection = document.getElementById("formulario-triagem");
                      if (formSection) {
                        const headerOffset = 100;
                        const elementPosition = formSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 100);
                  } else {
                    // Navigate to page first, then scroll
                    navigate("/");
                    setTimeout(() => {
                      const formSection = document.getElementById("formulario-triagem");
                      if (formSection) {
                        const headerOffset = 100;
                        const elementPosition = formSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 500);
                  }
                }}
              >
                Iniciar Triagem
              </Button>
              <Button variant="whatsapp" className="w-full" asChild>
                <a 
                  href="https://wa.me/5511976331094" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
