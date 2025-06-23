
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Send, Bot, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { ChatAssistantProps, Message, Product } from "@/types";

const SAMPLE_RESPONSES = {
  greeting: "Hello! I'm your AI shopping assistant. I can help you find the perfect products based on your needs. What are you looking for today?",
  electronics: "Great! For electronics, I'd recommend checking out our wireless headphones or smartwatch. What's your budget range?",
  clothing: "Perfect! Are you looking for casual wear, formal attire, or something specific like workout clothes?",
  books: "Excellent choice! Are you interested in fiction, non-fiction, or educational books like programming guides?",
  budget_low: "I understand you're looking for budget-friendly options. Here are some great products under $30:",
  budget_medium: "For a mid-range budget, these products offer excellent value for money:",
  budget_high: "For premium options, these products offer the best quality and features:",
  default: "I'd be happy to help you find what you're looking for! Could you tell me more about your preferences or budget?"
};

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ onClose, onAddToCart }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: SAMPLE_RESPONSES.greeting,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput: string): { text: string; productRecommendation?: Product } => {
    const input = userInput.toLowerCase();
    
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return { text: SAMPLE_RESPONSES.greeting };
    }
    
    if (input.includes("electronics") || input.includes("tech") || input.includes("gadget")) {
      return { 
        text: "I found some great electronics for you! Here's a popular item:",
        productRecommendation: {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          price: 79.99,
          category: "Electronics",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
          description: "Premium quality wireless headphones with noise cancellation",
          features: ["Noise Cancelling", "30h Battery", "Quick Charge"]
        }
      };
    }
    
    if (input.includes("clothing") || input.includes("shirt") || input.includes("clothes")) {
      return {
        text: "Here's a comfortable and sustainable clothing option:",
        productRecommendation: {
          id: 3,
          name: "Organic Cotton T-Shirt",
          price: 24.99,
          category: "Clothing",
          rating: 4.3,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
          description: "Comfortable and sustainable organic cotton t-shirt",
          features: ["100% Organic", "Machine Washable", "Multiple Colors"]
        }
      };
    }
    
    if (input.includes("book") || input.includes("read") || input.includes("learn")) {
      return {
        text: "Perfect for learning! Here's a highly-rated programming book:",
        productRecommendation: {
          id: 4,
          name: "JavaScript Programming Book",
          price: 39.99,
          category: "Books",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop",
          description: "Learn modern JavaScript programming from scratch",
          features: ["Beginner Friendly", "500+ Pages", "Code Examples"]
        }
      };
    }
    
    if (input.includes("budget") || input.includes("cheap") || input.includes("affordable")) {
      return { text: SAMPLE_RESPONSES.budget_low };
    }
    
    if (input.includes("fitness") || input.includes("exercise") || input.includes("workout")) {
      return {
        text: "Great for staying active! Here's our popular yoga mat:",
        productRecommendation: {
          id: 6,
          name: "Yoga Mat",
          price: 49.99,
          category: "Sports",
          rating: 4.4,
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&h=150&fit=crop",
          description: "Non-slip yoga mat perfect for all types of exercise",
          features: ["Non-Slip", "Eco-Friendly", "6mm Thick"]
        }
      };
    }
    
    return { text: SAMPLE_RESPONSES.default };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        productRecommendation: response.productRecommendation
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col animate-scale-in">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}>
                {message.isBot && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isBot
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  {message.productRecommendation && (
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
                  )}
                </div>

                {!message.isBot && (
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about products, recommendations, or anything else..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatAssistant;