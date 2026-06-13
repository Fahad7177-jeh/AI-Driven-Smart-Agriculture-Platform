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
import { FlaskConical, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/fertilizer")({
  head: () => ({ meta: [{ title: "Fertilizer Recommendation — Smart AI Farming" }] }),
  component: FertilizerPage,
});

const SOIL = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
const CROPS = [
  "Maize",
  "Sugarcane",
  "Cotton",
  "Tobacco",
  "Paddy",
  "Barley",
  "Wheat",
  "Millets",
  "Oil seeds",
  "Pulses",
  "Ground Nuts",
];

function FertilizerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Module · Fertilizer"
        title="Fertilizer Recommendation"
        description="Match the right fertilizer to your soil, crop and nutrient profile."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setResult(null);
          setTimeout(() => {
            setLoading(false);
            setResult("Urea");
          }, 1100);
        }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 space-y-4">
          <Section title="Environment">
            <FieldGrid>
              <Field label="Temperature" hint="°C">
                <Input
                  name="temperature"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 28"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Humidity" hint="%">
                <Input
                  name="humidity"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 65"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Moisture" hint="%">
                <Input
                  name="moisture"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 40"
                  className="h-11 glass"
                />
              </Field>
            </FieldGrid>
          </Section>

          <Section title="Soil & crop">
            <FieldGrid>
              <Field label="Soil type">
                <Select name="soil_type" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select soil" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOIL.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Crop type">
                <Select name="crop_type" required>
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
            </FieldGrid>
          </Section>

          <Section title="Nutrient profile">
            <FieldGrid>
              <Field label="Nitrogen" hint="mg/kg">
                <Input
                  name="nitrogen"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 37"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Potassium" hint="mg/kg">
                <Input
                  name="potassium"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 0"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Phosphorous" hint="mg/kg">
                <Input
                  name="phosphorous"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 0"
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
                    Calculating…
                  </>
                ) : (
                  <>
                    <FlaskConical className="mr-2 h-4 w-4" />
                    Recommend fertilizer
                  </>
                )}
              </Button>
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <ResultCard
            visible={!!result}
            label="Recommended fertilizer"
            value={result ?? ""}
            meta="Optimal product matched to your soil and crop profile."
          />
          {!result && (
            <div className="rounded-2xl glass p-6 text-sm text-muted-foreground">
              Fill the form and submit to see your recommendation.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
