import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Field, FieldGrid, Section } from "@/components/app/ResultCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — Smart AI Farming" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

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
    <div className="space-y-8">
      <PageHeader
        eyebrow="Account"
        title="Your profile"
        description="Manage your farmer profile and account details."
      />

      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-xl font-semibold text-emerald-950">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </div>

      <div>
        <div className="text-lg font-semibold">{user?.name || "Loading..."}</div>

        <div className="text-sm text-muted-foreground">{user?.email || ""}</div>
      </div>
      <Section title="Edit profile">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated");
          }}
          className="space-y-6"
        >
          <FieldGrid>
            <Field label="Farmer name">
              <Input defaultValue={user?.name || ""} className="h-11 glass" />
            </Field>
            <Field label="Email">
              <Input type="email" defaultValue={user?.email || ""} className="h-11 glass" />
            </Field>
            <Field label="Region">
              <Input defaultValue="Telangana, India" className="h-11 glass" />
            </Field>
            <Field label="Farm size" hint="hectares">
              <Input type="number" defaultValue={42} className="h-11 glass" />
            </Field>
          </FieldGrid>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="glass">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90">
              Save changes
            </Button>
          </div>
        </form>
      </Section>

      <Section title="Account settings" description="Quick links to account-level controls.">
        <div className="grid gap-3 md:grid-cols-3">
          {["Two-factor auth", "Connected devices", "Export data"].map((s) => (
            <button key={s} className="rounded-xl glass p-4 text-left text-sm hover:bg-white/5">
              {s} →
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}
