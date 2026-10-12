"use client";

import { useEffect, useState } from "react";

// Checks once whether an optional public file exists (photo, resume).
// Returns null while checking, so the UI can keep a neutral placeholder.
export function useAssetExists(path: string) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (active) setExists(res.ok);
      })
      .catch(() => {
        if (active) setExists(false);
      });
    return () => {
      active = false;
    };
  }, [path]);

  return exists;
}
