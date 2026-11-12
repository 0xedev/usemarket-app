"use client";

import { useEffect } from "react";

/* Progressive enhancement for the landing page: scroll reveals and the
   pointer-driven 3D tilt on the illustrated cards. Without JS everything is
   simply visible and flat. */
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("lp-js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const cleanups: Array<() => void> = [];
    if (!reduced && window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const max = Number(el.dataset.tilt) || 7;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", (x * max * 2).toFixed(2) + "deg");
          el.style.setProperty("--rx", (-y * max * 2).toFixed(2) + "deg");
        };
        const leave = () => {
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
      root.classList.remove("lp-js");
    };
  }, []);

  return null;
}
