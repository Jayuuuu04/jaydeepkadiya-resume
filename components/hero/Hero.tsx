"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, ArrowRight, MapPin, Mail, Rocket, CreditCard, Cloud } from 'lucide-react';

const GitHubSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const techStack = ['PHP', 'Node.js', 'Next.js', 'MySQL', 'AWS', 'REST APIs'];

// Each of these maps to something real in data/projects.ts + data/experience.ts.
const proofPoints = [
  { icon: Rocket, title: 'Live in production', sub: 'Enterprise SaaS at x-pense.cloud' },
  { icon: CreditCard, title: 'Payments integrated', sub: 'Razorpay · Omnicard · Shiprocket' },
  { icon: Cloud, title: 'Shipped on AWS', sub: 'EC2 · S3 · RDS with CI/CD' },
];

const quickStats = [
  { value: '2+', label: 'Years Exp.' },
  { value: '2', label: 'Products' },
  { value: '9.18', label: 'CGPA' },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/70 shadow-glow backdrop-blur-xl">

      {/* background glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative grid gap-0 lg:grid-cols-[1fr_420px] lg:items-stretch">

        {/* LEFT — content */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">

          {/* status badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300">Available for opportunities</span>
          </motion.div>

          {/* name & role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Jaydeep Kadiya <span className="mx-1 text-slate-700">/</span> Backend Developer
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              I build systems that{' '}
              <span className="text-cyan-400">power real products.</span>
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              Bhuj, Gujarat, India
              <span className="mx-1 text-slate-700">·</span>
              <Mail className="h-3.5 w-3.5" />
              jaydeepkadiya005@gmail.com
            </div>
          </motion.div>

          {/* bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-8 text-slate-400"
          >
            I design scalable APIs, SaaS platforms, payment integrations and database-driven systems using{' '}
            <span className="font-medium text-slate-200">Node.js, PHP, MySQL and AWS</span>. Currently at{' '}
            <span className="font-medium text-slate-200">Aeonx Digital Technology Ltd.</span>, where I ship
            software enterprises depend on every day.
          </motion.p>

          {/* proof points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 grid max-w-xl gap-3 sm:grid-cols-3"
          >
            {proofPoints.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3.5 transition hover:border-cyan-400/30"
              >
                <Icon className="h-4 w-4 text-cyan-400" />
                <p className="mt-2.5 text-xs font-semibold text-slate-200">{title}</p>
                <p className="mt-0.5 text-[11px] leading-5 text-slate-500">{sub}</p>
              </div>
            ))}
          </motion.div>

          {/* tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
            >
              Work with me <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/80 hover:text-cyan-200"
            >
              View projects
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-5 py-3 text-sm font-medium text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </motion.div>

          {/* social + quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/5 pt-8"
          >
            {/* socials */}
            <div className="flex items-center gap-3">
              <Link href="https://github.com/Jayuuuu04" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <GitHubSvg />
              </Link>
              <Link href="https://www.linkedin.com/in/jaydeepkadiya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <LinkedInSvg />
              </Link>
              <a href="mailto:jaydeepkadiya005@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <Mail className="h-4 w-4" />
              </a>
            </div>

            {/* divider */}
            <div className="h-8 w-px bg-slate-800" />

            {/* quick stats */}
            <div className="flex items-center gap-6">
              {quickStats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-cyan-400">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — profile card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex flex-col"
        >
          <div className="relative flex h-full flex-col border-l border-slate-800/60 bg-slate-950/60 p-8">

            {/* profile image */}
            <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/60">
              <div className="relative h-[300px] w-full">
                <Image
                  src="/images/jay2.png"
                  alt="Jaydeep Kadiya"
                  fill
                  priority
                  sizes="280px"
                  className="object-cover object-center"
                />
              </div>
              {/* name overlay */}
              <div className="p-5">
                <p className="font-semibold text-slate-100">Jaydeep Kadiya</p>
                <p className="mt-0.5 text-sm text-slate-400">Backend Developer · Bhuj, India</p>
              </div>
            </div>

            {/* info cards */}
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3">
                <p className="text-xs text-slate-500 uppercase tracking-widest">Current Role</p>
                <p className="mt-1 text-sm font-medium text-slate-200">Backend Developer</p>
                <p className="text-xs text-slate-500">Aeonx Digital Technology Ltd. · 2023–Present</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3">
                <p className="text-xs text-slate-500 uppercase tracking-widest">Education</p>
                <p className="mt-1 text-sm font-medium text-slate-200">B.E. Computer Science (GTU)</p>
                <p className="text-xs text-slate-500">9.18 CGPA · Graduated 2023</p>
              </div>
              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
                <p className="text-xs text-yellow-600 uppercase tracking-widest">🏆 Achievement</p>
                <p className="mt-1 text-sm font-medium text-slate-200">1st Rank — Code Clash Hackathon</p>
                <p className="text-xs text-slate-500">₹50,000 Prize · Aeonx · Sep 2024</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
