"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  suggestions?: string[]
}

export function TagInput({ tags, onTagsChange, placeholder = "Add a tag...", suggestions = [] }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag])
    }
    setInputValue("")
    setShowSuggestions(false)
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) => !tags.includes(suggestion) && suggestion.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(e.target.value.length > 0)
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="button" size="sm" onClick={() => addTag(inputValue)} disabled={!inputValue.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-muted transition-colors text-sm"
                onClick={() => addTag(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
