import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/pages/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart AI Farming — Precision agriculture, powered by AI" },
      {
        name: "description",
        content:
          "Boost crop productivity with AI: crop recommendations, disease detection, fertilizer & irrigation planning, and yield forecasting.",
      },
      { property: "og:title", content: "Smart AI Farming" },
      { property: "og:description", content: "AI-powered tools for the modern farmer." },
    ],
  }),
  component: Landing,
});
