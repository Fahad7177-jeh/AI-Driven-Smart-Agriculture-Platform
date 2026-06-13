import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/app/AppShell";
import { Field, FieldGrid, ResultCard, Section } from "@/components/app/ResultCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sprout, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/crop")({
  head: () => ({ meta: [{ title: "Crop Recommendation — Smart AI Farming" }] }),
  component: CropPage,
});

const FIELDS = [
  ["nitrogen", "Nitrogen (N)", "mg/kg", "e.g. 90"],
  ["phosphorus", "Phosphorus (P)", "mg/kg", "e.g. 42"],
  ["potassium", "Potassium (K)", "mg/kg", "e.g. 43"],
  ["temperature", "Temperature", "°C", "e.g. 25.5"],
  ["humidity", "Humidity", "%", "e.g. 80"],
  ["ph", "pH", "0–14", "e.g. 6.5"],
  ["rainfall", "Rainfall", "mm", "e.g. 200"],
] as const;

function CropPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Module · Crop"
        title="Crop Recommendation"
        description="Enter soil and climate inputs to get the AI-recommended crop best suited to your field."
      />

      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          setLoading(true);
          setResult(null);

          const formData = new FormData(e.currentTarget);

          const payload = {
            N: Number(formData.get("nitrogen")),
            P: Number(formData.get("phosphorus")),
            K: Number(formData.get("potassium")),
            temperature: Number(formData.get("temperature")),
            humidity: Number(formData.get("humidity")),
            ph: Number(formData.get("ph")),
            rainfall: Number(formData.get("rainfall")),
          };

          try {
            const response = await fetch("http://localhost:8000/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            if (!response.ok) {
              throw new Error("API Error");
            }

            const data = await response.json();

            setResult(data.recommended_crop);
          } catch (error) {
            console.error("Prediction Error:", error);
            alert("Prediction Failed");
          } finally {
            setLoading(false);
          }
        }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <Section
            title="Field inputs"
            description="All fields are required. Values feed into the trained crop model."
          >
            <FieldGrid>
              {FIELDS.map(([name, label, hint, ph]) => (
                <Field key={name} label={label} hint={hint}>
                  <Input
                    name={name}
                    required
                    type="number"
                    step="any"
                    placeholder={ph}
                    className="h-11 glass"
                  />
                </Field>
              ))}
            </FieldGrid>
            <div className="mt-6 flex justify-end">
              <Button
                disabled={loading}
                className="h-11 bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Predicting…
                  </>
                ) : (
                  <>
                    <Sprout className="mr-2 h-4 w-4" />
                    Recommend crop
                  </>
                )}
              </Button>
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <ResultCard
            visible={!!result}
            label="Recommended crop"
            value={result ?? ""}
            meta="Based on your soil profile and seasonal climate inputs."
          />
          {!result && !loading && (
            <div className="rounded-2xl glass p-6 text-sm text-muted-foreground">
              Submit the form to see your AI-recommended crop.
            </div>
          )}
          {loading && (
            <div className="rounded-2xl glass p-6">
              <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-8 w-2/3 animate-pulse rounded bg-white/10" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
