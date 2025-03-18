
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
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
}

export type CuisineType = 
  | 'American'
  | 'Italian'
  | 'Mexican'
  | 'Chinese'
  | 'Japanese'
  | 'Thai'
  | 'Indian'
  | 'French'
  | 'Mediterranean'
  | 'Korean'
  | 'Vietnamese'
  | 'Greek'
  | 'Spanish'
  | 'Middle Eastern'
  | 'Vegetarian'
  | 'Vegan'
  | 'Seafood'
  | 'Barbecue'
  | 'Fusion'
  | 'Other';

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
}
