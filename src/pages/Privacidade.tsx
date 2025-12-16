import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";

export default function Privacidade() {
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
                <li className="text-foreground">Política de Privacidade</li>
              </ol>
            </nav>
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Política de Privacidade
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
                <h2 className="font-display text-xl font-semibold mb-3">1. Introdução</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Lilian Lima Advocacia está comprometida com a proteção da sua privacidade. 
                  Esta política descreve como coletamos, usamos e protegemos suas informações 
                  pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">2. Dados Coletados</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Coletamos apenas os dados estritamente necessários para a prestação de nossos serviços:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Dados de identificação (nome, CPF, RG)</li>
                  <li>Dados de contato (e-mail, telefone)</li>
                  <li>Documentos previdenciários (CNIS, laudos médicos quando aplicável)</li>
                  <li>Informações socioeconômicas para análise de elegibilidade</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">3. Base Legal</h2>
                <p className="text-muted-foreground leading-relaxed">
                  O tratamento dos seus dados pessoais é realizado com base no seu <strong>consentimento</strong> (Art. 7º, I, LGPD), 
                  manifestado de forma livre, informada e inequívoca através dos formulários de triagem e termos de aceite.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">4. Finalidade do Tratamento</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Seus dados são utilizados exclusivamente para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Análise de elegibilidade para benefícios previdenciários</li>
                  <li>Prestação de orientação jurídica</li>
                  <li>Comunicação sobre o andamento do seu caso</li>
                  <li>Cumprimento de obrigações legais</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">5. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Seus dados não são compartilhados com terceiros, exceto quando necessário para 
                  a defesa dos seus interesses em processos administrativos ou judiciais, 
                  ou quando houver obrigação legal.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">6. Seus Direitos</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Conforme a LGPD, você tem direito a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Confirmação da existência de tratamento</li>
                  <li>Acesso aos dados</li>
                  <li>Correção de dados incompletos ou inexatos</li>
                  <li>Eliminação dos dados (quando aplicável)</li>
                  <li>Revogação do consentimento</li>
                  <li>Portabilidade dos dados</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">7. Segurança</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados 
                  contra acessos não autorizados, perda ou destruição. Os documentos são armazenados 
                  de forma segura e criptografada.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">8. Retenção de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Os dados são mantidos pelo período necessário ao cumprimento das finalidades 
                  para as quais foram coletados e pelo prazo exigido pela legislação aplicável.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold mb-3">9. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>E-mail:</strong> privacidade@lilianlima.adv.br<br />
                  <strong>WhatsApp:</strong> (00) 00000-0000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
