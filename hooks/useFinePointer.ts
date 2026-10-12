"use client";

import { useEffect, useState } from "react";

// True only for a mouse-like pointer on desktop widths.
// The custom cursor and its hover labels are gated on this.
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
