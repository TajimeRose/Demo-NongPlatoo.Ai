import OpenAI from "openai";
import dotenv from "dotenv";
import { buildSystemPrompt } from "./knowledge";
import { getMessagesBySessionId, saveMessage, getOrCreateSession, updateSessionTitle } from "./db";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const apiKey =
  process.env.OPENROUTER_API_KEY ||
  process.env.DEEPSEEK_API_KEY ||
  process.env.OPENAI_API_KEY ||
  "";

const baseURL =
  process.env.OPENROUTER_BASE_URL ||
  process.env.DEEPSEEK_BASE_URL ||
  "https://openrouter.ai/api/v1";

// Remove suffix like :batch if specified to ensure streaming compatibility
const rawModel =
  process.env.OPENROUTER_MODEL ||
  process.env.DEEPSEEK_MODEL ||
  "google/gemini-2.0-flash-001";

const modelName = rawModel.replace(/:batch$/, "");

export const isAIConfigured = () => {
  return !!apiKey && apiKey.trim().length > 0;
};

export const getModelName = () => modelName;

const openaiClient = new OpenAI({
  apiKey: apiKey || "dummy-key",
  baseURL: baseURL,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:8080",
    "X-Title": "Demo NongPlatoo AI",
  },
});

export interface StreamChatParams {
  sessionId: string;
  message: string;
  placeContext?: string;
  onChunk: (chunk: string) => void;
  onError: (err: any) => void;
  onDone: (fullText: string, messageId: string) => void;
}

export const streamChatResponse = async ({
  sessionId,
  message,
  placeContext,
  onChunk,
  onError,
  onDone,
}: StreamChatParams) => {
  const userMsgId = uuidv4();
  const assistantMsgId = uuidv4();

  // Save user message to database
  getOrCreateSession(sessionId);
  saveMessage(userMsgId, sessionId, "user", message);

  // Set session title from first user message if default
  const history = getMessagesBySessionId(sessionId, 20);
  if (history.length <= 2) {
    const title = message.slice(0, 30) + (message.length > 30 ? "..." : "");
    updateSessionTitle(sessionId, title);
  }

  // If no API key configured, provide a helpful intelligent fallback
  if (!isAIConfigured()) {
    const fallbackReply = `สวัสดีค่ะ! น้องปลาทูได้รับข้อความแล้วนะคะ: "${message}"\n\n📌 **หมายเหตุสำหรับการเปิดใช้งาน AI Backend**:\nขณะนี้ระบบ Backend ยังไม่พบคีย์ในไฟล์ \`.env\` กรุณาระบุ \`OPENROUTER_API_KEY\` หรือ \`DEEPSEEK_API_KEY\` เพื่อเปิดใช้งานค่ะ 🐟✨`;

    // Stream the fallback text smoothly
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fallbackReply.length) {
        const nextChunk = fallbackReply.slice(currentIdx, currentIdx + 4);
        currentIdx += 4;
        onChunk(nextChunk);
      } else {
        clearInterval(interval);
        saveMessage(assistantMsgId, sessionId, "assistant", fallbackReply);
        onDone(fallbackReply, assistantMsgId);
      }
    }, 20);
    return;
  }

  try {
    const systemPrompt = buildSystemPrompt(message, placeContext);

    // Format chat history for AI Provider API
    const apiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];

    // Include recent history (excluding the current user message which is appended after)
    const previousMessages = history.filter((m) => m.id !== userMsgId);
    for (const m of previousMessages) {
      if (m.role === "user" || m.role === "assistant") {
        apiMessages.push({
          role: m.role,
          content: m.content,
        });
      }
    }

    // Add current user message
    apiMessages.push({
      role: "user",
      content: message,
    });

    const stream = await openaiClient.chat.completions.create({
      model: modelName,
      messages: apiMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    });

    let fullText = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        fullText += content;
        onChunk(content);
      }
    }

    saveMessage(assistantMsgId, sessionId, "assistant", fullText);
    onDone(fullText, assistantMsgId);
  } catch (error: any) {
    console.error("AI Provider API Error:", error);
    onError(error);
  }
};
