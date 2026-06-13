import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sprout,
  Microscope,
  FlaskConical,
  Droplets,
  LineChart,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion, fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Smart AI Farming" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Total predictions", value: 1284, icon: TrendingUp, delta: "+12.4%" },
  { label: "Diseases detected", value: 327, icon: Microscope, delta: "+4.1%" },
  { label: "Litres of water saved", value: 184500, icon: Droplets, delta: "+22%" },
  { label: "Crop recommendations", value: 612, icon: Sprout, delta: "+8.6%" },
  { label: "Yield forecasts", value: 245, icon: LineChart, delta: "+15%" },
];

const features = [
  {
    to: "/app/crop",
    icon: Sprout,
    title: "Crop Recommendation",
    desc: "Soil & climate based ML model.",
    grad: "from-emerald-500/30 to-teal-500/10",
  },
  {
    to: "/app/disease",
    icon: Microscope,
    title: "Disease Detection",
    desc: "Vision model for leaf disease diagnosis.",
    grad: "from-lime-500/30 to-emerald-500/10",
  },
  {
    to: "/app/fertilizer",
    icon: FlaskConical,
    title: "Fertilizer Recommendation",
    desc: "Right NPK mix for any crop.",
    grad: "from-cyan-500/30 to-emerald-500/10",
  },
  {
    to: "/app/irrigation",
    icon: Droplets,
    title: "Irrigation Recommendation",
    desc: "Optimize water usage by need level.",
    grad: "from-sky-500/30 to-teal-500/10",
  },
  {
    to: "/app/yield",
    icon: LineChart,
    title: "Yield Prediction",
    desc: "Forecast harvest with climate inputs.",
    grad: "from-emerald-500/30 to-cyan-500/10",
  },
];

function Dashboard() {
  return (
    <div>
      <PageHeader
        eyebrow="Smart AI Farming"
        title="AI powered smart farming"
        description="Improve crop productivity using machine learning, disease detection, fertilizer optimization, irrigation planning, and yield forecasting."
      />

      {/* Stats */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="rounded-2xl glass p-5"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-medium text-emerald-400">{s.delta}</span>
            </div>
            <div className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              <AnimatedCounter value={s.value} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature cards */}
      <div className="mt-12 flex items-end justify-between">
        <h2
          className="text-2xl font-semibold tracking-tight md:text-3xl"
          style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
        >
          Run a prediction
        </h2>
        <span className="text-xs text-muted-foreground">Pick a model to get started</span>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {features.map((f) => (
          <motion.div
            key={f.to}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <Link to={f.to} className="group block">
              <div className="relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-[var(--shadow-glow)]">
                <div
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${f.grad} blur-3xl transition group-hover:scale-125`}
                />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/90 to-teal-500/90 text-emerald-950">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-emerald-400" />
                </div>
                <div className="relative mt-6 text-lg font-semibold">{f.title}</div>
                <div className="relative mt-1 text-sm text-muted-foreground">{f.desc}</div>
                <div className="relative mt-5 inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                  Open module →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
