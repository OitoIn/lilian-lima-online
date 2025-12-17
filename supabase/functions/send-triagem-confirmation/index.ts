import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  tipo: "bpc_loas" | "calculo";
  nome: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tipo, nome, email }: EmailRequest = await req.json();

    console.log(`Sending confirmation email to ${email} for ${tipo} triage`);

    const primeiroNome = nome.split(" ")[0];
    
    let assunto = "";
    let conteudo = "";

    if (tipo === "bpc_loas") {
      assunto = "Recebemos sua solicitação - Triagem BPC/LOAS";
      conteudo = `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #5e6839; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">Lilian Lima Advocacia</h1>
          </div>
          
          <div style="padding: 32px 24px; background-color: #fafaf8;">
            <h2 style="color: #5e6839; margin-top: 0;">Olá, ${primeiroNome}!</h2>
            
            <p style="line-height: 1.6;">
              Recebemos sua solicitação de triagem para o <strong>Benefício de Prestação Continuada (BPC/LOAS)</strong>.
            </p>
            
            <p style="line-height: 1.6;">
              Nossa equipe irá analisar as informações fornecidas e entraremos em contato em breve 
              para dar continuidade ao atendimento.
            </p>

            <div style="background-color: #acba8f33; border-left: 4px solid #5e6839; padding: 16px; margin: 24px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Próximos passos:</strong><br>
                Aguarde nosso contato por e-mail ou WhatsApp para orientações sobre os documentos necessários.
              </p>
            </div>
            
            <p style="line-height: 1.6; color: #666; font-size: 14px;">
              Se tiver dúvidas, entre em contato conosco pelo WhatsApp ou responda este e-mail.
            </p>
          </div>
          
          <div style="background-color: #f0f0ec; padding: 16px 24px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">
              Este e-mail é uma confirmação automática. Seus dados são tratados conforme nossa 
              <a href="https://lilianlima.adv.br/privacidade" style="color: #5e6839;">Política de Privacidade</a>.
            </p>
            <p style="margin: 8px 0 0;">
              Conteúdo informativo; não substitui consulta jurídica.
            </p>
          </div>
        </div>
      `;
    } else {
      assunto = "Recebemos sua solicitação - Análise Previdenciária";
      conteudo = `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #5e6839; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">Lilian Lima Advocacia</h1>
          </div>
          
          <div style="padding: 32px 24px; background-color: #fafaf8;">
            <h2 style="color: #5e6839; margin-top: 0;">Olá, ${primeiroNome}!</h2>
            
            <p style="line-height: 1.6;">
              Recebemos sua solicitação de triagem para <strong>Análise Previdenciária</strong>.
            </p>
            
            <p style="line-height: 1.6;">
              Nossa equipe irá analisar as informações fornecidas e entraremos em contato em breve 
              para dar continuidade ao atendimento.
            </p>

            <div style="background-color: #acba8f33; border-left: 4px solid #5e6839; padding: 16px; margin: 24px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Próximos passos:</strong><br>
                Aguarde nosso contato para orientações sobre o envio do CNIS e demais documentos necessários para a análise.
              </p>
            </div>
            
            <p style="line-height: 1.6; color: #666; font-size: 14px;">
              Se tiver dúvidas, entre em contato conosco pelo WhatsApp ou responda este e-mail.
            </p>
          </div>
          
          <div style="background-color: #f0f0ec; padding: 16px 24px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">
              Este e-mail é uma confirmação automática. Seus dados são tratados conforme nossa 
              <a href="https://lilianlima.adv.br/privacidade" style="color: #5e6839;">Política de Privacidade</a>.
            </p>
            <p style="margin: 8px 0 0;">
              Conteúdo informativo; não substitui consulta jurídica.
            </p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Lilian Lima Advocacia <onboarding@resend.dev>",
      to: [email],
      subject: assunto,
      html: conteudo,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-triagem-confirmation function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
