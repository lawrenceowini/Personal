import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns a ref to attach to an element and a boolean that flips to true
 * once the element scrolls into view. Used for subtle fade/slide-in
 * animations without pulling in a full animation library.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  // Lazy initializer: if the user prefers reduced motion, start already
  // visible so we never need to synchronously flip state after mount.
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // Intentionally run only on mount: `options` is a fresh object literal
    // on every render, so including it would re-trigger this effect forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
}
