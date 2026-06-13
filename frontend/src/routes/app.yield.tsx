import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/AppShell";
import { Field, FieldGrid, ResultCard, Section } from "@/components/app/ResultCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart as LineIcon, Loader2 } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/app/yield")({
  head: () => ({ meta: [{ title: "Yield Prediction — Smart AI Farming" }] }),
  component: YieldPage,
});

const CROPS = [
  "Cassava",
  "Maize",
  "Plantains and others",
  "Potatoes",
  "Rice, paddy",
  "Sorghum",
  "Soybeans",
  "Sweet potatoes",
  "Wheat",
  "Yams",
];

function YieldPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Module · Yield"
        title="Yield Prediction"
        description="Forecast harvest output using crop, rainfall, pesticide and climate inputs."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setResult(null);
          setTimeout(() => {
            setLoading(false);
            setResult(48317);
          }, 1200);
        }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <Section title="Inputs">
            <FieldGrid>
              <Field label="Crop">
                <Select name="crop" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {CROPS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Rainfall" hint="mm / year">
                <Input
                  name="rainfall"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 1200"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Pesticides" hint="tonnes">
                <Input
                  name="pesticides"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 150"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Temperature" hint="°C avg">
                <Input
                  name="temperature"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 24"
                  className="h-11 glass"
                />
              </Field>
            </FieldGrid>
            <div className="mt-6 flex justify-end">
              <Button
                disabled={loading}
                className="h-11 bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Forecasting…
                  </>
                ) : (
                  <>
                    <LineIcon className="mr-2 h-4 w-4" />
                    Predict yield
                  </>
                )}
              </Button>
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <ResultCard
            visible={result !== null}
            label="Predicted yield"
            value={
              result !== null ? (
                <>
                  <AnimatedCounter value={result} />{" "}
                  <span className="text-2xl text-muted-foreground">hg/ha</span>
                </>
              ) : (
                ""
              )
            }
            meta="Hectogrammes per hectare, projected for the upcoming season."
          />
          {result === null && (
            <div className="rounded-2xl glass p-6 text-sm text-muted-foreground">
              Provide inputs to forecast your yield.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
