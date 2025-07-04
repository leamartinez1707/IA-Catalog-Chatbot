import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  features: string;
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
  initialProducts: Product[];
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
  onClose: () => void;
}

export interface ChatAssistantProps {
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}
