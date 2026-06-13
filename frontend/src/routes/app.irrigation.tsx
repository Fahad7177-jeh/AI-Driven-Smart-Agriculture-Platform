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
import { Droplets, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/irrigation")({
  head: () => ({ meta: [{ title: "Irrigation Recommendation — Smart AI Farming" }] }),
  component: IrrigationPage,
});

const SOIL = ["Clay", "Loamy", "Sandy", "Silt"];
const CROPS = ["Wheat", "Maize", "Cotton", "Rice", "Sugarcane", "Potato"];
const STAGES = ["Sowing", "Vegetative", "Flowering", "Harvest"];
const SEASONS = ["Kharif", "Rabi", "Zaid"];
const IRR_TYPES = ["Rainfed", "Canal", "Drip", "Sprinkler"];
const SOURCES = ["Reservoir", "Groundwater", "River", "Rainwater"];
const REGIONS = ["South", "Central", "North", "East", "West"];

type Need = "Low" | "Medium" | "High";

function IrrigationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Need | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Module · Irrigation"
        title="Irrigation Recommendation"
        description="Multi-source intelligence: soil, weather, crop and farm context turned into a clear irrigation need."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setResult(null);
          setTimeout(() => {
            setLoading(false);
            setResult("Medium");
          }, 1200);
        }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="space-y-4 lg:col-span-2">
          <Section title="Soil information">
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
              <Field label="Soil pH">
                <Input
                  name="soil_ph"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 6.5"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Soil moisture" hint="%">
                <Input
                  name="soil_moisture"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 35"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Organic carbon" hint="%">
                <Input
                  name="organic_carbon"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 0.8"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Electrical conductivity" hint="dS/m">
                <Input
                  name="electrical_conductivity"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 1.2"
                  className="h-11 glass"
                />
              </Field>
            </FieldGrid>
          </Section>

          <Section title="Weather information">
            <FieldGrid>
              <Field label="Temperature" hint="°C">
                <Input
                  name="temperature"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 27"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Humidity" hint="%">
                <Input
                  name="humidity"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 60"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Rainfall" hint="mm">
                <Input
                  name="rainfall"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 12"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Sunlight hours" hint="hrs/day">
                <Input
                  name="sunlight_hours"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 8"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Wind speed" hint="km/h">
                <Input
                  name="wind_speed"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 10"
                  className="h-11 glass"
                />
              </Field>
            </FieldGrid>
          </Section>

          <Section title="Crop information">
            <FieldGrid>
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
              <Field label="Crop growth stage">
                <Select name="crop_growth_stage" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Season">
                <Select name="season" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEASONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGrid>
          </Section>

          <Section title="Farm information">
            <FieldGrid>
              <Field label="Irrigation type">
                <Select name="irrigation_type" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {IRR_TYPES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Water source">
                <Select name="water_source" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Field area" hint="hectare">
                <Input
                  name="field_area"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 2.5"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Mulching used">
                <Select name="mulching_used" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Previous irrigation" hint="days ago">
                <Input
                  name="previous_irrigation"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 5"
                  className="h-11 glass"
                />
              </Field>
              <Field label="Region">
                <Select name="region" required>
                  <SelectTrigger className="h-11 glass">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    Computing…
                  </>
                ) : (
                  <>
                    <Droplets className="mr-2 h-4 w-4" />
                    Recommend irrigation
                  </>
                )}
              </Button>
            </div>
          </Section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <ResultCard
            visible={!!result}
            label="Irrigation need"
            value={result ?? ""}
            meta={
              result === "Low"
                ? "Hold off — soil + weather indicate sufficient moisture."
                : result === "Medium"
                  ? "Moderate irrigation recommended this cycle."
                  : result === "High"
                    ? "Irrigate soon — drought risk detected."
                    : ""
            }
          >
            {result && (
              <div className="flex gap-2">
                {(["Low", "Medium", "High"] as Need[]).map((n) => (
                  <span
                    key={n}
                    className={`rounded-full px-3 py-1 text-xs ${
                      result === n
                        ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 font-semibold"
                        : "glass text-muted-foreground"
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}
          </ResultCard>
          {!result && (
            <div className="rounded-2xl glass p-6 text-sm text-muted-foreground">
              Complete the form to get an irrigation recommendation.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
