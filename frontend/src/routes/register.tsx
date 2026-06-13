import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/pages/auth/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Smart AI Farming" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start running AI predictions on your farm in minutes."
      footer={
        <>
          Already a member?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = new FormData(e.currentTarget);

          const name = form.get("name");
          const email = form.get("email");
          const password = form.get("password");
          const confirm = form.get("confirm");

          if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
          }

          setLoading(true);

          try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message);
            }

            toast.success(data.message);

            navigate({
              to: "/login",
            });
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            } else {
              toast.error("Registration failed");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="space-y-1.5">
          <Label>Full name</Label>
          <Input name="name" required placeholder="Anita Reddy" className="h-11 glass" />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            required
            placeholder="you@farm.io"
            className="h-11 glass"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input name="password" type="password" required className="h-11 glass" />
          </div>
          <div className="space-y-1.5">
            <Label>Confirm</Label>
            <Input name="confirm" type="password" required className="h-11 glass" />
          </div>
        </div>
        <Button
          disabled={loading}
          className="h-11 w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
        >
          {loading ? "Creating…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
