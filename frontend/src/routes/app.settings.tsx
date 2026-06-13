import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Section, Field, FieldGrid } from "@/components/app/ResultCard";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Smart AI Farming" }] }),
  component: SettingsPage,
});

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-0">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [compact, setCompact] = useState(false);
  const [emails, setEmails] = useState(true);
  const [push, setPush] = useState(true);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Personalize the workspace and control notifications & security."
      />

      <Section title="Theme">
        <Row title="Dark mode" desc="Smart AI Farming is optimized for dark.">
          <Switch checked={dark} onCheckedChange={setDark} />
        </Row>
        <Row title="Compact layout" desc="Denser spacing across the dashboard.">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </Row>
      </Section>

      <Section title="Notifications">
        <Row title="Email alerts" desc="Get a digest of new predictions weekly.">
          <Switch checked={emails} onCheckedChange={setEmails} />
        </Row>
        <Row title="Push notifications" desc="Real-time alerts on disease and irrigation needs.">
          <Switch checked={push} onCheckedChange={setPush} />
        </Row>
      </Section>

      <Section title="Security">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Password updated");
          }}
          className="space-y-4"
        >
          <FieldGrid>
            <Field label="Current password">
              <Input type="password" className="h-11 glass" />
            </Field>
            <Field label="New password">
              <Input type="password" className="h-11 glass" />
            </Field>
            <Field label="Confirm new password">
              <Input type="password" className="h-11 glass" />
            </Field>
          </FieldGrid>
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90">
              Update password
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
}
