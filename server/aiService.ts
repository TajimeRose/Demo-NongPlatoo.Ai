import OpenAI from "openai";
import dotenv from "dotenv";
import { buildSystemPrompt } from "./knowledge";

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

export interface MessageInput {
  role: "user" | "assistant";
  content: string;
}

export interface StreamChatParams {
  message: string;
  history?: MessageInput[];
  placeContext?: string;
  onChunk: (chunk: string) => void;
  onError: (err: any) => void;
  onDone: (fullText: string) => void;
}

export const streamChatResponse = async ({
  message,
  history = [],
  placeContext,
  onChunk,
  onError,
  onDone,
}: StreamChatParams) => {
  if (!isAIConfigured()) {
    const fallbackReply = `สวัสดีค่ะ ยินดีต้อนรับสู่ระบบแนะนำการท่องเที่ยวสมุทรสงคราม\n\nหากท่านต้องการสอบถามข้อมูลสถานที่ท่องเที่ยว ร้านอาหาร หรือโรงแรมที่พักในสมุทรสงคราม กรุณาตั้งค่า API Key ในไฟล์ .env เพื่อเริ่มการสนทนาค่ะ`;

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fallbackReply.length) {
        const nextChunk = fallbackReply.slice(currentIdx, currentIdx + 4);
        currentIdx += 4;
        onChunk(nextChunk);
      } else {
        clearInterval(interval);
        onDone(fallbackReply);
      }
    }, 20);
    return;
  }

  try {
    const systemPrompt = buildSystemPrompt(message, placeContext);

    // Build message array for stateless request
    const apiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];

    // Append prior messages from current session memory sent by client (last 6 messages max)
    const recentHistory = history.slice(-6);
    for (const m of recentHistory) {
      apiMessages.push({
        role: m.role,
        content: m.content,
      });
    }

    // Add current user prompt
    apiMessages.push({
      role: "user",
      content: message,
    });

    const stream = await openaiClient.chat.completions.create({
      model: modelName,
      messages: apiMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 4000,
    });

    let fullText = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        fullText += content;
        onChunk(content);
      }
    }

    onDone(fullText);
  } catch (error: any) {
    console.error("AI API Error:", error);
    onError(error);
  }
};
