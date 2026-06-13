import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/pages/auth/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Smart AI Farming" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to reset it."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Back to login
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
            toast.success("Reset link sent");
            setLoading(false);
          }, 700);
        }}
      >
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" required placeholder="you@farm.io" className="h-11 glass" />
        </div>
        <Button
          disabled={loading}
          className="h-11 w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
        >
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
