"use client";

import { useEffect, useState, type RefObject } from "react";

/** True once `amount` of the element has been visible. Never flips back. */
export function useInViewOnce(ref: RefObject<Element | null>, amount = 0.3): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: amount },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount, seen]);
  return seen;
}
