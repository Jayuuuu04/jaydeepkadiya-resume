import { Navbar } from '../components/navbar/Navbar';
import { Hero } from '../components/hero/Hero';
import { AboutSection } from '../components/hero/AboutSection';
import { Projects } from '../components/projects/Projects';
import { Experience } from '../components/experience/Experience';
import { Skills } from '../components/skills/Skills';
import { Academics } from '../components/academics/Academics';
import { Availability } from '../components/availability/Availability';
import { Contact } from '../components/contact/Contact';
import { Footer } from '../components/footer/Footer';
import { ScrollProgress } from '../components/ui/ScrollProgress';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <ScrollProgress />
      <Navbar />
      <div className="relative overflow-x-clip">
        <div className="absolute inset-x-0 top-0 h-96 bg-hero-gradient opacity-80 blur-3xl" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-5 py-6 sm:px-8 lg:px-12">
          <Hero />
          <AboutSection />
          <Projects />
          <Experience />
          <Skills />
          <Academics />
          <Availability />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
