import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Brand } from "@/components/Brand";
import { motion } from "@/lib/motion";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <Link to="/">
            <Brand />
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2
              className="max-w-md text-4xl font-semibold leading-tight tracking-tight"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              The operating system for the <span className="text-gradient">modern farm.</span>
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Crop, disease, fertilizer, irrigation and yield intelligence — in one calm, fast
              workspace.
            </p>
            <div className="flex gap-3">
              {["Crop AI", "Disease CV", "Yield ML"].map((t) => (
                <span key={t} className="rounded-full glass px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex items-center justify-center px-6 py-12">
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "var(--gradient-hero)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <Link to="/">
              <Brand />
            </Link>
          </div>
          <div className="rounded-2xl glass-strong p-8 shadow-[var(--shadow-elegant)]">
            <h1
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
            {footer && (
              <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
