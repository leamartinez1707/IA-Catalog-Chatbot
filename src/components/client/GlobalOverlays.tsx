"use client";

import dynamic from "next/dynamic";

import { useAppStore } from "@/store";

const ChatAssistant = dynamic(() => import("@/components/client/ChatAssistant"), {
  ssr: false,
});

const ShoppingCart = dynamic(() => import("@/components/client/ShoppingCart"), {
  ssr: false,
});

const GlobalOverlays = () => {
  const showChat = useAppStore((state) => state.showChat);
  const showCart = useAppStore((state) => state.showCart);
  const setShowChat = useAppStore((state) => state.setShowChat);
  const setShowCart = useAppStore((state) => state.setShowCart);

  return (
    <>
      {showChat ? <ChatAssistant onClose={() => setShowChat(false)} /> : null}
      {showCart ? <ShoppingCart onClose={() => setShowCart(false)} /> : null}
    </>
  );
};

export default GlobalOverlays;