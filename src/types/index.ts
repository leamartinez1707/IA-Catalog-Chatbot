import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  productRecommendation?: Product;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface ProductCatalogProps {
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
  setFavorites: Dispatch<SetStateAction<number[]>>
  favorites: number[];
}

export interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  cartItemCount: number;
  setShowCart: (show: boolean) => void;
  showCart: boolean;
}

export interface ShoppingCartProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface ChatAssistantProps {
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}
