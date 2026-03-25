import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/conteudo", label: "Conteúdo" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
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
          <img 
            src={logo} 
            alt="Lilian Lima Advocacia" 
            className="h-12 w-auto md:h-14"
            width={56}
            height={56}
          />
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
              href="https://wa.me/5500000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Entrar em contato via WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/triagem-bpc-loas">
              Iniciar Triagem
            </Link>
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
              <Button variant="hero" className="w-full" asChild>
                <Link to="/triagem-bpc-loas" onClick={() => setIsMenuOpen(false)}>
                  Iniciar Triagem
                </Link>
              </Button>
              <Button variant="whatsapp" className="w-full" asChild>
                <a 
                  href="https://wa.me/5500000000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
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
