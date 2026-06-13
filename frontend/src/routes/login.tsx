import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthShell } from "@/pages/auth/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Smart AI Farming" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Smart AI Farming workspace."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-400 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            toast.success("Signed in");
            navigate({ to: "/app/dashboard" });
          }, 700);
        }}
      >
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" required placeholder="you@farm.io" className="h-11 glass" />
        </div>
        <div className="space-y-1.5">
          <Label>Password</Label>
          <Input type="password" required placeholder="••••••••" className="h-11 glass" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox /> Remember me
          </label>
          <Link to="/forgot-password" className="text-emerald-400 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button
          disabled={loading}
          className="h-11 w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
        >
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
