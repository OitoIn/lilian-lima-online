import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Envia cada mudança de rota do SPA para o dataLayer do GTM,
 * permitindo que o gestor de tráfego capture a jornada do lead
 * (páginas visitadas, funis, conversões por página).
 */
export function GTMPageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !window.dataLayer) return;

    window.dataLayer.push({
      event: "virtual_page_view",
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname]);

  return null;
}
