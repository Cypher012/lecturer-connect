import { useState, useEffect, useRef } from "react";

export type EventMessage = {
  type: string;
  data: string;
};

export function useChat() {
  const [messages, setMessages] = useState<EventMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chat_history");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  // Persist messages to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup SSE on unmount
  useEffect(() => {
    return () => {
      eventSource?.close();
    };
  }, [eventSource]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: "user", data: userMessage }]);
    setInput("");
    setIsLoading(true);

    // Close old SSE
    eventSource?.close();

    try {
      const payload = {
        history: messages,
        latest: { type: "user", data: userMessage },
      };

      const es = new EventSource(`/api/chat?query=${encodeURIComponent(JSON.stringify(payload))}`, {
        withCredentials: false,
      });
      setEventSource(es);

      es.addEventListener("typing", (e) => {
        setMessages(prev => [...prev.filter(m => m.type !== "typing"), { type: "typing", data: e.data }]);
      });

      es.addEventListener("response_loading", (e) => {
        setMessages(prev => [...prev.filter(m => m.type !== "typing"), { type: "loading", data: e.data }]);
      });

      es.addEventListener("token", (e) => {
        setMessages(prev => {
          const filtered = prev.filter(m => m.type !== "loading" && m.type !== "typing");
          const last = filtered[filtered.length - 1];
          if (last?.type === "ai_stream") {
            const updated = [...filtered];
            updated[updated.length - 1] = { type: "ai_stream", data: last.data + e.data };
            return updated;
          } else {
            return [...filtered, { type: "ai_stream", data: e.data }];
          }
        });
      });

      es.addEventListener("stream", () => {
        setIsLoading(false);
        es.close();
        setEventSource(null);
      });

      es.addEventListener("error", (e) => {
        console.error("SSE Error:", e);
        setMessages(prev => [
          ...prev.filter(m => m.type !== "loading" && m.type !== "typing"),
          { type: "error", data: "Connection error. Please try again." },
        ]);
        setIsLoading(false);
        es.close();
        setEventSource(null);
      });
    } catch (error) {
      console.error("Failed to start SSE:", error);
      setMessages(prev => [...prev, { type: "error", data: "Failed to connect. Please try again." }]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    handleKeyPress,
    messageEndRef,
  };
}
