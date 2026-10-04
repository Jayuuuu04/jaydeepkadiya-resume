import Link from 'next/link';
import { Mail } from 'lucide-react';
import { whatsappUrl } from '../../data/contact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

const LinkedInSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const socials = [
  { icon: GitHubSvg, href: 'https://github.com/Jayuuuu04', label: 'GitHub' },
  { icon: LinkedInSvg, href: 'https://www.linkedin.com/in/jaydeep-kadiya-7178b0163', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:jaydeepkadiya005@gmail.com', label: 'Email' },
  { icon: WhatsAppIcon, href: whatsappUrl(), label: 'WhatsApp' },
];

export function Footer() {
  return (
    <footer className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 text-slate-400 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-200">Jaydeep Kadiya</p>
          <p className="mt-1 text-sm text-slate-400">Backend Developer · PHP · Node.js · AWS</p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-slate-300 transition ${
                label === 'WhatsApp'
                  ? 'hover:border-emerald-300/70 hover:text-emerald-300'
                  : 'hover:border-cyan-300/70 hover:text-cyan-200'
              }`}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Jaydeep Kadiya</p>
      </div>
    </footer>
  );
}
