
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: CuisineType[];
  priceRange: PriceRange;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  website: string;
  hours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  photos: string[];
  rating: number;
  reviewCount: number;
  menuItems: MenuItem[];
  features: string[];
  isVegetarian?: boolean;
  isFeatured?: boolean;
  cuisineSpecialty?: string;
  isNew?: boolean;
  lastUpdated?: Date;
}

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  popular?: boolean;
  photo?: string;
  isVegetarian?: boolean;
  isSpicy?: number; // 0-3 scale
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: Date;
  photos?: string[];
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  preferences?: {
    vegetarian?: boolean;
    cuisines?: CuisineType[];
    priceRange?: PriceRange[];
    allergies?: string[];
  };
  phoneNumber?: string;
  addresses?: Address[];
  lastLogin?: Date;
}

export interface Address {
  id: string;
  title: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  zipCode: string;
  isPrimary: boolean;
}

export type CuisineType = 
  | 'North Indian'
  | 'South Indian'
  | 'Bengali'
  | 'Punjabi'
  | 'Gujarati'
  | 'Rajasthani'
  | 'Goan'
  | 'Kashmiri'
  | 'Mughlai'
  | 'Kerala'
  | 'Andhra'
  | 'Hyderabadi'
  | 'Chettinad'
  | 'Maharashtrian'
  | 'Karnataka'
  | 'Indian'
  | 'Indian Street Food'
  | 'Indo-Chinese'
  | 'Biryani'
  | 'Sweets'
  | 'Vegetarian'
  | 'Vegan'
  | 'Pure Veg'
  | 'Jain';

export type SortOption = 
  | 'relevance'
  | 'rating'
  | 'reviews'
  | 'distance'
  | 'priceAsc'
  | 'priceDesc';

export interface FilterOptions {
  cuisine: CuisineType[];
  price: PriceRange[];
  features: string[];
  openNow: boolean;
  distance?: number;
  userLocation?: {
    lat: number;
    lng: number;
  };
}
