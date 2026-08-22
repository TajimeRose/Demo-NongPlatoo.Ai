import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  listSessions,
  getSession,
  deleteSession,
  getMessagesBySessionId,
  getOrCreateSession,
} from "./db";
import { streamChatResponse, isAIConfigured, getModelName } from "./aiService";
import { samutSongkhramKnowledge, searchKnowledge } from "./knowledge";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health & Status check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "NongPlatoo AI Chat Backend",
    isConfigured: isAIConfigured(),
    model: getModelName(),
  });
});

// List all chat sessions
app.get("/api/sessions", (_req: Request, res: Response) => {
  try {
    const sessions = listSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// Create a new session
app.post("/api/sessions", (req: Request, res: Response) => {
  try {
    const sessionId = req.body.sessionId || uuidv4();
    const title = req.body.title || "สนทนาใหม่";
    const session = getOrCreateSession(sessionId, title);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Get session details & messages
app.get("/api/sessions/:sessionId/messages", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    const messages = getMessagesBySessionId(sessionId);
    res.json({ session, messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Delete a session
app.delete("/api/sessions/:sessionId", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    deleteSession(sessionId);
    res.json({ success: true, message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete session" });
  }
});

// Knowledge search endpoint
app.get("/api/knowledge", (req: Request, res: Response) => {
  const query = (req.query.q as string) || "";
  if (query) {
    res.json(searchKnowledge(query));
  } else {
    res.json(samutSongkhramKnowledge);
  }
});

// SSE Streaming Chat Endpoint
app.post("/api/chat/stream", async (req: Request, res: Response) => {
  const { sessionId = uuidv4(), message, placeContext } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Set SSE Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent("start", { sessionId });

    await streamChatResponse({
      sessionId,
      message: message.trim(),
      placeContext,
      onChunk: (chunk: string) => {
        sendEvent("chunk", { text: chunk });
      },
      onError: (err: any) => {
        sendEvent("error", { message: err?.message || "Internal server error" });
        res.end();
      },
      onDone: (fullText: string, messageId: string) => {
        sendEvent("done", { fullText, messageId, sessionId });
        res.end();
      },
    });
  } catch (error: any) {
    console.error("Stream endpoint error:", error);
    sendEvent("error", { message: error?.message || "Failed to process chat" });
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 NongPlatoo AI Backend running on http://localhost:${PORT}`);
  console.log(`🔑 AI Provider Configured: ${isAIConfigured()}`);
  console.log(`🤖 Model: ${getModelName()}`);
});
