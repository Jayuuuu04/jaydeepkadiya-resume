"use client";

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Replaces the native page scrollbar: a rail on the right edge that fills
 * top-to-bottom as the page scrolls. Click or drag anywhere on it to scroll.
 */
export function ScrollProgress() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  const knobTop = useTransform(progress, (p) => `${p * 100}%`);

  const scrollToPointer = (clientY: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const { top, height } = rail.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - top) / height));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * max, behavior: 'instant' });
  };

  return (
    <div
      ref={railRef}
      aria-hidden
      className="group fixed inset-y-0 right-0 z-[60] w-3 cursor-pointer touch-none select-none"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        scrollToPointer(e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) scrollToPointer(e.clientY);
      }}
    >
      {/* track */}
      <div className="absolute inset-y-0 right-0 w-[4px] bg-white/5 transition-all duration-200 group-hover:w-[6px]">
        {/* fill */}
        <motion.div
          style={{ scaleY: progress }}
          className="h-full w-full origin-top bg-gradient-to-b from-cyan-400 via-sky-400 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
        />
      </div>

      {/* handle at the fill's leading edge */}
      <motion.div
        style={{ top: knobTop }}
        className="absolute right-0 h-10 w-[4px] -translate-y-full rounded-full bg-white shadow-[0_0_14px_rgba(167,139,250,0.9)] transition-[width] duration-200 group-hover:w-[6px]"
      />
    </div>
  );
}
