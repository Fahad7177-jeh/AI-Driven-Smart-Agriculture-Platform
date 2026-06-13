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
const soilMap = {
  Clay: 0,
  Loamy: 1,
  Sandy: 2,
  Silt: 3,
};

const cropMap = {
  Wheat: 0,
  Maize: 1,
  Cotton: 2,
  Rice: 3,
  Sugarcane: 4,
  Potato: 5,
};

const stageMap = {
  Sowing: 0,
  Vegetative: 1,
  Flowering: 2,
  Harvest: 3,
};

const seasonMap = {
  Kharif: 0,
  Rabi: 1,
  Zaid: 2,
};

const irrigationTypeMap = {
  Rainfed: 0,
  Canal: 1,
  Drip: 2,
  Sprinkler: 3,
};

const sourceMap = {
  Reservoir: 0,
  Groundwater: 1,
  River: 2,
  Rainwater: 3,
};

const regionMap = {
  South: 0,
  Central: 1,
  North: 2,
  East: 3,
  West: 4,
};

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
        onSubmit={async (e) => {
          e.preventDefault();

          setLoading(true);
          setResult(null);

          const form = new FormData(e.currentTarget);

          const payload = {
            Soil_Type: soilMap[form.get("soil_type") as keyof typeof soilMap],
            Soil_pH: Number(form.get("soil_ph")),
            Soil_Moisture: Number(form.get("soil_moisture")),
            Organic_Carbon: Number(form.get("organic_carbon")),
            Electrical_Conductivity: Number(form.get("electrical_conductivity")),
            Temperature_C: Number(form.get("temperature")),
            Humidity: Number(form.get("humidity")),
            Rainfall_mm: Number(form.get("rainfall")),
            Sunlight_Hours: Number(form.get("sunlight_hours")),
            Wind_Speed_kmh: Number(form.get("wind_speed")),
            Crop_Type: cropMap[form.get("crop_type") as keyof typeof cropMap],
            Crop_Growth_Stage: stageMap[form.get("crop_growth_stage") as keyof typeof stageMap],
            Season: seasonMap[form.get("season") as keyof typeof seasonMap],
            Irrigation_Type:
              irrigationTypeMap[form.get("irrigation_type") as keyof typeof irrigationTypeMap],
            Water_Source: sourceMap[form.get("water_source") as keyof typeof sourceMap],
            Field_Area_hectare: Number(form.get("field_area")),
            Mulching_Used: form.get("mulching_used") === "Yes" ? 1 : 0,
            Previous_Irrigation_mm: Number(form.get("previous_irrigation")),
            Region: regionMap[form.get("region") as keyof typeof regionMap],
          };

          try {
            const response = await fetch("http://127.0.0.1:8003/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.error);
            }

            setResult(data.irrigation_need);
          } catch (error) {
            console.error(error);
            alert("Irrigation Prediction Failed");
          } finally {
            setLoading(false);
          }
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
