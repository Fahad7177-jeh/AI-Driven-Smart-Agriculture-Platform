import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHeader } from "@/components/app/AppShell";
import { ResultCard } from "@/components/app/ResultCard";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus, ScanLine, Loader2, X } from "lucide-react";
import { motion } from "@/lib/motion";

export const Route = createFileRoute("/app/disease")({
  head: () => ({ meta: [{ title: "Disease Detection — Smart AI Farming" }] }),
  component: DiseasePage,
});

function DiseasePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ name: string; confidence: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);

    setPreview(url);
    setSelectedFile(file);
    setResult(null);
  };

  const analyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("http://127.0.0.1:8001/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setResult({
        name: data.disease.split("_").join(" "),
        confidence: data.confidence,
      });
    } catch (error) {
      console.error(error);
      alert("Disease Detection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Module · Vision"
        title="Disease Detection"
        description="Upload a clear photo of a leaf. Our vision model returns the most likely disease and its confidence."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl glass p-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
              onClick={() => {
                if (!preview) inputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !preview) inputRef.current?.click();
              }}
              className={`relative grid place-items-center rounded-2xl border-2 border-dashed p-10 transition-colors ${
                dragOver ? "border-emerald-400 bg-emerald-500/5" : "border-white/10"
              } ${preview ? "" : "cursor-pointer hover:border-emerald-400/60 hover:bg-emerald-500/5"}`}
            >
              {preview ? (
                <div className="relative w-full max-w-md">
                  <img src={preview} alt="Leaf preview" className="w-full rounded-xl" />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setResult(null);
                    }}
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/80 backdrop-blur"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {loading && (
                    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                      <motion.div
                        initial={{ y: "-10%" }}
                        animate={{ y: "110%" }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_30px_4px_oklch(0.78_0.18_155/0.7)]"
                      />
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-sm font-medium">Drag & drop your leaf image</div>
                  <div className="mt-1 text-xs text-muted-foreground">PNG / JPG up to 10MB</div>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="outline" className="glass" onClick={() => inputRef.current?.click()}>
                <ImagePlus className="mr-2 h-4 w-4" /> Choose image
              </Button>
              <Button
                disabled={!preview || loading}
                onClick={analyze}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-950 hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning…
                  </>
                ) : (
                  <>
                    <ScanLine className="mr-2 h-4 w-4" />
                    Detect disease
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            visible={!!result}
            label="Detection result"
            value={result?.name}
            meta={result ? `Model confidence in this classification.` : undefined}
          >
            {result && (
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Confidence</span>
                  <span className="font-medium text-foreground">
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                  />
                </div>
              </div>
            )}
          </ResultCard>

          {!result && (
            <div className="rounded-2xl glass p-6 text-sm text-muted-foreground">
              {preview ? "Click Detect disease to analyze the image." : "Upload an image to begin."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
