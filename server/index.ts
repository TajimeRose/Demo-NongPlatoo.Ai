import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { streamChatResponse, isAIConfigured, getModelName } from "./aiService";
import { samutSongkhramKnowledge, searchKnowledge } from "./knowledge";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "NongPlatoo AI Travel Guide",
    isConfigured: isAIConfigured(),
    model: getModelName(),
  });
});

// Knowledge API
app.get("/api/places", (req: Request, res: Response) => {
  const query = (req.query.q as string) || "";
  const category = (req.query.category as string) || "";
  const top = req.query.top ? parseInt(req.query.top as string, 10) : undefined;

  let results = searchKnowledge(query);
  if (category) {
    results = results.filter((p) => p.category === category);
  }
  if (top && !isNaN(top)) {
    results = results.sort((a, b) => b.popularScore - a.popularScore).slice(0, top);
  }
  res.json(results);
});

// SSE Streaming Chat Endpoint
app.post("/api/chat/stream", async (req: Request, res: Response) => {
  const { message, history, placeContext } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent("start", { status: "ready" });

    await streamChatResponse({
      message: message.trim(),
      history: Array.isArray(history) ? history : [],
      placeContext,
      onChunk: (chunk: string) => {
        sendEvent("chunk", { text: chunk });
      },
      onError: (err: any) => {
        sendEvent("error", { message: err?.message || "Internal server error" });
        res.end();
      },
      onDone: (fullText: string) => {
        sendEvent("done", { fullText });
        res.end();
      },
    });
  } catch (error: any) {
    console.error("Stream error:", error);
    sendEvent("error", { message: error?.message || "Failed to process chat" });
    res.end();
  }
});

// Serve frontend build in production on Render (Single Web Service mode)
const distPath = path.resolve(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req: Request, res: Response, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`NongPlatoo AI Travel Guide running on port ${PORT}`);
  console.log(`AI Configured: ${isAIConfigured()}`);
  console.log(`Model: ${getModelName()}`);
});
