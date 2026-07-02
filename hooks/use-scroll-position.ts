"use client";

import { useEffect, useState } from "react";

interface UseScrollPositionOptions {
  threshold?: number;
}

export function useScrollPosition({
  threshold = 10,
}: UseScrollPositionOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
}
