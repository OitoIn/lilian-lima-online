import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";

export default function Termos() {
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
                <li className="text-foreground">Termos de Uso</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: Dezembro de 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl prose prose-olive">
            <div className="space-y-8 text-foreground">
              <div>
                <h2 className="font-display text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao acessar e utilizar este site, você concorda com estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">2. Natureza do Conteúdo</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo o conteúdo disponibilizado neste site tem caráter exclusivamente informativo e educativo. 
                  As informações não constituem aconselhamento jurídico, não substituem a consulta com um advogado 
                  e não criam relação de clientela entre você e o escritório.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">3. Não Garantia de Resultados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conforme as normas da OAB, este site não faz promessas de resultados. 
                  O sucesso de qualquer procedimento jurídico depende de diversos fatores que 
                  devem ser analisados individualmente em cada caso.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">4. Serviços de Triagem</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Os formulários de triagem disponíveis neste site têm como objetivo coletar 
                  informações preliminares para uma análise inicial do seu caso. O envio de 
                  informações não garante a contratação de serviços nem cria vínculo advocatício.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">5. Responsabilidade pelas Informações</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Você é responsável pela veracidade e precisão das informações fornecidas através 
                  dos formulários. Informações incorretas ou incompletas podem prejudicar a análise do seu caso.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">6. Propriedade Intelectual</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, 
                  é de propriedade da Lilian Lima Advocacia e está protegido pelas leis de 
                  propriedade intelectual. É proibida a reprodução sem autorização prévia.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">7. Links Externos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Este site pode conter links para sites de terceiros. Não nos responsabilizamos 
                  pelo conteúdo, políticas de privacidade ou práticas de sites externos.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">8. Modificações</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                  As alterações entram em vigor imediatamente após sua publicação no site.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">9. Legislação Aplicável</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estes Termos são regidos pelas leis brasileiras. Quaisquer disputas serão 
                  submetidas ao foro da comarca onde está sediado o escritório.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">10. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para dúvidas sobre estes Termos de Uso, entre em contato:
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Razão Social:</strong> Lilian Lima Sociedade Individual de Advocacia<br />
                  <strong>CNPJ:</strong> 60.878.479/0001-95<br />
                  <strong>E-mail:</strong> lilianlima.sociedade@gmail.com<br />
                  <strong>Responsável:</strong> Lilian Scigliano de Lima - OAB/SP 425.650
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
