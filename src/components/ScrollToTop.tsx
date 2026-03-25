import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes, but not if there's a hash (for form scroll)
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior, // Use instant for faster navigation
      });
    }
  }, [pathname]);

  return null;
}
