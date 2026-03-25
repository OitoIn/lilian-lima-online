import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";

// Pages
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import BpcLoas from "./pages/BpcLoas";
import AnalisePrevidenciaria from "./pages/AnalisePrevidenciaria";
import PlanejamentoPrevidenciario from "./pages/PlanejamentoPrevidenciario";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Conteudo from "./pages/Conteudo";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import Acessibilidade from "./pages/Acessibilidade";
import TriagemBpcLoas from "./pages/TriagemBpcLoas";
import TriagemCalculo from "./pages/TriagemCalculo";
import RecursoIndeferimento from "./pages/RecursoIndeferimento";
import Obrigado from "./pages/Obrigado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <GTMPageViewTracker />
          <Routes>
            {/* Main Pages - Landing Page de Recursos Indeferidos como página inicial */}
            <Route path="/" element={<RecursoIndeferimento />} />
            <Route path="/inicio" element={<Index />} />
            
            {/* Services */}
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/bpc-loas" element={<BpcLoas />} />
            <Route path="/analise-previdenciaria" element={<AnalisePrevidenciaria />} />
            <Route path="/planejamento-previdenciario" element={<PlanejamentoPrevidenciario />} />
            
            {/* Landing Pages */}
            <Route path="/recurso-indeferimento" element={<RecursoIndeferimento />} />
            
            {/* Thank You Page */}
            <Route path="/obrigado" element={<Obrigado />} />
            
            {/* Institutional */}
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/conteudo" element={<Conteudo />} />
            
            {/* Screening Forms */}
            <Route path="/triagem-bpc-loas" element={<TriagemBpcLoas />} />
            <Route path="/triagem-calculo" element={<TriagemCalculo />} />
            
            {/* Legal Pages */}
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/acessibilidade" element={<Acessibilidade />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
