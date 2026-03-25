import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent, CookiePreferences } from '@/hooks/useCookieConsent';
import { Settings, Shield, BarChart3, Megaphone } from 'lucide-react';

export function CookieConsent() {
  const { showBanner, acceptAll, acceptSelected, rejectAll } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    acceptSelected(tempPreferences);
  };

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto max-w-4xl rounded-lg border border-border bg-background shadow-lg">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 id="cookie-consent-title" className="font-heading text-lg font-semibold text-foreground">
                Sua privacidade é importante
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Utilizamos cookies para melhorar sua experiência. Conforme a LGPD, você pode escolher 
                quais cookies aceitar. Cookies essenciais são necessários para o funcionamento do site.
              </p>
            </div>
          </div>

          {showDetails ? (
            <div className="space-y-4 mt-4 border-t border-border pt-4">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-muted/50">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Cookies Essenciais</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Necessários para o funcionamento básico do site. Não podem ser desativados.
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={true} 
                  disabled 
                  aria-label="Cookies essenciais (sempre ativados)"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-muted/50">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Cookies de Análise</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Nos ajudam a entender como você usa o site para melhorar sua experiência.
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={tempPreferences.analytics}
                  onCheckedChange={(checked) => 
                    setTempPreferences(prev => ({ ...prev, analytics: checked }))
                  }
                  aria-label="Cookies de análise"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-muted/50">
                <div className="flex items-start gap-3">
                  <Megaphone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Cookies de Marketing</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Usados para exibir conteúdo relevante baseado em seus interesses.
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={tempPreferences.marketing}
                  onCheckedChange={(checked) => 
                    setTempPreferences(prev => ({ ...prev, marketing: checked }))
                  }
                  aria-label="Cookies de marketing"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button 
                  onClick={handleSavePreferences}
                  className="flex-1"
                >
                  Salvar preferências
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetails(false)}
                  className="flex-1"
                >
                  Voltar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button onClick={acceptAll} className="flex-1">
                Aceitar todos
              </Button>
              <Button variant="outline" onClick={rejectAll} className="flex-1">
                Apenas essenciais
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setShowDetails(true)}
                className="flex-1 gap-2"
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                Personalizar
              </Button>
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground text-center">
            Saiba mais em nossa{' '}
            <Link to="/privacidade" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
