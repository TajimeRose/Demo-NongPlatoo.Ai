import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, Mic, Radio, Send, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { getPlaceById } from "@/data/places";

type DemoMessage = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
};

const suggestedQuestions = [
  "แนะนำสถานที่ท่องเที่ยว",
  "จัดทริปเที่ยวสมุทรสงคราม 1 วัน",
  "ดอนหอยหลอด",
  "แนะนำร้านอาหารอร่อยๆ",
  "ตลาดน้ำอัมพวา",
  "วัด",
  "ที่พัก",
];

const createTimestamp = () =>
  new Date().toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

const Chat = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const place = getPlaceById(searchParams.get("place") || "");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      id: "welcome",
      content: place
        ? `สวัสดีค่ะ เห็นว่าคุณสนใจ ${place.nameTh} หน้านี้เป็นตัวอย่างการสนทนาเกี่ยวกับสถานที่ค่ะ`
        : "สวัสดีค่ะ! ฉันคือน้องปลาทู ผู้ช่วยท่องเที่ยวสมุทรสงคราม หน้านี้เป็นตัวอย่างหน้าตาของระบบแชต AI",
      isUser: false,
      timestamp: createTimestamp(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showDemoNotice = (feature: string) => {
    toast({
      title: `${feature} · Demo only`,
      description: "ฟังก์ชันนี้แสดงไว้สำหรับการนำเสนอและยังไม่ได้เชื่อมต่อระบบจริง",
    });
  };

  const handleSend = (text?: string) => {
    const value = (text || input).trim();
    if (!value || isTyping) return;

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-user`,
        content: value,
        isUser: true,
        timestamp: createTimestamp(),
      },
    ]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          content:
            "นี่คือข้อความตอบกลับตัวอย่างจาก Demo NongPlatoo.Ai ระบบจริงสามารถเชื่อมต่อ AI เพื่อแนะนำสถานที่ วางแผนทริป และตอบคำถามด้านการท่องเที่ยวได้",
          isUser: false,
          timestamp: createTimestamp(),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto pt-16">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                AI Travel Assistant
              </p>
              <h1 className="font-display text-2xl font-bold">คุยกับ NongPlatoo</h1>
            </div>
            <Badge className="bg-golden text-primary">Demo conversation</Badge>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <AlertCircle className="w-4 h-4" />
            <span>ข้อความทั้งหมดเป็นข้อมูลจำลอง ไม่มีการส่งไปยัง AI หรือ backend</span>
          </div>

          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-slide-up ${message.isUser ? "justify-end" : ""}`}
              >
                {!message.isUser && (
                  <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
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
                  <p className="leading-relaxed">{message.content}</p>
                  <div
                    className={`mt-2 flex items-center gap-2 text-[11px] ${
                      message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    <span>{message.timestamp}</span>
                    {!message.isUser && (
                      <button
                        type="button"
                        onClick={() => showDemoNotice("Text to speech")}
                        className="inline-flex items-center gap-1 hover:text-primary"
                      >
                        <Volume2 className="w-3 h-3" />
                        ฟังเสียง
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-slide-up">
                <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary-foreground animate-pulse" />
                </div>
                <div className="bg-card shadow-soft border border-border rounded-2xl rounded-bl-sm px-4 py-3 min-w-[200px]">
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4 skeleton-pulse" />
                    <div className="h-3 bg-muted rounded w-full skeleton-pulse animation-delay-100" />
                    <div className="h-3 bg-muted rounded w-5/6 skeleton-pulse animation-delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {messages.length <= 2 && (
        <div className="border-t border-border bg-muted/50">
          <div className="container mx-auto px-4 py-3 max-w-3xl">
            <p className="text-xs text-muted-foreground mb-2">คำถามแนะนำ:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => handleSend(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border bg-card sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => showDemoNotice("Voice to text")}
              title="Voice to Text"
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => showDemoNotice("Voice AI")}
              className="border-cyan-500/50 text-cyan-600 hover:bg-cyan-500/10"
              title="Voice AI Assistant"
            >
              <Radio className="w-5 h-5" />
            </Button>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              placeholder="พิมพ์ข้อความ... (Type a message)"
              className="flex-1 h-12 bg-background rounded-xl"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="h-12 w-12 rounded-xl"
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
