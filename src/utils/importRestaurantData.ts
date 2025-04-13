import { Restaurant, PriceRange, CuisineType } from '@/types';

// This is a utility to convert the data from the CSV-like format in the image to Restaurant objects
export const importRestaurants = (): Restaurant[] => {
  // This would normally be imported from a CSV file or API
  // For this demo, we'll hardcode some of the data from the image and add more Indian restaurants
  const restaurantData = [
    {
      id: "3400299",
      name: "Bikanerva",
      category: "Quick Bites",
      url: "https://www.example.com/bikanerva",
      address: "Kalyanpur",
      city: "Agra",
      locality: "Khandari",
      latitude: 27.2115,
      longitude: 78.0024,
      zipCode: "282001",
      cuisines: ["North Indian", "Rajasthani"],
      timings: "8:30am to 10:30pm",
      price: 700,
      rating: 4.4,
      reviewCount: 814,
      features: ["Lunch", "Dinner", "Pure Veg"]
    },
    {
      id: "3400005",
      name: "Mama Chicken",
      category: "Quick Bites",
      url: "https://www.example.com/mama-chicken",
      address: "Mardulla",
      city: "Agra",
      locality: "Agra Cantt",
      latitude: 27.1606,
      longitude: 78.0166,
      zipCode: "282001",
      cuisines: ["North Indian", "Mughlai"],
      timings: "11:00am to 11:00pm",
      price: 600,
      rating: 4.4,
      reviewCount: 1203,
      features: ["Delivery", "Takeout"]
    },
    {
      id: "3401013",
      name: "Bhagat Halwai",
      category: "Quick Bites",
      url: "https://www.example.com/bhagat-halwai",
      address: "Sector 2",
      city: "Agra",
      locality: "Shahganj",
      latitude: 27.1829,
      longitude: 77.9797,
      zipCode: "282010",
      cuisines: ["Street Food", "Sweets"],
      timings: "9:30 AM to 10:00 PM",
      price: 300,
      rating: 4.2,
      reviewCount: 801,
      features: ["Takeaway", "Pure Veg", "Jain Options"]
    },
    {
      id: "3400290",
      name: "Bhagat Anand",
      category: "Quick Bites",
      url: "https://www.example.com/bhagat-anand",
      address: "Anda Point",
      city: "Agra",
      locality: "Civil Lines",
      latitude: 27.2057,
      longitude: 78.0057,
      zipCode: "282002",
      cuisines: ["Desserts", "Sweets", "South Indian"],
      timings: "8am to 10pm",
      price: 300,
      rating: 4.3,
      reviewCount: 693,
      features: ["Takeaway", "Pure Veg"]
    },
    {
      id: "3401744",
      name: "The Salt Cafe",
      category: "Casual Dining",
      url: "https://www.example.com/salt-cafe",
      address: "3rd Floor",
      city: "Agra",
      locality: "Tajganj",
      latitude: 27.1577,
      longitude: 78.0524,
      zipCode: "282001",
      cuisines: ["North Indian", "Fusion"],
      timings: "11:30 AM to 11:00 PM",
      price: 1000,
      rating: 4.9,
      reviewCount: 470,
      features: ["Lunch", "Dinner", "Excellent Service", "Air Conditioned"]
    },
    // Adding more Indian restaurants
    {
      id: "3401999",
      name: "Spice Paradise",
      category: "Fine Dining",
      url: "https://www.example.com/spice-paradise",
      address: "MG Road",
      city: "Agra",
      locality: "Civil Lines",
      latitude: 27.1987,
      longitude: 78.0193,
      zipCode: "282002",
      cuisines: ["North Indian", "Mughlai", "Punjabi"],
      timings: "12:00 PM to 11:00 PM",
      price: 1200,
      rating: 4.7,
      reviewCount: 562,
      features: ["Fine Dining", "Live Music", "Rooftop", "Air Conditioned"]
    },
    {
      id: "3402001",
      name: "Dosa Palace",
      category: "Quick Bites",
      url: "https://www.example.com/dosa-palace",
      address: "Sadar Bazaar",
      city: "Agra",
      locality: "Agra Cantt",
      latitude: 27.1670,
      longitude: 78.0155,
      zipCode: "282001",
      cuisines: ["South Indian", "Kerala", "Andhra"],
      timings: "7:00 AM to 10:30 PM",
      price: 450,
      rating: 4.5,
      reviewCount: 891,
      features: ["Breakfast", "Pure Veg", "Jain Options", "Takeaway"]
    },
    {
      id: "3402002",
      name: "Mumbai Chaat Corner",
      category: "Street Food",
      url: "https://www.example.com/mumbai-chaat",
      address: "Raja Ki Mandi",
      city: "Agra",
      locality: "Raja Mandi",
      latitude: 27.1882,
      longitude: 78.0145,
      zipCode: "282002",
      cuisines: ["Street Food", "Maharashtrian", "Sweets"],
      timings: "10:00 AM to 9:00 PM",
      price: 200,
      rating: 4.4,
      reviewCount: 1205,
      features: ["Takeaway", "Pure Veg"]
    },
    {
      id: "3402003",
      name: "Punjab Da Dhaba",
      category: "Casual Dining",
      url: "https://www.example.com/punjab-da-dhaba",
      address: "Kamla Nagar",
      city: "Agra",
      locality: "Kamla Nagar",
      latitude: 27.2020,
      longitude: 78.0085,
      zipCode: "282005",
      cuisines: ["Punjabi", "North Indian"],
      timings: "11:00 AM to 11:00 PM",
      price: 700,
      rating: 4.3,
      reviewCount: 753,
      features: ["Dhaba Style", "Family Friendly", "Buffet"]
    },
    {
      id: "3402004",
      name: "Mysore Masala",
      category: "Fine Dining",
      url: "https://www.example.com/mysore-masala",
      address: "Sanjay Place",
      city: "Agra",
      locality: "Sanjay Place",
      latitude: 27.2011,
      longitude: 78.0082,
      zipCode: "282002",
      cuisines: ["South Indian", "Karnataka", "Kerala"],
      timings: "8:00 AM to 10:30 PM",
      price: 800,
      rating: 4.6,
      reviewCount: 612,
      features: ["Breakfast", "Lunch", "Dinner", "Air Conditioned"]
    }
  ];
  
  // Convert to Restaurant objects
  return restaurantData.map(data => {
    // Calculate price range based on price
    let priceRange: PriceRange = '$';
    if (data.price > 800) priceRange = '$$$$';
    else if (data.price > 600) priceRange = '$$$';
    else if (data.price > 400) priceRange = '$$';
    
    return {
      id: data.id,
      name: data.name,
      description: `${data.name} is a ${data.category.toLowerCase()} restaurant located in ${data.locality}, ${data.city}, offering delicious ${data.cuisines.join(', ')} cuisine.`,
      cuisine: data.cuisines as CuisineType[],
      priceRange,
      address: data.address,
      city: data.city,
      state: "Uttar Pradesh",
      zipCode: data.zipCode,
      location: {
        lat: data.latitude,
        lng: data.longitude,
      },
      phone: "+91 " + Math.floor(6000000000 + Math.random() * 3999999999), // Random Indian mobile number
      website: data.url,
      hours: {
        Monday: { open: "10:00 AM", close: "10:00 PM" },
        Tuesday: { open: "10:00 AM", close: "10:00 PM" },
        Wednesday: { open: "10:00 AM", close: "10:00 PM" },
        Thursday: { open: "10:00 AM", close: "10:00 PM" },
        Friday: { open: "10:00 AM", close: "11:00 PM" },
        Saturday: { open: "10:00 AM", close: "11:00 PM" },
        Sunday: { open: "10:00 AM", close: "10:00 PM" },
      },
      photos: [
        `https://source.unsplash.com/featured/?indian,${data.cuisines[0].toLowerCase().replace(' ', '')}`,
        `https://source.unsplash.com/featured/?food,${data.cuisines[0].toLowerCase().replace(' ', '')}`,
        `https://source.unsplash.com/featured/?restaurant,${data.name.toLowerCase().replace(' ', '')}`
      ],
      rating: data.rating,
      reviewCount: data.reviewCount,
      menuItems: generateMenuItems(data),
      features: data.features,
    };
  });
};

// Helper function to generate menu items based on cuisine type
function generateMenuItems(data: any) {
  const menuItems = [];
  const cuisines = data.cuisines;
  
  // Generate 3-5 menu items based on the restaurant's cuisines
  const itemCount = 3 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < itemCount; i++) {
    const cuisine = cuisines[i % cuisines.length];
    
    let name = "";
    let description = "";
    
    // Set name and description based on cuisine
    if (cuisine === "North Indian") {
      const dishes = ["Butter Chicken", "Paneer Tikka", "Dal Makhani", "Chole Bhature", "Tandoori Roti", "Naan"];
      name = dishes[i % dishes.length];
      description = `A delicious ${cuisine} specialty that everyone loves`;
    } else if (cuisine === "South Indian") {
      const dishes = ["Masala Dosa", "Idli Sambhar", "Vada", "Uttapam", "Rava Dosa", "Pongal"];
      name = dishes[i % dishes.length];
      description = `Authentic ${cuisine} delight served with chutney and sambhar`;
    } else if (cuisine === "Street Food") {
      const dishes = ["Pani Puri", "Bhel Puri", "Vada Pav", "Pav Bhaji", "Aloo Tikki", "Samosa Chaat"];
      name = dishes[i % dishes.length];
      description = `Popular street food item that will tantalize your taste buds`;
    } else if (cuisine === "Sweets") {
      const dishes = ["Gulab Jamun", "Rasgulla", "Jalebi", "Rasmalai", "Kaju Katli", "Gajar Ka Halwa"];
      name = dishes[i % dishes.length];
      description = `Sweet delicacy that's perfect for dessert or celebrations`;
    } else {
      name = `${cuisine} Special Dish ${i+1}`;
      description = `A delicious ${cuisine} specialty`;
    }
    
    menuItems.push({
      id: `${data.id}-${i+1}`,
      name,
      description,
      price: Math.round(data.price / (3 + i)),
      category: i === 0 ? "Specialties" : i < 3 ? "Mains" : "Sides",
      popular: i < 2,
    });
  }
  
  return menuItems;
}

// Add the imported restaurants to the mock data
export const importRestaurantsToMockData = () => {
  // This would normally update the database
  // For this demo, we'll just return the imported restaurants
  return importRestaurants();
};
