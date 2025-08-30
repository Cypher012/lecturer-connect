import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Bot, ExternalLink } from "lucide-react"
import type { ChatMessage } from "@/lib/chatbot"
import Link from "next/link"

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessageComponent({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-accent-foreground" />
        </div>
      )}

      <Card className={`max-w-[80%] ${isUser ? "bg-accent text-accent-foreground" : "bg-card"}`}>
        <div className="p-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content.split("\n").map((line, index) => {
              // Handle bold text
              if (line.includes("**")) {
                const parts = line.split("**")
                return (
                  <div key={index}>
                    {parts.map((part, partIndex) =>
                      partIndex % 2 === 1 ? (
                        <strong key={partIndex}>{part}</strong>
                      ) : (
                        <span key={partIndex}>{part}</span>
                      ),
                    )}
                  </div>
                )
              }
              return <div key={index}>{line || "\u00A0"}</div>
            })}
          </div>

          {message.lecturerLinks && message.lecturerLinks.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {message.lecturerLinks.map((link, index) => (
                  <Link key={index} href={link}>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Profile
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2 text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </Card>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}
