"use client";

import { useState } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatAssistantProps } from "@/types";
// import type { ChatAssistantProps, Message, Product } from "@/types";

export const ChatAssistant = ({ products, onClose, onAddToCart }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am your AI shopping assistant. How can I help you today?' }
  ])
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping,] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessages = [
      ...messages,
      { role: 'user', content: inputValue } as const
    ];

    setMessages(newMessages)
    setInputValue('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, products }),
      })

      const data = await res.json()
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }])
      }
    } catch (err) {
      console.error(err)
    } finally {

      setLoading(false)

    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col animate-scale-in bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Shopping Assistant</h3>
              <p className="text-sm text-blue-100">Online and ready to help</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? "justify-start" : "justify-end"} animate-fade-in`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-2">
                  <div
                    className={`px-4 py-2 rounded-lg ${message.role === 'assistant'
                      ? "bg-gray-100 text-gray-900"
                      : "bg-blue-500 text-white"
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {/* {message.productRecommendation && (
                    <Card className="p-3 border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={message.productRecommendation.image}
                          alt={message.productRecommendation.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{message.productRecommendation.name}</h4>
                          <p className="text-blue-600 font-semibold">${message.productRecommendation.price}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onAddToCart(message.productRecommendation!)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  )} */}
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about products, recommendations, or anything else..."
              className="flex-1"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:cursor-pointer" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4 fill-white" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatAssistant;