"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, MessageCircle } from "lucide-react"
import { useChat } from "~/src/hooks/use-chat"

export default function ChatPage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    handleKeyPress,
    messageEndRef,
    clearMessages
  } = useChat()

  const suggestionMockData = [
    "What is Engr Gbadebo research focus",
    "What topics does Prof Ayodeji research?",
    "How can I contact Dr. Lawal?",
    "What courses does Engr. Ajayi teach?",
    "Tell me about Dr. Gambo.",
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    sendMessage()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-full shadow-sm">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Lecturer AI Assistant
            </h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask me about faculty members, their research, courses, or
            departments. I’ll help you find the right lecturer.
          </p>
        </div>

        {/* Chat Container */}
        <Card className="flex flex-col flex-1 shadow-md border">
          {/* Messages */}
          <div
            className="overflow-y-auto h-[28rem] p-5 space-y-6 bg-background/50"
            ref={messageEndRef}
          >
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end space-x-3 sm:max-w-[80%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 h-6 w-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className="flex-1">
                    <div
                      className={`rounded-2xl px-2 py-2 sm:px-4 sm:py-3 shadow-sm text-sm leading-relaxed ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.data}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 ml-1">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center shadow-sm">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex-shrink-0 bg-background">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about lecturers, courses, research areas..."
                className="flex-1 rounded-xl"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
             
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {suggestionMockData.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs rounded-full px-3 py-1 bg-muted/40 text-secondary hover:bg-muted"
                >
                  <MessageCircle className="mr-1 h-3 w-3 text-muted-foreground" />
                  {suggestion}
                </Button>
              ))}
            </div>
            <div className="flex justify-end">
            <Button
                onClick={clearMessages}
                disabled={messages.length < 1}
                className="rounded-xl"
                variant={"destructive"}
              >
                Clear Chat
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
