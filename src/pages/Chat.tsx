import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Mic,
  Plus,
  Radio,
  Send,
  Sparkles,
  Trash2,
  Volume2,
  History,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { getPlaceById } from "@/data/places";
import {
  streamChatMessage,
  fetchSessions,
  fetchSessionMessages,
  deleteSession as deleteSessionApi,
  fetchBackendHealth,
  ChatSession,
  BackendHealth,
} from "@/services/chatApi";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
};

const suggestedQuestions = [
  "แนะนำสถานที่ท่องเที่ยวสมุทรสงคราม",
  "จัดทริปเที่ยวสมุทรสงคราม 1 วัน",
  "ดอนหอยหลอด มีอะไรน่าสนใจ",
  "แนะนำร้านอาหารและของกินขึ้นชื่อ",
  "ตลาดน้ำอัมพวา เปิดวันไหนบ้าง",
  "วัดดังและสิ่งศักดิ์สิทธิ์ในสมุทรสงคราม",
  "แนะนำที่พักริมน้ำบรรยากาศดี",
];

const createTimestamp = (isoDate?: string) => {
  const d = isoDate ? new Date(isoDate) : new Date();
  return d.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

const Chat = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const place = getPlaceById(searchParams.get("place") || "");

  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem("nongplatoo_session_id") || generateSessionId();
  });
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: place
        ? `สวัสดีค่ะ! ยินดีต้อนรับสู่สมุทรสงคราม เห็นว่าคุณกำลังสนใจ "${place.nameTh}" สอบถามข้อมูลการเดินทาง เวลาทำการ หรือสถานที่ใกล้เคียงกับน้องปลาทูได้เลยนะคะ 🐟✨`
        : "สวัสดีค่ะ! ฉันคือน้องปลาทู AI ผู้ช่วยท่องเที่ยวสมุทรสงคราม สามารถสอบถามเรื่องสถานที่ท่องเที่ยว ที่พัก ร้านอาหาร ของฝาก หรือให้ช่วยจัดทริปเที่ยวได้เลยค่ะ 🐟✨",
      isUser: false,
      timestamp: createTimestamp(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check backend health on mount
  useEffect(() => {
    fetchBackendHealth().then((health) => {
      setBackendHealth(health);
    });
    loadSessionsList();
  }, []);

  // Sync session ID to localStorage & load its messages
  useEffect(() => {
    localStorage.setItem("nongplatoo_session_id", sessionId);
    loadCurrentSessionMessages(sessionId);
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingMessage]);

  const loadSessionsList = async () => {
    const list = await fetchSessions();
    setSessions(list);
  };

  const loadCurrentSessionMessages = async (sid: string) => {
    const data = await fetchSessionMessages(sid);
    if (data && data.messages.length > 0) {
      const formatted: Message[] = data.messages.map((m) => ({
        id: m.id,
        content: m.content,
        isUser: m.role === "user",
        timestamp: createTimestamp(m.created_at),
      }));
      setMessages(formatted);
    }
  };

  const handleStartNewChat = () => {
    const newId = generateSessionId();
    setSessionId(newId);
    setMessages([
      {
        id: "welcome",
        content:
          "สวัสดีค่ะ! เริ่มต้นการสนทนาใหม่แล้ว น้องปลาทูพร้อมแนะนำที่เที่ยวสมุทรสงครามให้คุณค่ะ มีอะไรให้ช่วยบอกได้เลยนะคะ 🐟",
        isUser: false,
        timestamp: createTimestamp(),
      },
    ]);
    setShowHistoryModal(false);
  };

  const handleSelectSession = (id: string) => {
    setSessionId(id);
    setShowHistoryModal(false);
  };

  const handleDeleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteSessionApi(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (sessionId === id) {
      handleStartNewChat();
    }
  };

  const showFeatureNotice = (feature: string) => {
    toast({
      title: feature,
      description: "ฟังก์ชันเสียงกำลังอยู่ในขั้นตอนการพัฒนาเชื่อมต่อโมเดล Speech AI",
    });
  };

  const handleSend = async (text?: string) => {
    const value = (text || input).trim();
    if (!value || isTyping) return;

    const userMessageId = `${Date.now()}-user`;
    const userTimestamp = createTimestamp();

    setMessages((current) => [
      ...current,
      {
        id: userMessageId,
        content: value,
        isUser: true,
        timestamp: userTimestamp,
      },
    ]);

    setInput("");
    setIsTyping(true);
    setStreamingMessage("");

    const placeContext = place
      ? `ชื่อสถานที่: ${place.nameTh} (${place.name})\nที่ตั้ง: ${place.addressTh}\nเวลา: ${place.openTime} - ${place.closeTime}\nรายละเอียด: ${place.descriptionTh}`
      : undefined;

    let accumulatedText = "";

    await streamChatMessage({
      sessionId,
      message: value,
      placeContext,
      onStart: () => {
        setStreamingMessage("");
      },
      onChunk: (chunk) => {
        accumulatedText += chunk;
        setStreamingMessage(accumulatedText);
      },
      onDone: (fullText, messageId) => {
        setMessages((current) => [
          ...current,
          {
            id: messageId || `${Date.now()}-assistant`,
            content: fullText || accumulatedText,
            isUser: false,
            timestamp: createTimestamp(),
          },
        ]);
        setStreamingMessage("");
        setIsTyping(false);
        loadSessionsList();
      },
      onError: (err) => {
        console.error(err);
        setMessages((current) => [
          ...current,
          {
            id: `${Date.now()}-error`,
            content: `ขออภัยค่ะ เกิดข้อผิดพลาดในการเชื่อมต่อ (${err.message}) กรุณาลองใหม่อีกครั้ง`,
            isUser: false,
            timestamp: createTimestamp(),
          },
        ]);
        setStreamingMessage("");
        setIsTyping(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto pt-16">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          {/* Header & Session Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                  AI Travel Assistant & Smart Tour
                </p>
                <h1 className="font-display text-xl font-bold">คุยกับ NongPlatoo</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs rounded-lg"
                onClick={() => setShowHistoryModal((prev) => !prev)}
              >
                <History className="w-3.5 h-3.5" />
                ประวัติ ({sessions.length})
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-1.5 text-xs rounded-lg bg-primary hover:bg-primary/90"
                onClick={handleStartNewChat}
              >
                <Plus className="w-3.5 h-3.5" />
                เริ่มแชตใหม่
              </Button>
            </div>
          </div>

          {/* Backend Status indicator */}
          <div className="mb-4 flex items-center justify-between px-3 py-2 text-xs rounded-xl bg-muted/60 border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground font-medium">
                Backend System: <strong className="text-foreground">Express + SQLite + AI Engine</strong>
              </span>
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-mono">
              {backendHealth?.isConfigured ? (backendHealth?.model || "AI Live") : "Local Engine"}
            </Badge>
          </div>

          {/* Sessions Drawer / Dropdown */}
          {showHistoryModal && (
            <div className="mb-6 p-4 rounded-xl border bg-card shadow-md animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  ประวัติการสนทนา
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowHistoryModal(false)} className="text-xs h-7">
                  ปิด
                </Button>
              </div>

              {sessions.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2">ยังไม่มีประวัติการสนทนา</p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {sessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSelectSession(s.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                        s.id === sessionId ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                      }`}
                    >
                      <div className="truncate flex-1 pr-2">
                        <span>{s.title || "การสนทนา"}</span>
                        <span className="ml-2 text-[10px] text-muted-foreground">
                          {new Date(s.updated_at).toLocaleDateString("th-TH")}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSession(s.id, e)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        title="ลบการสนทนานี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Messages Feed */}
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-slide-up ${message.isUser ? "justify-end" : ""}`}
              >
                {!message.isUser && (
                  <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5 text-secondary-foreground" />
                  </div>
                )}
                <div
                  className={
                    message.isUser
                      ? "max-w-[82%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground shadow-soft"
                      : "max-w-[82%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 shadow-soft"
                  }
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <div
                    className={`mt-2 flex items-center gap-2 text-[11px] ${
                      message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    <span>{message.timestamp}</span>
                    {!message.isUser && (
                      <button
                        type="button"
                        onClick={() => showFeatureNotice("Text to speech")}
                        className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                        ฟังเสียง
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Live Streaming Message Box */}
            {isTyping && (
              <div className="flex gap-3 animate-slide-up">
                <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-secondary-foreground animate-pulse" />
                </div>
                <div className="max-w-[82%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 shadow-soft">
                  {streamingMessage ? (
                    <div>
                      <p className="leading-relaxed whitespace-pre-wrap">{streamingMessage}</p>
                      <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />
                    </div>
                  ) : (
                    <div className="space-y-2 py-1 min-w-[180px]">
                      <div className="h-2.5 bg-muted rounded w-3/4 animate-pulse" />
                      <div className="h-2.5 bg-muted rounded w-full animate-pulse" />
                      <div className="h-2.5 bg-muted rounded w-4/6 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="border-t border-border bg-muted/40">
          <div className="container mx-auto px-4 py-3 max-w-3xl">
            <p className="text-xs text-muted-foreground mb-2 font-medium">คำถามแนะนำที่น่าสนใจ:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => handleSend(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="border-t border-border bg-card sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => showFeatureNotice("Voice to text")}
              title="Voice to Text"
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => showFeatureNotice("Voice AI Assistant")}
              className="border-cyan-500/50 text-cyan-600 hover:bg-cyan-500/10"
              title="Voice AI Assistant"
            >
              <Radio className="w-5 h-5" />
            </Button>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="ถามน้องปลาทู... (เช่น แนะนำตลาดน้ำอัมพวา หรือจัดทริป 1 วัน)"
              className="flex-1 h-12 bg-background rounded-xl text-sm"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
