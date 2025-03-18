
import { Restaurant, Review, User } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Rustic Table",
    description: "Farm-to-table restaurant focusing on seasonal ingredients and rustic cooking techniques.",
    cuisine: ["American", "Farm-to-table"],
    priceRange: "$$",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    phone: "(415) 555-1234",
    website: "https://rustictable.com",
    hours: {
      Monday: { open: "11:00", close: "22:00" },
      Tuesday: { open: "11:00", close: "22:00" },
      Wednesday: { open: "11:00", close: "22:00" },
      Thursday: { open: "11:00", close: "22:00" },
      Friday: { open: "11:00", close: "23:00" },
      Saturday: { open: "10:00", close: "23:00" },
      Sunday: { open: "10:00", close: "21:00" }
    },
    photos: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
    ],
    rating: 4.5,
    reviewCount: 127,
    menuItems: [
      {
        id: "rt1",
        name: "Heirloom Tomato Salad",
        description: "Fresh heirloom tomatoes with house-made burrata, basil, and olive oil.",
        price: 14,
        category: "Starters",
        popular: true
      },
      {
        id: "rt2",
        name: "Grass-Fed Burger",
        description: "Local grass-fed beef with aged cheddar, caramelized onions, and special sauce on a brioche bun.",
        price: 18,
        category: "Mains",
        popular: true
      },
      {
        id: "rt3",
        name: "Roasted Half Chicken",
        description: "Herb-roasted free-range chicken with seasonal vegetables and natural jus.",
        price: 26,
        category: "Mains"
      },
      {
        id: "rt4",
        name: "Seasonal Fruit Cobbler",
        description: "Warm cobbler with seasonal fruits and house-made vanilla ice cream.",
        price: 12,
        category: "Desserts"
      }
    ],
    features: ["Outdoor Seating", "Full Bar", "Vegetarian Options", "Wheelchair Accessible"]
  },
  {
    id: "2",
    name: "Sakura Sushi",
    description: "Authentic Japanese sushi restaurant with traditional techniques and the freshest fish.",
    cuisine: ["Japanese", "Sushi"],
    priceRange: "$$$",
    address: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    location: {
      lat: 37.7899,
      lng: -122.4014
    },
    phone: "(415) 555-5678",
    website: "https://sakurasf.com",
    hours: {
      Monday: { open: "17:00", close: "22:00" },
      Tuesday: { open: "17:00", close: "22:00" },
      Wednesday: { open: "17:00", close: "22:00" },
      Thursday: { open: "17:00", close: "22:00" },
      Friday: { open: "17:00", close: "23:00" },
      Saturday: { open: "17:00", close: "23:00" },
      Sunday: { open: "17:00", close: "21:00" }
    },
    photos: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1625&q=80",
      "https://images.unsplash.com/photo-1583623025817-d180a2fe075e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    ],
    rating: 4.8,
    reviewCount: 214,
    menuItems: [
      {
        id: "ss1",
        name: "Chef's Selection Sashimi",
        description: "Daily selection of the freshest fish, artfully presented.",
        price: 38,
        category: "Sashimi",
        popular: true
      },
      {
        id: "ss2",
        name: "Dragon Roll",
        description: "Eel and cucumber topped with avocado and eel sauce.",
        price: 22,
        category: "Specialty Rolls",
        popular: true
      },
      {
        id: "ss3",
        name: "Sake Nigiri",
        description: "Two pieces of salmon nigiri sushi.",
        price: 8,
        category: "Nigiri"
      },
      {
        id: "ss4",
        name: "Miso Soup",
        description: "Traditional dashi broth with tofu, seaweed, and green onion.",
        price: 6,
        category: "Starters"
      }
    ],
    features: ["Reservations Recommended", "Sake Selection", "Omakase", "Wheelchair Accessible"]
  },
  {
    id: "3",
    name: "La Trattoria",
    description: "Family-owned Italian restaurant serving traditional recipes from Northern Italy.",
    cuisine: ["Italian", "Mediterranean"],
    priceRange: "$$",
    address: "789 Columbus Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94133",
    location: {
      lat: 37.8025,
      lng: -122.4132
    },
    phone: "(415) 555-9012",
    website: "https://latrattoriasf.com",
    hours: {
      Monday: { open: "16:00", close: "22:00" },
      Tuesday: { open: "16:00", close: "22:00" },
      Wednesday: { open: "16:00", close: "22:00" },
      Thursday: { open: "16:00", close: "22:00" },
      Friday: { open: "16:00", close: "23:00" },
      Saturday: { open: "16:00", close: "23:00" },
      Sunday: { open: "16:00", close: "21:00" }
    },
    photos: [
      "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1505932794267-da3d607ec7bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80"
    ],
    rating: 4.3,
    reviewCount: 176,
    menuItems: [
      {
        id: "lt1",
        name: "Bruschetta al Pomodoro",
        description: "Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil.",
        price: 12,
        category: "Antipasti"
      },
      {
        id: "lt2",
        name: "Tagliatelle al Ragù",
        description: "House-made tagliatelle pasta with traditional slow-cooked beef ragù.",
        price: 24,
        category: "Pasta",
        popular: true
      },
      {
        id: "lt3",
        name: "Osso Buco",
        description: "Braised veal shanks with gremolata, served with risotto Milanese.",
        price: 36,
        category: "Secondi",
        popular: true
      },
      {
        id: "lt4",
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: 10,
        category: "Dolci"
      }
    ],
    features: ["Family-Friendly", "Wine Selection", "Vegetarian Options", "Gluten-Free Options"]
  },
  {
    id: "4",
    name: "Spice Kingdom",
    description: "Authentic Indian cuisine with a focus on regional specialties and house-made spice blends.",
    cuisine: ["Indian", "Vegetarian"],
    priceRange: "$$",
    address: "321 Valencia Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    location: {
      lat: 37.7691,
      lng: -122.4215
    },
    phone: "(415) 555-3456",
    website: "https://spicekingdom.com",
    hours: {
      Monday: { open: "11:30", close: "22:00" },
      Tuesday: { open: "11:30", close: "22:00" },
      Wednesday: { open: "11:30", close: "22:00" },
      Thursday: { open: "11:30", close: "22:00" },
      Friday: { open: "11:30", close: "23:00" },
      Saturday: { open: "11:30", close: "23:00" },
      Sunday: { open: "11:30", close: "21:00" }
    },
    photos: [
      "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      "https://images.unsplash.com/photo-1631292784640-2b24be784d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    ],
    rating: 4.6,
    reviewCount: 153,
    menuItems: [
      {
        id: "sk1",
        name: "Samosa",
        description: "Crispy pastry filled with spiced potatoes and peas, served with tamarind and mint chutneys.",
        price: 8,
        category: "Appetizers",
        popular: true
      },
      {
        id: "sk2",
        name: "Butter Chicken",
        description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices.",
        price: 22,
        category: "Mains",
        popular: true
      },
      {
        id: "sk3",
        name: "Vegetable Biryani",
        description: "Aromatic basmati rice cooked with mixed vegetables and special spice blend.",
        price: 18,
        category: "Rice Dishes"
      },
      {
        id: "sk4",
        name: "Garlic Naan",
        description: "Traditional Indian bread topped with garlic and butter, baked in tandoor oven.",
        price: 4,
        category: "Breads"
      }
    ],
    features: ["Vegetarian Options", "Vegan Options", "Gluten-Free Options", "Spice Level Customization"]
  },
  {
    id: "5",
    name: "Coastal Grill",
    description: "Seafood restaurant specializing in sustainably caught fish and shellfish with ocean views.",
    cuisine: ["Seafood", "American"],
    priceRange: "$$$",
    address: "543 Beach Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94133",
    location: {
      lat: 37.8079,
      lng: -122.4177
    },
    phone: "(415) 555-7890",
    website: "https://coastalgrillsf.com",
    hours: {
      Monday: { open: "16:00", close: "22:00" },
      Tuesday: { open: "16:00", close: "22:00" },
      Wednesday: { open: "16:00", close: "22:00" },
      Thursday: { open: "16:00", close: "22:00" },
      Friday: { open: "16:00", close: "23:00" },
      Saturday: { open: "12:00", close: "23:00" },
      Sunday: { open: "12:00", close: "21:00" }
    },
    photos: [
      "https://images.unsplash.com/photo-1615361200141-f45961202b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1565280654386-466329347339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    ],
    rating: 4.7,
    reviewCount: 189,
    menuItems: [
      {
        id: "cg1",
        name: "Fresh Oysters",
        description: "Half dozen seasonal oysters with mignonette and cocktail sauce.",
        price: 24,
        category: "Raw Bar",
        popular: true
      },
      {
        id: "cg2",
        name: "Clam Chowder",
        description: "Creamy New England style chowder with clams, potatoes, and bacon.",
        price: 14,
        category: "Starters"
      },
      {
        id: "cg3",
        name: "Grilled Whole Sea Bass",
        description: "Whole sea bass grilled with herbs, lemon, and olive oil, served with seasonal vegetables.",
        price: 42,
        category: "Mains",
        popular: true
      },
      {
        id: "cg4",
        name: "Cioppino",
        description: "San Francisco's famous seafood stew with fish, shrimp, clams, mussels, and crab in tomato broth.",
        price: 38,
        category: "Mains"
      }
    ],
    features: ["Ocean View", "Full Bar", "Sustainable Seafood", "Happy Hour"]
  },
  {
    id: "6",
    name: "Verde Taqueria",
    description: "Modern Mexican taqueria using organic ingredients and traditional cooking methods.",
    cuisine: ["Mexican", "Latin American"],
    priceRange: "$",
    address: "876 Mission Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    location: {
      lat: 37.7835,
      lng: -122.4019
    },
    phone: "(415) 555-2345",
    website: "https://verdetaqueria.com",
    hours: {
      Monday: { open: "11:00", close: "22:00" },
      Tuesday: { open: "11:00", close: "22:00" },
      Wednesday: { open: "11:00", close: "22:00" },
      Thursday: { open: "11:00", close: "22:00" },
      Friday: { open: "11:00", close: "24:00" },
      Saturday: { open: "11:00", close: "24:00" },
      Sunday: { open: "11:00", close: "21:00" }
    },
    photos: [
      "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80"
    ],
    rating: 4.4,
    reviewCount: 221,
    menuItems: [
      {
        id: "vt1",
        name: "Guacamole & Chips",
        description: "House-made guacamole with lime, cilantro, and fresh tortilla chips.",
        price: 10,
        category: "Starters",
        popular: true
      },
      {
        id: "vt2",
        name: "Carnitas Taco",
        description: "Slow-cooked pork, pickled onions, cilantro, and salsa verde on corn tortilla.",
        price: 5,
        category: "Tacos",
        popular: true
      },
      {
        id: "vt3",
        name: "Vegetable Burrito",
        description: "Grilled seasonal vegetables, black beans, rice, guacamole, and cheese in a flour tortilla.",
        price: 12,
        category: "Burritos"
      },
      {
        id: "vt4",
        name: "Churros",
        description: "Traditional Mexican fried pastry dusted with cinnamon sugar, served with chocolate dipping sauce.",
        price: 8,
        category: "Desserts"
      }
    ],
    features: ["Quick Service", "Vegetarian Options", "Vegan Options", "House-Made Tortillas"]
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
  cuisines: string[] = [], 
  prices: string[] = [], 
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
