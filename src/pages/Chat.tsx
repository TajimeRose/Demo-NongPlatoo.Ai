import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Bot,
  CheckCircle2,
  Mic,
  MicOff,
  RotateCcw,
  Radio,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { getPlaceById } from "@/data/places";
import {
  streamChatMessage,
  fetchBackendHealth,
  BackendHealth,
  ChatMessageItem,
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
  "แนะนำร้านอาหารและของกินขึ้นชื่อ",
  "แนะนำโรงแรมและที่พักริมน้ำ",
  "ตลาดน้ำอัมพวา เปิดวันไหนบ้าง",
  "วัดบางกุ้งและวัดดังในสมุทรสงคราม",
  "ดอนหอยหลอด มีอะไรน่าสนใจ",
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

  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const getInitialMessage = (): Message => ({
    id: "welcome",
    content: place
      ? `สวัสดีค่ะ เห็นว่าคุณสนใจ "${place.nameTh}" สามารถสอบถามข้อมูลการเดินทาง เวลาเปิด-ปิด หรือร้านอาหารและที่พักใกล้เคียงได้เลยค่ะ`
      : "สวัสดีค่ะ ฉันคือน้องปลาทู ผู้ช่วยท่องเที่ยวสมุทรสงคราม มีอะไรให้ช่วยแนะนำสถานที่ท่องเที่ยว ร้านอาหาร หรือที่พัก สอบถามได้เลยค่ะ",
    isUser: false,
    timestamp: createTimestamp(),
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBackendHealth().then((health) => {
      setBackendHealth(health);
    });

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: "ไม่รองรับการพิมพ์ด้วยเสียง",
        description: "เบราว์เซอร์ของคุณไม่รองรับ Web Speech API กรุณาใช้ Google Chrome หรือ Edge",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "th-TH";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "กำลังฟังเสียง...",
          description: "พูดเพื่อพิมพ์ข้อความลงในช่องแชทได้เลยค่ะ",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error !== "no-speech" && event.error !== "aborted") {
          toast({
            title: "เกิดข้อผิดพลาดในการฟังเสียง",
            description: `ข้อผิดพลาด: ${event.error}`,
            variant: "destructive",
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Error starting speech recognition:", err);
      setIsListening(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingMessage]);

  const handleResetChat = () => {
    setMessages([getInitialMessage()]);
    setInput("");
    setStreamingMessage("");
    setIsTyping(false);
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

    const updatedMessages = [
      ...messages,
      {
        id: userMessageId,
        content: value,
        isUser: true,
        timestamp: userTimestamp,
      },
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);
    setStreamingMessage("");

    const placeContext = place
      ? `ชื่อสถานที่: ${place.nameTh} (${place.name})\nที่ตั้ง: ${place.addressTh}\nเวลา: ${place.openTime} - ${place.closeTime}\nรายละเอียด: ${place.descriptionTh}`
      : undefined;

    // Send conversation context directly in request (no database stored)
    const historyPayload: ChatMessageItem[] = updatedMessages
      .filter((m) => m.id !== "welcome" && m.id !== userMessageId)
      .map((m) => ({
        role: m.isUser ? "user" : "assistant",
        content: m.content,
      }));

    let accumulatedText = "";

    await streamChatMessage({
      message: value,
      history: historyPayload,
      placeContext,
      onStart: () => {
        setStreamingMessage("");
      },
      onChunk: (chunk) => {
        accumulatedText += chunk;
        setStreamingMessage(accumulatedText);
      },
      onDone: (fullText) => {
        setMessages((current) => [
          ...current,
          {
            id: `${Date.now()}-assistant`,
            content: fullText || accumulatedText,
            isUser: false,
            timestamp: createTimestamp(),
          },
        ]);
        setStreamingMessage("");
        setIsTyping(false);
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
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                  AI Travel Assistant
                </p>
                <h1 className="font-display text-xl font-bold">คุยกับ NongPlatoo</h1>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs rounded-lg"
              onClick={handleResetChat}
              title="เริ่มบทสนทนาใหม่"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              ล้างบทสนทนา
            </Button>
          </div>

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
              variant={isListening ? "default" : "secondary"}
              size="icon"
              onClick={toggleSpeechRecognition}
              title={isListening ? "กำลังฟัง... (คลิกเพื่อหยุด)" : "พิมพ์ด้วยเสียง (Voice Typing)"}
              className={isListening ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : ""}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
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
              placeholder={isListening ? "กำลังฟังเสียงของคุณ..." : "ถามเกี่ยวกับสถานที่ท่องเที่ยว ร้านอาหาร หรือโรงแรมในสมุทรสงคราม..."}
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