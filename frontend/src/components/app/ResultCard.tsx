import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";

export function ResultCard({
  label,
  value,
  meta,
  visible,
  children,
}: {
  label: string;
  value?: ReactNode;
  meta?: ReactNode;
  visible: boolean;
  children?: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative overflow-hidden rounded-2xl p-[1px]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.18 155 / 0.6), oklch(0.7 0.16 185 / 0.4), transparent)",
          }}
        >
          <div className="relative rounded-2xl bg-background/70 p-8 backdrop-blur-xl">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" /> {label}
            </div>
            {value !== undefined && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="relative mt-4 text-5xl font-semibold tracking-tight md:text-6xl"
                style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
              >
                <span className="text-gradient">{value}</span>
              </motion.div>
            )}
            {meta && <div className="relative mt-3 text-sm text-muted-foreground">{meta}</div>}
            {children && <div className="relative mt-6">{children}</div>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
      {hint && <div className="text-[11px] text-muted-foreground/70">{hint}</div>}
    </div>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl glass p-6">
      <div className="mb-5">
        <div className="text-sm font-semibold">{title}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
      {children}
    </div>
  );
}
