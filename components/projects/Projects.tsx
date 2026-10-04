"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Check, Globe, Lock } from 'lucide-react';
import { projects } from '../../data/projects';

type Project = (typeof projects)[number];

const accentMap: Record<string, { label: string; check: string; badge: string; link: string; panel: string; glow: string; chip: string; caption: string; text: string }> = {
  cyan: {
    label: 'text-cyan-400',
    check: 'text-cyan-400',
    badge: 'border-cyan-400/50 text-cyan-300',
    link: 'text-cyan-300 hover:text-white',
    panel: 'from-cyan-500/25 via-sky-900/30 to-slate-950',
    glow: 'bg-cyan-400/30',
    chip: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
    caption: 'border-cyan-400',
    text: 'from-white via-cyan-100 to-cyan-400',
  },
  violet: {
    label: 'text-amber-400',
    check: 'text-amber-400',
    badge: 'border-amber-400/50 text-amber-300',
    link: 'text-amber-300 hover:text-white',
    panel: 'from-amber-500/25 via-orange-900/25 to-slate-950',
    glow: 'bg-amber-400/30',
    chip: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
    caption: 'border-amber-400',
    text: 'from-white via-amber-100 to-amber-400',
  },
  slate: {
    label: 'text-slate-400',
    check: 'text-slate-400',
    badge: 'border-slate-400/50 text-slate-300',
    link: 'text-slate-300 hover:text-white',
    panel: 'from-slate-500/25 via-slate-900/30 to-slate-950',
    glow: 'bg-slate-400/30',
    chip: 'border-slate-400/30 bg-slate-500/10 text-slate-200',
    caption: 'border-slate-400',
    text: 'from-white via-slate-100 to-slate-400',
  },
};

// Chip positions inside the preview panel, as % offsets.
const chipSpots = [
  'left-[6%] top-[22%]',
  'right-[7%] top-[18%]',
  'left-[10%] bottom-[22%]',
  'right-[9%] bottom-[26%]',
];

// Sticky stacking only makes sense when the whole card fits in the viewport.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

function ProjectPreview({ project, accent }: { project: Project; accent: (typeof accentMap)[string] }) {
  const reduceMotion = useReducedMotion();
  const [name, subtitle] = project.title.split(' — ');
  const isLive = project.url !== '#';
  const host = isLive ? new URL(project.url).host : `${name.toLowerCase()}.app`;

  return (
    <div className={`relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${accent.panel}`}>
      {/* browser chrome */}
      <div className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-slate-950/70 px-4 py-2.5 backdrop-blur">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-slate-900/80 px-3 py-1 font-mono text-[11px] text-slate-400">
          {isLive ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
          {host}
        </div>
      </div>

      {project.image ? (
        // Real screenshot: pans from the top of the page to the bottom on hover.
        <div className="relative flex-1 overflow-hidden bg-white">
          <Image
            src={project.image}
            alt={`${name} landing page`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top transition-[object-position] duration-[6s] ease-in-out group-hover:object-bottom"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/70 to-transparent" />
          <div className={`absolute bottom-4 left-4 border-l-2 bg-slate-950/85 px-2.5 py-1 font-mono text-[11px] text-slate-200 ${accent.caption}`}>
            {isLive ? `Live · ${host}` : 'In development'}
          </div>
          <div className="absolute bottom-4 right-4 rounded bg-slate-950/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 transition-opacity duration-300 group-hover:opacity-0">
            Hover to scroll
          </div>
        </div>
      ) : (
      <div className="relative flex-1">
        {/* grid pattern that drifts on hover */}
        <div
          className="absolute inset-0 opacity-30 transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          }}
        />
        <div className={`absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 ${accent.glow}`} />

        {/* scan line */}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* floating tech chips */}
        {project.tags.slice(0, chipSpots.length).map((tag, i) => (
          <motion.span
            key={tag}
            className={`absolute ${chipSpots[i]} rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm ${accent.chip}`}
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {tag}
          </motion.span>
        ))}

        {/* centred wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-transform duration-500 group-hover:scale-105">
          <span className={`bg-gradient-to-br bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl ${accent.text}`}>
            {name}
          </span>
          {subtitle && <span className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-300/80">{subtitle}</span>}
        </div>

        {/* caption, like a video timestamp */}
        <div className={`absolute bottom-4 left-4 border-l-2 bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] text-slate-200 ${accent.caption}`}>
          {isLive ? `Live · ${host}` : 'In development'}
        </div>
      </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  stack,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stack: boolean;
}) {
  const accent = accentMap[project.accent] ?? accentMap.slate;
  const isLive = project.url !== '#';
  const [name] = project.title.split(' — ');

  // Earlier cards shrink and dim as later ones slide over them.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, index === total - 1 ? 0 : 0.55]);

  return (
    <div className="lg:sticky" style={stack ? { top: `calc(7rem + ${index * 28}px)` } : undefined}>
      <motion.article
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={stack ? { scale, transformOrigin: 'top center' } : undefined}
        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0e14] shadow-2xl shadow-black/60 transition-colors duration-300 hover:border-white/20"
      >
        <div className="grid gap-8 p-6 sm:p-10 lg:min-h-[480px] lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* text column */}
          <div className="flex flex-col">
            <p className={`font-mono text-xs uppercase tracking-[0.3em] ${accent.label}`}>
              {String(index + 1).padStart(2, '0')} · {project.category}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h3 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">{name}</h3>
              <span className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wider ${accent.badge}`}>
                <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {project.badge}
              </span>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">{project.description}</p>

            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {project.longDesc.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-2.5 text-[13px] leading-6 text-slate-300"
                >
                  <Check className={`mt-1 h-3.5 w-3.5 shrink-0 ${accent.check}`} strokeWidth={3} />
                  {point}
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-400 transition-colors hover:border-white/25 hover:text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <a
                href={project.url}
                target={isLive ? '_blank' : undefined}
                rel={isLive ? 'noopener noreferrer' : undefined}
                aria-disabled={!isLive}
                className={`group/link inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] transition ${accent.link} ${isLive ? '' : 'pointer-events-none opacity-60'}`}
              >
                {isLive ? 'Visit live site' : 'Coming soon'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* preview column */}
          <ProjectPreview project={project} accent={accent} />
        </div>

        {/* darkening overlay for cards buried in the stack */}
        {stack && <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[28px] bg-black" />}
      </motion.article>
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const stack = isDesktop && !reduceMotion;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="glass-card p-6 sm:p-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Projects</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-100">Real products. Real impact.</h2>
        </div>
        <p className="max-w-xs text-sm leading-7 text-slate-400">
          Backend-driven systems built for scale, reliability, and seamless user experiences.
        </p>
      </div>

      <div ref={containerRef} className="mt-10 flex flex-col gap-8 lg:gap-[18vh]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            stack={stack}
          />
        ))}
      </div>
    </section>
  );
}
