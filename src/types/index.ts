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

export interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  setShowCart: (show: boolean) => void;
  showCart: boolean;
}

export interface ShoppingCartProps {
  onClose: () => void;
}
