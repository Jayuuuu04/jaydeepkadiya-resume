"use client";

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

const accentMap: Record<string, { badge: string; dot: string; link: string; border: string; glow: string; number: string }> = {
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    dot: 'bg-cyan-400',
    link: 'text-cyan-300 hover:text-white',
    border: 'hover:border-cyan-500/40',
    glow: 'from-cyan-500/5 to-transparent',
    number: 'text-cyan-500/20',
  },
  violet: {
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    dot: 'bg-amber-400',
    link: 'text-amber-300 hover:text-white',
    border: 'hover:border-amber-500/40',
    glow: 'from-amber-500/5 to-transparent',
    number: 'text-amber-500/20',
  },
  slate: {
    badge: 'bg-slate-700/60 text-slate-300 border-slate-600/30',
    dot: 'bg-slate-400',
    link: 'text-slate-300 hover:text-white',
    border: 'hover:border-slate-500/40',
    glow: 'from-slate-500/5 to-transparent',
    number: 'text-slate-500/20',
  },
};

export function Projects() {
  return (
    <section id="projects" className="glass-card p-10 sm:p-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Projects</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-100">Real products. Real impact.</h2>
        </div>
        <p className="max-w-xs text-sm leading-7 text-slate-400">
          Backend-driven systems built for scale, reliability, and seamless user experiences.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const accent = accentMap[project.accent] ?? accentMap.slate;
          const isLive = project.url !== '#';

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-xl shadow-slate-950/20 transition-colors duration-300 ${accent.border}`}
            >
              {/* top color glow strip */}
              <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${accent.glow} pointer-events-none`} />

              {/* large project number watermark */}
              <span className={`absolute right-6 top-4 text-8xl font-black leading-none select-none ${accent.number}`}>
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative flex flex-col flex-1 p-7">
                {/* badges row */}
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${accent.badge}`}>
                    {project.badge}
                  </span>
                  {isLive && (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                  {project.badge === 'In Progress' && (
                    <span className="flex items-center gap-1.5 text-xs text-amber-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      In Progress
                    </span>
                  )}
                </div>

                {/* title */}
                <h3 className="mt-5 text-xl font-bold leading-snug text-slate-100">{project.title}</h3>

                {/* description */}
                <p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p>

                {/* divider */}
                <div className="my-5 border-t border-white/5" />

                {/* feature list — 2 column grid */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {project.longDesc.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs leading-5 text-slate-400">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* footer link */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href={project.url}
                    target={isLive ? '_blank' : undefined}
                    rel={isLive ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition ${accent.link}`}
                  >
                    {isLive ? 'Visit live site' : 'View details'}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
