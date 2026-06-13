import { Sprout } from "lucide-react";

export function Brand({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const icon = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${icon} grid place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-emerald-950 shadow-[0_0_30px_-6px_oklch(0.78_0.18_155/0.7)]`}
      >
        <Sprout className="h-4 w-4" strokeWidth={2.6} />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`${text} font-semibold tracking-tight`}
          style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
        >
          Smart<span className="text-gradient">AI</span>Farming
        </span>
      </div>
    </div>
  );
}
