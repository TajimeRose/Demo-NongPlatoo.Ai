export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface BackendMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export interface BackendHealth {
  status: string;
  service: string;
  isConfigured: boolean;
  model: string;
}

export const fetchBackendHealth = async (): Promise<BackendHealth | null> => {
  try {
    const res = await fetch("/api/health");
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchSessions = async (): Promise<ChatSession[]> => {
  try {
    const res = await fetch("/api/sessions");
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
    return [];
  }
};

export const fetchSessionMessages = async (
  sessionId: string
): Promise<{ session: ChatSession; messages: BackendMessage[] } | null> => {
  try {
    const res = await fetch(`/api/sessions/${sessionId}/messages`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch session messages:", err);
    return null;
  }
};

export const deleteSession = async (sessionId: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/sessions/${sessionId}`, { method: "DELETE" });
    return res.ok;
  } catch (err) {
    console.error("Failed to delete session:", err);
    return false;
  }
};

export interface StreamChatOptions {
  sessionId: string;
  message: string;
  placeContext?: string;
  onStart?: () => void;
  onChunk: (chunk: string) => void;
  onDone?: (fullText: string, messageId: string) => void;
  onError?: (err: Error) => void;
}

export const streamChatMessage = async ({
  sessionId,
  message,
  placeContext,
  onStart,
  onChunk,
  onDone,
  onError,
}: StreamChatOptions): Promise<void> => {
  try {
    const response = await fetch("/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        message,
        placeContext,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response stream body available");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        let eventType = "message";
        let rawData = "";

        const subLines = trimmed.split("\n");
        for (const subLine of subLines) {
          if (subLine.startsWith("event:")) {
            eventType = subLine.replace("event:", "").trim();
          } else if (subLine.startsWith("data:")) {
            rawData = subLine.replace("data:", "").trim();
          }
        }

        if (!rawData) continue;

        try {
          const parsed = JSON.parse(rawData);

          if (eventType === "start") {
            onStart?.();
          } else if (eventType === "chunk") {
            if (parsed.text) {
              onChunk(parsed.text);
            }
          } else if (eventType === "done") {
            onDone?.(parsed.fullText || "", parsed.messageId || "");
          } else if (eventType === "error") {
            onError?.(new Error(parsed.message || "Unknown error from server"));
          }
        } catch (e) {
          console.error("Error parsing SSE event:", e, rawData);
        }
      }
    }
  } catch (err: any) {
    console.error("Stream chat error:", err);
    onError?.(err instanceof Error ? err : new Error(String(err)));
  }
};
