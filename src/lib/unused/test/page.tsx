"use client"

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, AlertCircle } from "lucide-react";
import { useChat } from "~/src/hooks/use-chat";

type EventMessage = {
  type: string;
  data: string;
};

export default function Chat() {
  const { messages, input, setInput, isLoading,
     sendMessage, handleKeyPress, messageEndRef } = useChat();

  

  const renderMessage = (message: EventMessage, index: number) => {
    switch (message.type) {
      case "user":
        return (
          <div key={index} className="flex justify-end mb-4">
            <div className="flex items-end space-x-2 max-w-[80%]">
              <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3">
                <p className="text-sm leading-relaxed">{message.data}</p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        );

      case "ai_stream":
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="flex items-end space-x-2 max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.data}</p>
                {isLoading && <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />}
              </div>
            </div>
          </div>
        );

      case "typing":
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="flex items-end space-x-2">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 text-gray-600 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs ml-2">{message.data}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "loading":
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="flex items-end space-x-2">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-gray-100 text-gray-600 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  <span className="text-xs">{message.data}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "error":
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="flex items-end space-x-2 max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-red-50 text-red-800 border border-red-200 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-sm">{message.data}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto border border-gray-200 rounded-2xl shadow-lg bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8" />
          <div>
            <h2 className="text-lg font-semibold">Lecturer AI Assistant</h2>
            <p className="text-blue-100 text-sm">Ask me anything about our lecturers and courses</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Welcome to Lecturer Connect!</h3>
            <p className="text-sm">Start a conversation by asking about lecturers, courses, or research areas.</p>
          </div>
        )}
        
        {messages.map((message, index) => renderMessage(message, index))}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
            <div className="w-4 h-4 border border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2" />
            AI is thinking...
          </div>
        )}
      </div>
    </div>
  );
}