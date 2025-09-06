"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, MessageCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { lecturers, departments, searchLecturers } from "@/lib/mock-data"
import type { Lecturer } from "@/lib/mock-data"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  lecturers?: Lecturer[]
  suggestions?: string[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hello! I'm your AI assistant for the Faculty of Computing. I can help you find information about our lecturers, their research areas, courses they teach, and much more. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Who teaches Machine Learning?",
        "Tell me about Dr. Jane Doe",
        "Show me lecturers in Cybersecurity",
        "What research areas are available?",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const processQuery = (query: string): { content: string; lecturers?: Lecturer[]; suggestions?: string[] } => {
    const lowerQuery = query.toLowerCase()

    // Check if asking about a specific lecturer by name
    const lecturerByName = lecturers.find((lecturer) =>
      lecturer.full_name.toLowerCase().includes(lowerQuery.replace(/dr\.?|prof\.?|professor/gi, "").trim()),
    )

    if (lecturerByName) {
      return {
        content: `Here's information about ${lecturerByName.full_name}:

**${lecturerByName.title}** in ${lecturerByName.department}

**Research Areas:** ${lecturerByName.research_areas.join(", ")}

**Courses Taught:** ${lecturerByName.courses_taught.join(", ")}

**Contact:** ${lecturerByName.email}

${lecturerByName.qualifications.length > 0 ? `**Qualifications:** ${lecturerByName.qualifications.join(", ")}` : ""}

You can view their complete profile for more details about publications and projects.`,
        lecturers: [lecturerByName],
        suggestions: [
          "Show me their publications",
          "Who else teaches similar courses?",
          "Find lecturers in the same department",
        ],
      }
    }

    // Check if asking about courses
    if (lowerQuery.includes("who teaches") || lowerQuery.includes("teaches")) {
      const courseQuery = lowerQuery
        .replace(/who teaches|teaches|course|subject/gi, "")
        .trim()
        .replace(/\?/g, "")

      const lecturersTeachingCourse = lecturers.filter((lecturer) =>
        lecturer.courses_taught.some((course) => course.toLowerCase().includes(courseQuery)),
      )

      if (lecturersTeachingCourse.length > 0) {
        const courseNames = Array.from(
          new Set(
            lecturersTeachingCourse.flatMap((lecturer) =>
              lecturer.courses_taught.filter((course) => course.toLowerCase().includes(courseQuery)),
            ),
          ),
        )

        return {
          content: `I found ${lecturersTeachingCourse.length} lecturer${lecturersTeachingCourse.length > 1 ? "s" : ""} who teach${lecturersTeachingCourse.length === 1 ? "es" : ""} courses related to "${courseQuery}":

${lecturersTeachingCourse
  .map(
    (lecturer) =>
      `• **${lecturer.full_name}** (${lecturer.title}) - ${lecturer.department}\n  Teaches: ${lecturer.courses_taught.join(", ")}`,
  )
  .join("\n\n")}

${courseNames.length > 0 ? `**Specific courses found:** ${courseNames.join(", ")}` : ""}`,
          lecturers: lecturersTeachingCourse,
          suggestions: ["Tell me more about their research", "Show me their contact information"],
        }
      }
    }

    // Check if asking about departments
    if (lowerQuery.includes("department") || lowerQuery.includes("lecturers in")) {
      const deptQuery = lowerQuery
        .replace(/lecturers in|department|show me|find/gi, "")
        .trim()
        .replace(/\?/g, "")

      const matchingDept = departments.find((dept) => dept.name.toLowerCase().includes(deptQuery))

      if (matchingDept) {
        const deptLecturers = lecturers.filter((lecturer) => lecturer.department === matchingDept.name)

        return {
          content: `Here are the ${deptLecturers.length} lecturers in ${matchingDept.name}:

${deptLecturers
  .map(
    (lecturer) =>
      `• **${lecturer.full_name}** - ${lecturer.title}\n  Research: ${lecturer.research_areas.slice(0, 2).join(", ")}${lecturer.research_areas.length > 2 ? "..." : ""}`,
  )
  .join("\n\n")}

**Department Focus:** ${matchingDept.description}`,
          lecturers: deptLecturers,
          suggestions: ["Show me their courses", "Tell me about their research"],
        }
      }
    }

    // Check if asking about research areas
    if (lowerQuery.includes("research") || lowerQuery.includes("specializ")) {
      const researchQuery = lowerQuery
        .replace(/research|specializ|area|field|expert/gi, "")
        .trim()
        .replace(/\?/g, "")

      const lecturersInResearch = lecturers.filter((lecturer) =>
        lecturer.research_areas.some((area) => area.toLowerCase().includes(researchQuery)),
      )

      if (lecturersInResearch.length > 0) {
        return {
          content: `I found ${lecturersInResearch.length} lecturer${lecturersInResearch.length > 1 ? "s" : ""} specializing in areas related to "${researchQuery}":

${lecturersInResearch
  .map(
    (lecturer) =>
      `• **${lecturer.full_name}** (${lecturer.department})\n  Research Areas: ${lecturer.research_areas.join(", ")}`,
  )
  .join("\n\n")}`,
          lecturers: lecturersInResearch,
          suggestions: ["Show me their publications", "What courses do they teach?"],
        }
      }
    }

    // General search
    const searchResults = searchLecturers(query)
    if (searchResults.length > 0) {
      return {
        content: `I found ${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for "${query}":

${searchResults
  .slice(0, 5)
  .map(
    (lecturer) =>
      `• **${lecturer.full_name}** - ${lecturer.title}\n  ${lecturer.department}\n  Research: ${lecturer.research_areas.slice(0, 2).join(", ")}`,
  )
  .join("\n\n")}

${searchResults.length > 5 ? `\n...and ${searchResults.length - 5} more results.` : ""}`,
        lecturers: searchResults.slice(0, 5),
        suggestions: ["Tell me more about these lecturers", "Show me their contact information"],
      }
    }

    // Default response
    return {
      content: `I couldn't find specific information about "${query}". Here are some things you can ask me:

• **About specific lecturers:** "Tell me about Dr. Jane Doe"
• **About courses:** "Who teaches Machine Learning?"
• **About departments:** "Show me lecturers in Cybersecurity"
• **About research:** "Find experts in Artificial Intelligence"

Would you like me to show you all available lecturers or departments?`,
      suggestions: [
        "Show me all lecturers",
        "List all departments",
        "What research areas are available?",
        "Who teaches the most courses?",
      ],
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const response = processQuery(input.trim())
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: response.content,
          timestamp: new Date(),
          lecturers: response.lecturers,
          suggestions: response.suggestions,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Lecturer AI Assistant</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask me anything about our faculty members, their research, courses, or departments. I'm here to help you
            find the perfect lecturer for your academic needs.
          </p>
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex space-x-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1">
                    <div
                      className={`rounded-lg p-4 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    </div>

                    {/* Lecturer Cards */}
                    {message.lecturers && message.lecturers.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {message.lecturers.slice(0, 3).map((lecturer) => (
                          <Card key={lecturer.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground">{lecturer.full_name}</h4>
                                <p className="text-sm text-primary">{lecturer.title}</p>
                                <p className="text-sm text-muted-foreground mb-2">{lecturer.department}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {lecturer.research_areas.slice(0, 2).map((area) => (
                                    <Badge key={area} variant="secondary" className="text-xs">
                                      {area}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <Button asChild size="sm" variant="outline">
                                    <Link href={`/lecturers/${lecturer.id}`}>
                                      View Profile
                                      <ExternalLink className="ml-1 h-3 w-3" />
                                    </Link>
                                  </Button>
                                  <Button asChild size="sm" variant="ghost">
                                    <a href={`mailto:${lecturer.email}`}>Email</a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                        {message.lecturers.length > 3 && (
                          <div className="text-center">
                            <Button asChild variant="outline" size="sm">
                              <Link href="/lecturers">View All Results</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-transparent"
                            >
                              <Sparkles className="mr-1 h-3 w-3" />
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-2">{message.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about lecturers, courses, research areas..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Who teaches Algorithms?",
                "Show me AI researchers",
                "Tell me about Cybersecurity department",
                "Find lecturers with PhD",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs text-muted-foreground hover:text-foreground bg-transparent"
                >
                  <MessageCircle className="mr-1 h-3 w-3" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
