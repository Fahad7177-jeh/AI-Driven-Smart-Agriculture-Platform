import { Link } from "@tanstack/react-router";
import {
  Sprout,
  Microscope,
  FlaskConical,
  Droplets,
  LineChart,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Leaf,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/Brand";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion, fadeUp, stagger } from "@/lib/motion";

const features = [
  {
    icon: Sprout,
    title: "Crop Recommendation",
    desc: "ML-driven crop selection from soil & climate inputs.",
  },
  {
    icon: Microscope,
    title: "Disease Detection",
    desc: "Computer-vision diagnosis from a single leaf photo.",
  },
  {
    icon: FlaskConical,
    title: "Fertilizer Optimization",
    desc: "Right nutrient mix, every season, every field.",
  },
  {
    icon: Droplets,
    title: "Irrigation Planning",
    desc: "Save water with predictive irrigation scheduling.",
  },
  {
    icon: LineChart,
    title: "Yield Forecasting",
    desc: "Forecast harvest with rainfall & climate models.",
  },
  {
    icon: ShieldCheck,
    title: "Farm Intelligence",
    desc: "All decisions, one dashboard. Built for scale.",
  },
];

const stats = [
  { label: "Predictions delivered", value: 184230, suffix: "+" },
  { label: "Diseases identified", value: 27, suffix: "k+" },
  { label: "Litres of water saved", value: 9.4, suffix: "M" },
  { label: "Farmer accuracy rating", value: 98.6, suffix: "%" },
];

const testimonials = [
  {
    name: "Anita Reddy",
    role: "Cotton farmer, Telangana",
    text: "Disease detection caught early blight before it spread. Saved my season.",
  },
  {
    name: "Rohan Mehta",
    role: "Agronomist, Pune",
    text: "The irrigation engine cut our water use by 31% across 600 hectares.",
  },
  {
    name: "Sara Okafor",
    role: "Co-op lead, Kano",
    text: "Crop recommendations are scary accurate. Our co-op now plans by it.",
  },
];

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Nav */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Brand />
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#stats" className="hover:text-foreground transition-colors">
              Impact
            </a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">
              Farmers
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
            >
              <Link to="/register">Create account</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-28 md:pt-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            New · Disease detection v2 — 12% more accurate
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
            style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
          >
            Precision agriculture, <br />
            <span className="text-gradient">powered by AI.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            One intelligent platform for crop recommendations, disease detection, fertilizer
            planning, irrigation, and yield forecasting — built on production ML pipelines used by
            real farms.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
            >
              <Link to="/register">
                Start free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 glass">
              <Link to="/login">View dashboard</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl glass-strong p-2 shadow-[var(--shadow-elegant)]">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-950/60 via-background to-background p-8">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: Leaf,
                    label: "Recommended crop",
                    value: "Rice",
                    note: "+12% over baseline",
                  },
                  {
                    icon: Droplets,
                    label: "Irrigation need",
                    value: "Medium",
                    note: "Save 22% water",
                  },
                  {
                    icon: LineChart,
                    label: "Forecasted yield",
                    value: "4.8 t/ha",
                    note: "Confidence 94%",
                  },
                ].map((c) => (
                  <div key={c.label} className="rounded-2xl glass p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <c.icon className="h-4 w-4 text-emerald-400" />
                      {c.label}
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-tight">{c.value}</div>
                    <div className="mt-1 text-xs text-emerald-400">{c.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="rounded-2xl glass p-6">
              <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-400">The platform</div>
          <h2
            className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
          >
            Every decision a farm makes — modeled, measured, optimized.
          </h2>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl glass p-6"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:bg-emerald-500/25" />
              <f.icon className="h-7 w-7 text-emerald-400" />
              <div className="mt-4 text-lg font-semibold">{f.title}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2
            className="text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
          >
            Trusted on the ground.
          </h2>
          <div className="hidden gap-1 text-emerald-400 md:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl glass p-6">
              <Cpu className="h-5 w-5 text-emerald-400" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
              <div className="mt-5 text-sm font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-12 text-center">
          <div
            className="absolute inset-0 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative">
            <h3
              className="text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              Bring AI to your fields today.
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Create your free account and run your first prediction in under a minute.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
            >
              <Link to="/register">
                Get started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground">
          <Brand size="sm" />
          <div>© {new Date().getFullYear()} Smart AI Farming. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
