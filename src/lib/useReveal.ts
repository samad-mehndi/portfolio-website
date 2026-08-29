"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const THRESHOLD = 0.12;
const ROOT_MARGIN = "0px 0px -8%";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Adds `revealed` once the attached element enters the viewport, then stops
 * observing it. Under prefers-reduced-motion (or without IntersectionObserver
 * support) it is a no-op: `revealed` is always true, so content is never
 * caught mid-transition.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [triggered, setTriggered] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Feature-detection fallback: unlike reduceMotion above, this isn't
      // derivable during SSR (the check itself differs between server and
      // browser), so it has to be resolved here instead.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTriggered(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return { ref, revealed: triggered || reduceMotion };
}
