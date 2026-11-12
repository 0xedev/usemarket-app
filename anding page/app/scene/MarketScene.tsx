"use client";

import { useEffect, useRef, useState } from "react";

/* The live 3D market in the hero. three.js is loaded only in the browser, and
   the still illustration is shown instead if WebGL is not available. */
export default function MarketScene() {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    import("./createMarket")
      .then(({ createMarket }) => {
        if (cancelled || !host.current) return;
        try {
          dispose = createMarket(host.current, () => setState("ready"));
        } catch {
          setState("failed");
        }
      })
      .catch(() => setState("failed"));
    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={host}
      className={"lp-scene is-" + state}
      role="img"
      aria-label="An animated 3D market: shoppers move between colourful stalls while a usemarket rider and a keke circle the square."
    >
      {state === "failed" && (
        <img src="/market-hero.webp" alt="" width="1536" height="1024" />
      )}
    </div>
  );
}
