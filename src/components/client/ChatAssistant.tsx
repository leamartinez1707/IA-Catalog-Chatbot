"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, RefreshCcw, Send, ShoppingCart, Sparkles, User, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/products/useProducts";
import { useAppStore } from "@/store";
import { Product } from "@/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  product: Product | null;
}

const starterPrompts = [
  "I need a gift under $150",
  "Recommend something for a compact desk setup",
  "What is a good option for daily use?",
];

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Tell me the budget, use case, or type of shopper you have in mind and I will narrow the catalog down for you.",
  product: null,
};

type ChatAssistantProps = {
  onClose: () => void;
};

export const ChatAssistant = ({ onClose }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const addToCart = useAppStore((state) => state.addToCart);
  const setShowChat = useAppStore((state) => state.setShowChat);
  const { products } = useProducts();

  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isSendingRef = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (prompt?: string) => {
    const content = (prompt ?? inputValue).trim();

    if (!content || isTyping || isSendingRef.current) {
      return;
    }

    isSendingRef.current = true;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content, product: null },
    ];

    setMessages(nextMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, products }),
      });

      const data = await response.json();

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Unable to generate a recommendation right now.");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply,
          product: data.product ?? null,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I hit an issue while checking the catalog. Try again in a moment or ask with a budget or category for a narrower search.",
          product: null,
        },
      ]);
      toast.error("The assistant could not complete that request.");
    } finally {
      setIsTyping(false);
      isSendingRef.current = false;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} has been added to your cart.`);
  };

  const handleNavigation = (productId: string) => {
    setShowChat(false);
    router.push(`/product/${productId}`);
  };

  const resetConversation = () => {
    isSendingRef.current = false;
    setMessages([initialMessage]);
    setInputValue("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" role="presentation" onClick={onClose}>
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-title"
        className="animate-scale-in flex h-[680px] w-full max-w-3xl flex-col overflow-hidden border-slate-200 bg-white shadow-[0_30px_120px_-40px_rgba(15,23,42,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                <Bot className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 id="assistant-title" className="font-display text-base font-semibold">AI Catalog Concierge</h3>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-200">
                    Live product guidance
                  </span>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-300">
                  Ask by budget, context, or user need. The assistant will recommend a product and link you straight into the buying flow.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="size-3.5" />
                  {prompt}
                </span>
              </button>
            ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              className="self-start text-slate-500 hover:bg-white hover:text-slate-950"
            >
              <RefreshCcw className="size-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-5 py-5">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}-${message.content}`}
              className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div className="max-w-xl space-y-3">
                <div className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-2xl ${
                      message.role === "assistant"
                        ? "bg-slate-950 text-white"
                        : "bg-sky-600 text-white"
                    }`}
                  >
                    {message.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
                  </div>

                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "assistant"
                        ? "bg-slate-100 text-slate-900"
                        : "bg-sky-600 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>

                {message.product && (
                  <Card className="border-slate-200 p-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={message.product.image}
                        alt={message.product.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => handleNavigation(message.product!.id)}
                          className="text-left hover:underline"
                        >
                          <h4 className="truncate text-sm font-semibold text-slate-950">{message.product.name}</h4>
                        </button>
                        <p className="text-sm text-slate-500">Recommended from the live catalog</p>
                        <p className="mt-1 font-semibold text-sky-700">${message.product.price}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(message.product!)}
                        className="bg-slate-950 text-white hover:bg-slate-800"
                      >
                        <ShoppingCart className="size-4" />
                        Add to cart
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                <Bot className="size-4 text-slate-950" />
                Looking through the catalog...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
            <span>Use natural language: budget, category, use case, or gift idea.</span>
            <span>{inputValue.length}/180</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyPress}
              maxLength={180}
              aria-label="Write a message for the shopping assistant"
              placeholder="Example: I need something premium for a home office under $200"
              className="flex-1 border-slate-300"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-slate-950 text-white hover:bg-slate-800"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatAssistant;