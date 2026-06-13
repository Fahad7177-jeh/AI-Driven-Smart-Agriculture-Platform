import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sprout,
  Microscope,
  FlaskConical,
  Droplets,
  LineChart,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
  CloudSun,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const nav = [
  { to: "/app/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/app/crop", icon: Sprout, label: "Crop Recommendation" },
  { to: "/app/disease", icon: Microscope, label: "Disease Detection" },
  { to: "/app/fertilizer", icon: FlaskConical, label: "Fertilizer" },
  { to: "/app/irrigation", icon: Droplets, label: "Irrigation" },
  { to: "/app/yield", icon: LineChart, label: "Yield Prediction" },
  { to: "/app/profile", icon: User, label: "Profile" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-50" />
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[600px]"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/5 bg-sidebar/60 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="p-5">
            <Brand />
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link key={item.to} to={item.to} className="block">
                  <motion.div
                    whileHover={{ x: 2 }}
                    className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 ring-1 ring-emerald-500/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon className="relative h-4 w-4 shrink-0" />
                    <span className="relative">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
          <div className="p-3">
            <button
              onClick={() => {
                toast.success("Logged out");
                navigate({ to: "/" });
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-background/95 backdrop-blur-xl lg:hidden"
              >
                <div className="flex items-center justify-between p-5">
                  <Brand />
                  <button onClick={() => setMobileOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 space-y-1 px-3">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    >
                      <item.icon className="h-4 w-4" /> {item.label}
                    </Link>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top nav */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/5 bg-background/60 px-4 backdrop-blur-xl md:px-8">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search predictions, fields, crops…" className="h-10 pl-9 glass" />
            </div>
            <div className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-xs md:flex">
              <CloudSun className="h-4 w-4 text-emerald-400" />
              <span className="font-medium">28°C</span>
              <span className="text-muted-foreground">· Partly cloudy</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full glass px-2 py-1.5">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-semibold text-emerald-950">
                   {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden text-sm md:inline">{user?.name || "User"}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/app/profile" })}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/app/settings" })}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    toast.success("Logged out");
                    navigate({ to: "/" });
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as any }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-emerald-400">{eyebrow}</div>
      )}
      <h1
        className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl"
        style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
      >
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
      )}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`rounded-2xl glass p-6 ${className}`}>{children}</div>;
}
