import { useEffect } from "react";

const PHI = 1.61803398875;
const TOLERANCE = 0.02; // ±2%

/**
 * Validates Golden Ratio (φ) proportions in marked containers
 * Logs warnings to console if proportions deviate from φ ± 2%
 */
export function PhiValidator() {
  useEffect(() => {
    // Only run in development
    if (import.meta.env.PROD) return;

    const validatePhiProportions = () => {
      const phiElements = document.querySelectorAll('[data-test="phi"]');
      const results: Array<{
        element: string;
        ratio: number;
        valid: boolean;
        type: "width" | "height" | "aspect";
      }> = [];

      phiElements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        
        // Check aspect ratio
        if (rect.width > 0 && rect.height > 0) {
          const aspectRatio = rect.width / rect.height;
          const inverseRatio = rect.height / rect.width;
          
          // Check if matches φ or 1/φ
          const matchesPhi = Math.abs(aspectRatio - PHI) / PHI <= TOLERANCE;
          const matchesInversePhi = Math.abs(inverseRatio - PHI) / PHI <= TOLERANCE;
          
          if (matchesPhi || matchesInversePhi) {
            results.push({
              element: `φ-container #${index + 1} (${htmlEl.tagName.toLowerCase()})`,
              ratio: matchesPhi ? aspectRatio : inverseRatio,
              valid: true,
              type: "aspect",
            });
          }
        }

        // Check grid children proportions
        const children = htmlEl.children;
        if (children.length === 2) {
          const child1 = children[0] as HTMLElement;
          const child2 = children[1] as HTMLElement;
          const rect1 = child1.getBoundingClientRect();
          const rect2 = child2.getBoundingClientRect();

          if (rect1.width > 0 && rect2.width > 0) {
            const larger = Math.max(rect1.width, rect2.width);
            const smaller = Math.min(rect1.width, rect2.width);
            const ratio = larger / smaller;
            const isValid = Math.abs(ratio - PHI) / PHI <= TOLERANCE;

            results.push({
              element: `φ-grid #${index + 1}`,
              ratio,
              valid: isValid,
              type: "width",
            });

            if (!isValid) {
              console.warn(
                `⚠️ φ Warning: Grid ratio ${ratio.toFixed(3)} deviates from φ (1.618) by ${(
                  (Math.abs(ratio - PHI) / PHI) * 100
                ).toFixed(1)}%`,
                htmlEl
              );
            }
          }
        }
      });

      // Summary log
      const validCount = results.filter((r) => r.valid).length;
      const totalCount = results.length;

      if (totalCount > 0) {
        console.log(
          `✅ φ Validation: ${validCount}/${totalCount} elements within ±2% tolerance`
        );
        
        // Detailed results
        console.table(
          results.map((r) => ({
            Element: r.element,
            Ratio: r.ratio.toFixed(3),
            Target: PHI.toFixed(3),
            Deviation: `${((Math.abs(r.ratio - PHI) / PHI) * 100).toFixed(1)}%`,
            Status: r.valid ? "✓ Valid" : "⚠ Check",
          }))
        );
      }
    };

    // Run after initial render
    const timer = setTimeout(validatePhiProportions, 1000);

    // Re-run on resize
    const resizeHandler = () => {
      clearTimeout(timer);
      setTimeout(validatePhiProportions, 500);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return null; // This component doesn't render anything
}
