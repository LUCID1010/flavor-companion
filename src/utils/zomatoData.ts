
import { toast } from "sonner";
import { Restaurant, CuisineType, PriceRange } from "@/types";

// Define Zomato restaurant data structure based on the dataset
export interface ZomatoRestaurant {
  res_id: string;
  name: string;
  cuisines: string;
  locality: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  aggregate_rating: number;
  votes: number;
  price_range: number;
  currency: string;
  has_online_delivery: number;
  has_table_booking: number;
  average_cost_for_two: number;
}

// Sample data - in a real app, this would come from an API or imported dataset
const sampleZomatoData: ZomatoRestaurant[] = [
  {
    res_id: "18701859",
    name: "Gajalee",
    cuisines: "North Indian, Mughlai",
    locality: "Viman Nagar",
    city: "Pune",
    address: "Survey 228/2, Shop 6-11, Axis Mall, Viman Nagar, Pune",
    latitude: 18.56639,
    longitude: 73.91583,
    aggregate_rating: 4.1,
    votes: 2032,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 1000
  },
  {
    res_id: "6507417",
    name: "Barbeque Nation",
    cuisines: "North Indian, Mughlai, Chinese",
    locality: "Koregaon Park",
    city: "Pune",
    address: "Unit 201, 2nd Floor, Jewel Square, Koregaon Park, Pune",
    latitude: 18.53465,
    longitude: 73.88773,
    aggregate_rating: 4.6,
    votes: 4792,
    price_range: 4,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1600
  },
  {
    res_id: "18349559",
    name: "Savya Rasa",
    cuisines: "South Indian",
    locality: "Koregaon Park",
    city: "Pune",
    address: "Shop 2, Ground Floor, Sentosa Wing, Koregaon Park, Pune",
    latitude: 18.53957,
    longitude: 73.89091,
    aggregate_rating: 4.7,
    votes: 1834,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1400
  },
  {
    res_id: "6507891",
    name: "Malaka Spice",
    cuisines: "Asian, Thai, Malaysian",
    locality: "Koregaon Park",
    city: "Pune",
    address: "Lane 5, North Main Road, Koregaon Park, Pune",
    latitude: 18.53827,
    longitude: 73.89005,
    aggregate_rating: 4.5,
    votes: 3218,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1800
  },
  {
    res_id: "6508232",
    name: "Sonia Da Dhaba",
    cuisines: "North Indian, Punjabi",
    locality: "Aundh",
    city: "Pune",
    address: "Shop 1, Anand Park, Aundh, Pune",
    latitude: 18.56046,
    longitude: 73.80768,
    aggregate_rating: 4.2,
    votes: 1876,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 700
  },
  {
    res_id: "6507814",
    name: "Vaishali",
    cuisines: "South Indian, North Indian, Street Food",
    locality: "FC Road",
    city: "Pune",
    address: "1218/1, FC Road, Shivajinagar, Pune",
    latitude: 18.52043,
    longitude: 73.83961,
    aggregate_rating: 4.4,
    votes: 5291,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 500
  }
];

// Load Zomato restaurant data
export const getZomatoRestaurants = (): ZomatoRestaurant[] => {
  // In a real app, you would fetch this from an API or load from a file
  return sampleZomatoData;
};

// Convert Zomato restaurant to our app's Restaurant format
export const convertZomatoToRestaurant = (zomato: ZomatoRestaurant): Restaurant => {
  // Parse cuisines string to array
  const cuisineArray = zomato.cuisines
    .split(',')
    .map(c => c.trim())
    .filter(c => 
      // Filter to include only Indian cuisines
      c.includes('Indian') ||
      ['Punjabi', 'Mughlai', 'Bengali', 'Gujarati', 'Rajasthani', 
       'Goan', 'Kashmiri', 'Kerala', 'Andhra', 'Hyderabadi', 
       'Chettinad', 'Maharashtrian', 'Karnataka'].includes(c)
    ) as CuisineType[];

  // If no Indian cuisines found, use a default
  if (cuisineArray.length === 0) {
    cuisineArray.push('North Indian');
  }

  // Convert price range
  const priceRangeMap: Record<number, PriceRange> = {
    1: '$',
    2: '$$',
    3: '$$$',
    4: '$$$$',
    5: '$$$$'
  };

  // Build feature list
  const features: string[] = [];
  if (zomato.has_online_delivery) features.push('Delivery Available');
  if (zomato.has_table_booking) features.push('Table Booking');
  features.push('Indian Cuisine');

  // Create hours
  const hours: Record<string, { open: string; close: string }> = {};
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
    hours[day] = {
      open: '10:00',
      close: '22:00'
    };
  });

  return {
    id: zomato.res_id,
    name: zomato.name,
    description: `${zomato.name} serves delicious ${zomato.cuisines} cuisine in ${zomato.locality}, ${zomato.city}.`,
    cuisine: cuisineArray,
    priceRange: priceRangeMap[zomato.price_range] || '$$',
    address: zomato.address,
    city: zomato.city,
    state: zomato.city === 'Mumbai' ? 'Maharashtra' : zomato.city === 'Delhi' ? 'Delhi' : 'Karnataka',
    zipCode: '',
    location: {
      lat: zomato.latitude,
      lng: zomato.longitude
    },
    phone: '+91 9876543210', // Placeholder
    website: `https://${zomato.name.toLowerCase().replace(/\s/g, '')}.com`, // Placeholder
    hours: hours,
    photos: [
      'https://source.unsplash.com/random/300x200/?indian,food',
      'https://source.unsplash.com/random/300x200/?restaurant,india',
      'https://source.unsplash.com/random/300x200/?curry,dish'
    ],
    rating: zomato.aggregate_rating,
    reviewCount: zomato.votes,
    menuItems: [
      {
        id: `${zomato.res_id}-1`,
        name: 'Butter Chicken',
        description: 'Tender chicken in a rich tomato and butter gravy',
        price: Math.round(zomato.average_cost_for_two / 4),
        category: 'Main Course',
        popular: true,
        isVegetarian: false,
        isSpicy: 1
      },
      {
        id: `${zomato.res_id}-2`,
        name: 'Paneer Tikka',
        description: 'Marinated and grilled cottage cheese',
        price: Math.round(zomato.average_cost_for_two / 5),
        category: 'Starters',
        popular: true,
        isVegetarian: true,
        isSpicy: 1
      }
    ],
    features: features,
    isVegetarian: false
  };
};

// Convert all Zomato data to our app format
export const getAllZomatoRestaurants = (): Restaurant[] => {
  try {
    const zomatoData = getZomatoRestaurants();
    return zomatoData.map(convertZomatoToRestaurant);
  } catch (error) {
    console.error("Error converting Zomato data:", error);
    toast.error("Failed to load restaurant data");
    return [];
  }
};
