import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Character from "@/components/Character";
import StackedDeck from "@/components/StackedDeck";
import SectionLabel from "@/components/SectionLabel";
import CaseStudyOverlay from "@/components/CaseStudyOverlay";
import profilePhoto from "@/assets/profile-photo.jpg";

type Pose = "idle" | "pointing" | "curious" | "telescope" | "bow";

const bezier = [0.16, 1, 0.3, 1] as const;
const journeySteps = [
  { mood: "neutral", y: 54 },
  { mood: "happy", y: 18 },
  { mood: "frustrated", y: 80 },
  { mood: "concerned", y: 62 },
  { mood: "neutral", y: 40 },
  { mood: "frustrated", y: 78 },
  { mood: "neutral", y: 44 },
  { mood: "happy", y: 18 },
  { mood: "neutral", y: 46 },
  { mood: "concerned", y: 64 },
] as const;

const moodStyles = {
  happy: { face: "☺", color: "hsl(142 45% 52%)" },
  neutral: { face: "–", color: "hsl(43 98% 52%)" },
  concerned: { face: "◠", color: "hsl(18 95% 56%)" },
  frustrated: { face: "×", color: "hsl(18 88% 45%)" },
} as const;

const Index = () => {
  const [activePose, setActivePose] = useState<Pose>("idle");
  const [selectedWork, setSelectedWork] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections: { ref: React.RefObject<HTMLDivElement>; pose: Pose }[] = [
      { ref: heroRef, pose: "idle" },
      { ref: aboutRef, pose: "curious" },
      { ref: workRef, pose: "pointing" },
      { ref: progressRef, pose: "telescope" },
      { ref: contactRef, pose: "bow" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.ref.current === entry.target);
            if (match) setActivePose(match.pose);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Character - fixed on desktop, hidden on mobile */}
      <div className="hidden lg:block fixed right-12 bottom-16 z-40">
        <motion.div
          key={activePose}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Character pose={activePose} className="w-16 h-24 opacity-60" />
        </motion.div>
      </div>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-display leading-[0.95]"
          >
            Hi! I'm Alyssa :)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-sm md:text-base text-muted-foreground font-body font-light"
          >
            A multilingual storyteller driving impact through creativity and data
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="mt-10"
          >
            <Character pose="idle" className="w-10 h-14 mx-auto opacity-40 lg:hidden" />
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 0.7, y: [0, 8, 0] }}
            transition={{ delay: 1.2, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-foreground/55"
            aria-hidden="true"
          >
            <svg width="54" height="42" viewBox="0 0 54 42" fill="none">
              <path d="M6 6L27 24L48 6" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 18L27 36L48 18" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section ref={aboutRef} className="px-6 md:px-12 lg:px-24 py-20 md:py-32 max-w-5xl mx-auto">
        <SectionLabel number="02" title="About" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bezier }}
          className="grid md:grid-cols-[minmax(0,1.15fr)_auto] gap-10 md:gap-12 items-start"
        >
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Hi, I'm Alyssa Li. I'm currently pursuing a master's in corporate communication at CUHK, graduating in October. I speak Mandarin, English and Korean — and I'm now learning Cantonese, slowly but surely.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              For me, to create is to notice something others walk past, and make it impossible to ignore through imagination and practice. I've worked as a PR practitioner, a self-taught designer and a video editor — shaping corporate messages, telling stories through news, and building visual identity for events. These days I'm also learning data analytics and visualisation through Python, with the help of my AI friend. If that's your world too, I'd love to talk. :)
            </p>
          <blockquote className="border-l-2 border-primary pl-5">
              <p className="italic text-[17px] leading-relaxed font-display text-muted-foreground">
                "To travel and to idle, to contemplate the future or the past of the world, to dream over books and loiter at street corners, and let the line of thought dip deep into the stream."
              </p>
              <span className="block mt-2 uppercase tracking-[0.08em] font-body font-light text-[11px] text-muted-foreground">
                — Virginia Woolf
              </span>
            </blockquote>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              That restlessness — I think it's why I keep learning and exploring.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2 pt-1">
            <img src={profilePhoto} alt="Alyssa Li" className="w-32 h-32 rounded-full object-cover border border-border" />
          </div>
        </motion.div>
      </section>

      {/* ─── WORK GALLERY ─── */}
      <section ref={workRef} className="px-6 md:px-12 lg:px-24 py-20 md:py-24 max-w-6xl mx-auto">
        <SectionLabel number="03" title="Work" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bezier }}
        >
          <StackedDeck onCardClick={(key) => setSelectedWork(key)} />
        </motion.div>
      </section>

      {/* ─── IN PROGRESS ─── */}
      <section ref={progressRef} className="px-6 md:px-12 lg:px-24 py-20 md:py-32 max-w-5xl mx-auto">
        <SectionLabel number="04" title="In Progress" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bezier }}
          className="border border-border rounded-xl p-6 md:p-10 bg-card"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] tracking-label uppercase text-muted-foreground">
              Expected · April 2026
            </span>
            <span className="text-[10px] tracking-label uppercase text-muted-foreground text-right pt-0.5">
              Class Project
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl tracking-display mt-3 mb-4 max-w-2xl">
            UX/UI Optimization for Keeta
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            Optimizing KeeTa&apos;s UI/UX to drive monthly order frequency by resolving friction in the consumer journey. This conceptual redesign reduces decision fatigue through a streamlined coupon interface, integrates gamified reward mechanics, and introduces an interactive digital mascot to foster long-term brand loyalty.
          </p>
          <div className="mt-8 rounded-xl border border-border/70 bg-background/40 p-4 md:p-5 overflow-x-auto">
            <div className="relative min-w-[720px] h-[180px]">
              <svg
                viewBox="0 0 720 180"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                {journeySteps.map((step, i) => (
                  <g key={`lane-${i}`}>
                    <rect
                      x={i * 72 + 8}
                      y={8}
                      width={56}
                      height={164}
                      rx={14}
                      fill="hsl(var(--foreground) / 0.08)"
                    />
                    <rect
                      x={i * 72 + 8}
                      y={8}
                      width={56}
                      height={14}
                      rx={8}
                      fill="hsl(var(--terracotta))"
                    />
                  </g>
                ))}
                <path
                  d={journeySteps
                    .map((step, i) => `${i === 0 ? "M" : "L"} ${i * 72 + 36} ${step.y + 20}`)
                    .join(" ")}
                  fill="none"
                  stroke="hsl(var(--foreground) / 0.7)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="7 10"
                />
              </svg>
              {journeySteps.map((step, i) => {
                const mood = moodStyles[step.mood];

                return (
                  <motion.div
                    key={`mood-${i}`}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: bezier }}
                    className="absolute flex items-center justify-center rounded-full text-xl md:text-2xl shadow-sm"
                    style={{
                      left: `${i * 72 + 16}px`,
                      top: `${step.y}px`,
                      width: 40,
                      height: 40,
                      background: mood.color,
                      color: "rgba(20, 20, 20, 0.72)",
                    }}
                  >
                    {mood.face}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── CONTACT ─── */}
      <section ref={contactRef} className="px-6 md:px-12 lg:px-24 py-20 md:py-32 max-w-4xl mx-auto text-center">
        <SectionLabel number="05" title="Contact" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bezier }}
          className="space-y-6"
        >
          <svg width="120" height="88" viewBox="0 0 120 88" className="mx-auto opacity-50">
            <circle cx="22" cy="12" r="8" fill="none" stroke="hsl(var(--warm-black))" strokeWidth="1.5"/>
            <line x1="22" y1="20" x2="22" y2="52" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="30" x2="12" y2="42" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="30" x2="44" y2="44" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="52" x2="14" y2="70" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="52" x2="30" y2="70" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="60" cy="44" rx="7" ry="5" fill="none" stroke="hsl(var(--terracotta))" strokeWidth="1.5"/>
            <line x1="55" y1="42" x2="65" y2="42" stroke="hsl(var(--terracotta))" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
            <circle cx="98" cy="12" r="8" fill="none" stroke="hsl(var(--warm-black))" strokeWidth="1.5"/>
            <line x1="98" y1="20" x2="98" y2="52" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="98" y1="30" x2="108" y2="42" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="98" y1="30" x2="76" y2="44" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="98" y1="52" x2="90" y2="70" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="98" y1="52" x2="106" y2="70" stroke="hsl(var(--warm-black))" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="78" x2="112" y2="78" stroke="hsl(var(--sand))" strokeWidth="0.5" strokeLinecap="round"/>
          </svg>
          <h3 className="font-display text-3xl md:text-4xl tracking-display">
            Let's talk.
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="mailto:alyssasoul25@gmail.com"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              alyssasoul25@gmail.com
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <a
              href="https://linkedin.com/in/li-h-alyssa1279"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              LinkedIn
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <a
              href="https://wa.me/85267047872"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              WhatsApp: (852) 67047872
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-8">
            Stay tuned for more!
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] text-muted-foreground tracking-label uppercase border-t border-border">
        Portfolio · 2026
      </footer>

      {/* Case Study Overlay */}
      <CaseStudyOverlay
        title={selectedWork}
        onClose={() => setSelectedWork(null)}
      />
    </div>
  );
};

export default Index;
