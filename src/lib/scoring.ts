// Scoring interno para triagem BPC/LOAS (0-100)
export interface BpcLoasScoreData {
  perfil: string;
  rendaPerCapita: string;
  cadastroUnico: string;
  uploadRgCpf: boolean;
  uploadLaudoMedico: boolean;
}

export function calculateBpcLoasScore(data: BpcLoasScoreData) {
  let scorePerfil = 0;
  let scoreRenda = 0;
  let scoreCadunico = 0;
  let scoreDocumentos = 0;

  // Perfil: "Idoso 65+" = +25; "Impedimento de longo prazo" = +25
  if (data.perfil === "idoso_65") scorePerfil = 25;
  else if (data.perfil === "impedimento_longo_prazo") scorePerfil = 25;

  // Renda: "< 1/4 SM" = +25; "Não sei" = +10
  if (data.rendaPerCapita === "menor_1_4_sm") scoreRenda = 25;
  else if (data.rendaPerCapita === "nao_sei") scoreRenda = 10;

  // CadÚnico: "Tenho" = +15; "Não sei" = +5
  if (data.cadastroUnico === "tenho") scoreCadunico = 15;
  else if (data.cadastroUnico === "nao_sei") scoreCadunico = 5;

  // Documentos: upload laudo = +10; upload RG/CPF = +5
  if (data.uploadLaudoMedico) scoreDocumentos += 10;
  if (data.uploadRgCpf) scoreDocumentos += 5;

  const scoreTotal = scorePerfil + scoreRenda + scoreCadunico + scoreDocumentos;

  // Roteamento: ≥60 → "Alta prioridade"; 40–59 → "Analisar"; <40 → "Educar"
  let prioridade: "alta" | "analisar" | "educar" = "educar";
  if (scoreTotal >= 60) prioridade = "alta";
  else if (scoreTotal >= 40) prioridade = "analisar";

  return {
    scoreTotal,
    scorePerfil,
    scoreRenda,
    scoreCadunico,
    scoreDocumentos,
    prioridade,
  };
}

// Scoring interno para triagem Cálculo Previdenciário (0-100)
export interface CalculoScoreData {
  possuiCnis: string;
  tempoContribuicao: string;
  regimes: string[];
  trabalhoEspecial: string;
  uploadCnis: boolean;
  uploadRgCpf: boolean;
}

export function calculateCalculoScore(data: CalculoScoreData) {
  let scoreCnis = 0;
  let scoreTempo = 0;
  let scoreRegime = 0;
  let scoreEspecial = 0;
  let scoreDocumentos = 0;

  // CNIS: "Sim" = +30; upload CNIS = +20
  if (data.possuiCnis === "sim") scoreCnis = 30;
  if (data.uploadCnis) scoreDocumentos += 20;

  // Tempo: "30+" = +20; "20–29" = +10
  if (data.tempoContribuicao === "30_mais") scoreTempo = 20;
  else if (data.tempoContribuicao === "20_29") scoreTempo = 10;

  // Regime: "INSS+RPPS" = +10; "RPPS" = +5
  if (data.regimes.includes("inss") && data.regimes.includes("rpps")) scoreRegime = 10;
  else if (data.regimes.includes("rpps")) scoreRegime = 5;

  // Trabalho especial: "Sim" = +10; "Não sei" = +5
  if (data.trabalhoEspecial === "sim") scoreEspecial = 10;
  else if (data.trabalhoEspecial === "nao_sei") scoreEspecial = 5;

  // Upload RG/CPF (adicional)
  if (data.uploadRgCpf) scoreDocumentos += 5;

  const scoreTotal = scoreCnis + scoreTempo + scoreRegime + scoreEspecial + scoreDocumentos;

  // Roteamento: ≥60 → "Alta prioridade"; 40–59 → "Analisar"; <40 → "Educar"
  let prioridade: "alta" | "analisar" | "educar" = "educar";
  if (scoreTotal >= 60) prioridade = "alta";
  else if (scoreTotal >= 40) prioridade = "analisar";

  return {
    scoreTotal,
    scoreCnis,
    scoreTempo,
    scoreRegime,
    scoreEspecial,
    scoreDocumentos,
    prioridade,
  };
}
