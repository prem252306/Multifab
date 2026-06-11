import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useEffect(() => {
    let lenisInstance = null;
    let isInitialized = false;
    let rafId = null;

    const checkAndToggleLenis = () => {
      const isAdmin = window.location.pathname.startsWith("/admin");

      if (isAdmin && isInitialized) {
        // Stop RAF and destroy Lenis completely on admin pages
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (lenisInstance) {
          lenisInstance.destroy();
          lenisInstance = null;
        }
        isInitialized = false;
      } else if (!isAdmin && !isInitialized) {
        // Initialize Lenis on client pages
        lenisInstance = new Lenis({
          duration: 1.4,
          smoothWheel: true
        });

        const raf = (time) => {
          if (lenisInstance) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
          }
        };
        rafId = requestAnimationFrame(raf);
        isInitialized = true;
      }
    };

    // Run check initially
    checkAndToggleLenis();

    // Check periodically for route changes
    const interval = setInterval(checkAndToggleLenis, 250);

    return () => {
      clearInterval(interval);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);
}