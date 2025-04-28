import { Restaurant, Review, User, CuisineType, PriceRange } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Punjab Palace",
    description: "Authentic North Indian cuisine with a focus on tandoor specialties and rich curries.",
    cuisine: ["North Indian", "Punjabi"],
    priceRange: "$$",
    address: "123 MG Road",
    city: "Chandigarh",
    state: "Punjab",
    zipCode: "160017",
    location: {
      lat: 30.7333,
      lng: 76.7794
    },
    phone: "+91 172-555-1234",
    website: "https://punjabpalace.com",
    hours: {
      Monday: { open: "11:00", close: "23:00" },
      Tuesday: { open: "11:00", close: "23:00" },
      Wednesday: { open: "11:00", close: "23:00" },
      Thursday: { open: "11:00", close: "23:00" },
      Friday: { open: "11:00", close: "23:30" },
      Saturday: { open: "11:00", close: "23:30" },
      Sunday: { open: "11:00", close: "23:00" }
    },
    photos: [
      "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg",
      "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
    ],
    rating: 4.6,
    reviewCount: 342,
    menuItems: [
      {
        id: "pp1",
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato-butter gravy.",
        price: 450,
        category: "Main Course",
        popular: true
      },
      {
        id: "pp2",
        name: "Dal Makhani",
        description: "Black lentils slow-cooked with cream and spices.",
        price: 350,
        category: "Main Course",
        popular: true
      },
      {
        id: "pp3",
        name: "Garlic Naan",
        description: "Fresh bread with garlic and butter.",
        price: 80,
        category: "Breads"
      }
    ],
    features: ["North Indian", "Family Dining", "Outdoor Seating", "Live Music"]
  },
  {
    id: "2",
    name: "Dosa Paradise",
    description: "South Indian vegetarian restaurant famous for its crispy dosas and authentic filter coffee.",
    cuisine: ["South Indian", "Kerala"],
    priceRange: "$",
    address: "45 Brigade Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    location: {
      lat: 12.9716,
      lng: 77.5946
    },
    phone: "+91 80-555-5678",
    website: "https://dosaparadise.com",
    hours: {
      Monday: { open: "07:00", close: "22:30" },
      Tuesday: { open: "07:00", close: "22:30" },
      Wednesday: { open: "07:00", close: "22:30" },
      Thursday: { open: "07:00", close: "22:30" },
      Friday: { open: "07:00", close: "23:00" },
      Saturday: { open: "07:00", close: "23:00" },
      Sunday: { open: "07:00", close: "22:30" }
    },
    photos: [
      "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
      "https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
    ],
    rating: 4.4,
    reviewCount: 567,
    menuItems: [
      {
        id: "dp1",
        name: "Masala Dosa",
        description: "Crispy crepe with spiced potato filling.",
        price: 120,
        category: "Dosas",
        popular: true
      },
      {
        id: "dp2",
        name: "Filter Coffee",
        description: "Traditional South Indian coffee.",
        price: 40,
        category: "Beverages",
        popular: true
      }
    ],
    features: ["South Indian", "Vegetarian", "Breakfast", "Quick Service"]
  },
  {
    id: "3",
    name: "Royal Biryani House",
    description: "Famous for authentic Hyderabadi biryani and Mughlai cuisine.",
    cuisine: ["Hyderabadi", "Mughlai"],
    priceRange: "$$",
    address: "78 Charminar Road",
    city: "Hyderabad",
    state: "Telangana",
    zipCode: "500002",
    location: {
      lat: 17.3850,
      lng: 78.4867
    },
    phone: "+91 40-555-9012",
    website: "https://royalbiryani.com",
    hours: {
      Monday: { open: "11:30", close: "23:00" },
      Tuesday: { open: "11:30", close: "23:00" },
      Wednesday: { open: "11:30", close: "23:00" },
      Thursday: { open: "11:30", close: "23:00" },
      Friday: { open: "11:30", close: "23:30" },
      Saturday: { open: "11:30", close: "23:30" },
      Sunday: { open: "11:30", close: "23:00" }
    },
    photos: [
      "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
      "https://images.pexels.com/photos/1624484/pexels-photo-1624484.jpeg",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
    ],
    rating: 4.7,
    reviewCount: 892,
    menuItems: [
      {
        id: "rb1",
        name: "Hyderabadi Biryani",
        description: "Fragrant rice with tender meat and authentic spices.",
        price: 380,
        category: "Biryani",
        popular: true
      },
      {
        id: "rb2",
        name: "Haleem",
        description: "Traditional meat and wheat dish.",
        price: 320,
        category: "Specials",
        popular: true
      }
    ],
    features: ["Biryani Specialist", "Family Dining", "Takeaway", "Late Night"]
  },
  {
    id: "4",
    name: "Mumbai Street Eats",
    description: "Authentic Mumbai street food experience in a modern setting.",
    cuisine: ["Street Food", "Maharashtrian"],
    priceRange: "$",
    address: "234 Juhu Beach Road",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400049",
    location: {
      lat: 19.0760,
      lng: 72.8777
    },
    phone: "+91 22-555-3456",
    website: "https://mumbaistreeteats.com",
    hours: {
      Monday: { open: "11:00", close: "23:00" },
      Tuesday: { open: "11:00", close: "23:00" },
      Wednesday: { open: "11:00", close: "23:00" },
      Thursday: { open: "11:00", close: "23:00" },
      Friday: { open: "11:00", close: "23:30" },
      Saturday: { open: "11:00", close: "23:30" },
      Sunday: { open: "11:00", close: "23:00" }
    },
    photos: [
      "https://images.pexels.com/photos/3926135/pexels-photo-3926135.jpeg",
      "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
    ],
    rating: 4.5,
    reviewCount: 678,
    menuItems: [
      {
        id: "ms1",
        name: "Vada Pav",
        description: "Mumbai's favorite street food sandwich.",
        price: 40,
        category: "Street Food",
        popular: true
      },
      {
        id: "ms2",
        name: "Pav Bhaji",
        description: "Spiced vegetable curry with buttered bread.",
        price: 120,
        category: "Street Food",
        popular: true
      }
    ],
    features: ["Street Food", "Quick Service", "Takeaway", "Late Night"]
  }
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    restaurantId: "1",
    userId: "u1",
    userName: "Alex Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "Absolutely loved this place! The farm-to-table concept really shows in the freshness of the ingredients. The Grass-Fed Burger was perfectly cooked and flavorful. Will definitely return!",
    date: new Date("2023-06-15"),
    helpful: 12
  },
  {
    id: "r2",
    restaurantId: "1",
    userId: "u2",
    userName: "Sam Williams",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    text: "Great atmosphere and friendly service. The Heirloom Tomato Salad was fantastic, but the Roasted Chicken was slightly dry. Overall, a good experience.",
    date: new Date("2023-05-28"),
    helpful: 8
  },
  {
    id: "r3",
    restaurantId: "2",
    userId: "u3",
    userName: "Jamie Chen",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "Some of the freshest sushi I've had outside of Japan! The Chef's Selection Sashimi was a work of art and absolutely delicious. The sake selection is excellent too. Highly recommend!",
    date: new Date("2023-06-10"),
    photos: ["https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"],
    helpful: 15
  },
  {
    id: "r4",
    restaurantId: "3",
    userId: "u4",
    userName: "Morgan Taylor",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    text: "La Trattoria feels like a slice of Italy in San Francisco. The pasta is clearly house-made and the Osso Buco was tender and flavorful. The service was a bit slow on a busy Friday night, but the quality of the food made up for it.",
    date: new Date("2023-06-02"),
    helpful: 9
  },
  {
    id: "r5",
    restaurantId: "4",
    userId: "u5",
    userName: "Jordan Patel",
    userAvatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "This is my go-to place for Indian food in the city. The spices are perfectly balanced and they're very accommodating with adjusting heat levels. The Butter Chicken and Garlic Naan are must-orders!",
    date: new Date("2023-06-08"),
    helpful: 11
  }
];

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    favorites: ["1", "3", "5"]
  },
  {
    id: "u2",
    name: "Sam Williams",
    email: "sam@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    favorites: ["2", "4"]
  },
  {
    id: "u3",
    name: "Jamie Chen",
    email: "jamie@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    favorites: ["2", "6"]
  },
  {
    id: "u4",
    name: "Morgan Taylor",
    email: "morgan@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    favorites: ["1", "3"]
  },
  {
    id: "u5",
    name: "Jordan Patel",
    email: "jordan@example.com",
    avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    favorites: ["4", "5"]
  }
];

// Helper functions to work with mock data
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return mockRestaurants.find(restaurant => restaurant.id === id);
};

export const getRestaurantReviews = (restaurantId: string): Review[] => {
  return mockReviews.filter(review => review.restaurantId === restaurantId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const filterRestaurants = (
  query: string = "", 
  cuisines: CuisineType[] = [], 
  prices: PriceRange[] = [], 
  features: string[] = [],
  openNow: boolean = false
): Restaurant[] => {
  return mockRestaurants.filter(restaurant => {
    // Check query
    const matchesQuery = query === "" || 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase()));
    
    // Check cuisines
    const matchesCuisine = cuisines.length === 0 || 
      cuisines.some(c => restaurant.cuisine.includes(c));
    
    // Check price
    const matchesPrice = prices.length === 0 || 
      prices.includes(restaurant.priceRange);
    
    // Check features
    const matchesFeatures = features.length === 0 || 
      features.every(f => restaurant.features.includes(f));
    
    // Check if open now
    const matchesOpenNow = !openNow || isRestaurantOpenNow(restaurant);
    
    return matchesQuery && matchesCuisine && matchesPrice && matchesFeatures && matchesOpenNow;
  });
};

export const isRestaurantOpenNow = (restaurant: Restaurant): boolean => {
  const now = new Date();
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  const currentHours = restaurant.hours[dayOfWeek];
  
  if (!currentHours) return false;
  
  const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  return currentTime >= currentHours.open && currentTime <= currentHours.close;
};

export const sortRestaurants = (restaurants: Restaurant[], sortBy: string): Restaurant[] => {
  const sorted = [...restaurants];
  
  switch(sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'reviews':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'priceAsc':
      return sorted.sort((a, b) => a.priceRange.length - b.priceRange.length);
    case 'priceDesc':
      return sorted.sort((a, b) => b.priceRange.length - a.priceRange.length);
    default:
      return sorted; // Default is relevance, keep original order
  }
};
