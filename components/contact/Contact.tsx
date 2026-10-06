"use client";

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { whatsappUrl } from '../../data/contact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ mode: 'onTouched' });
  const closeToast = useCallback(() => setStatus('idle'), []);

  const onSubmit = async (data: ContactFormValues) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS environment variables are missing. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // Keys must match the {{variables}} in the EmailJS template.
          name: data.name,
          email: data.email,
          title: `New portfolio message from ${data.name}`,
          time: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          message: data.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('success');
      reset();
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="glass-card p-10 sm:p-12">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-100">Let’s build your next digital experience.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Send a message for collaboration, consulting, or project inquiries — I respond quickly and professionally.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-6 sm:grid-cols-[1fr_1fr]">
          <label className="col-span-full flex flex-col gap-2 text-sm text-slate-300">
            Name
            <input
              {...register('name', { required: 'Name is required' })}
              className="rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-400/70"
              placeholder="Your full name"
            />
            {errors.name && <span className="text-xs text-rose-400">{errors.name.message}</span>}
          </label>
          <label className="col-span-full flex flex-col gap-2 text-sm text-slate-300">
            Email
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              className="rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-400/70"
              placeholder="you@example.com"
            />
            {errors.email && <span className="text-xs text-rose-400">{errors.email.message}</span>}
          </label>
          <label className="col-span-full flex flex-col gap-2 text-sm text-slate-300">
            Message
            <textarea
              {...register('message', { required: 'Message is required' })}
              className="min-h-[160px] rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-400/70"
              placeholder="Tell me about your project"
            />
            {errors.message && <span className="text-xs text-rose-400">{errors.message.message}</span>}
          </label>
          <div className="col-span-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Jaydeep Kadiya on WhatsApp"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
            <p className="text-sm text-slate-400">
              Prefer email? <a href="mailto:jaydeepkadiya005@gmail.com" className="font-semibold text-slate-100 hover:text-cyan-200 transition">jaydeepkadiya005@gmail.com</a>
            </p>
          </div>
        </form>

      </motion.div>

      <AnimatePresence>
        {(status === 'success' || status === 'error') && (
          <Toast key={status} variant={status} onClose={closeToast} />
        )}
      </AnimatePresence>
    </section>
  );
}

const TOAST_DURATION_MS = 5000;

const toastContent = {
  success: {
    title: 'Message sent!',
    description: 'Thanks for reaching out — I’ll get back to you soon.',
    Icon: CheckCircle2,
    accent: 'text-emerald-400',
    ring: 'border-emerald-400/30',
    bar: 'bg-emerald-400',
  },
  error: {
    title: 'Couldn’t send your message',
    description: 'Something went wrong. Please try again or reach me on WhatsApp.',
    Icon: AlertCircle,
    accent: 'text-rose-400',
    ring: 'border-rose-400/30',
    bar: 'bg-rose-400',
  },
} as const;

function Toast({ variant, onClose }: { variant: 'success' | 'error'; onClose: () => void }) {
  const { title, description, Icon, accent, ring, bar } = toastContent[variant];

  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <motion.div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={`fixed bottom-6 left-4 right-4 z-50 overflow-hidden rounded-2xl border ${ring} bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-md sm:left-auto sm:right-6 sm:w-[380px]`}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-100">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="rounded-full p-1 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <motion.div
        className={`h-1 origin-left ${bar}`}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: TOAST_DURATION_MS / 1000, ease: 'linear' }}
      />
    </motion.div>,
    document.body
  );
}
