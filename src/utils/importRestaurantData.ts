import { Restaurant, PriceRange, CuisineType } from '@/types';

// This is a utility to convert the data from the CSV-like format in the image to Restaurant objects
export const importRestaurants = (): Restaurant[] => {
  // Mock restaurant data (replace with actual data source)
  const restaurantData = [
    {
      id: "ir1",
      name: "Amma Chettinad Mess",
      category: "Dine-in Restaurant",
      cuisines: ["Chettinad", "South Indian"],
      rating: 4.5,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "209070",
      latitude: 1.3075,
      longitude: 103.8445,
      address: "58 Race Course Rd, Singapore 218565",
      phone: "+65 6298 2855",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "11 AM - 10 PM"
    },
    {
      id: "ir2",
      name: "Anjappar Chettinad Restaurant",
      category: "Dine-in Restaurant",
      cuisines: ["Chettinad", "Indian"],
      rating: 4.0,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208702",
      latitude: 1.3085,
      longitude: 103.8435,
      address: "76 Race Course Rd, Singapore 218575",
      phone: "+65 6296 0757",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "11 AM - 11 PM"
    },
    {
      id: "ir3",
      name: " ছোট রেস্টুরেন্ট (Chotto Restaurant)",
      category: "Dine-in Restaurant",
      cuisines: ["Bengali", "Indian"],
      rating: 3.5,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208702",
      latitude: 1.3095,
      longitude: 103.8425,
      address: "81Desker Rd, Singapore 209603",
      phone: "+65 8768 5247",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "24 hours"
    },
    {
      id: "ir4",
      name: "Komala Vilas Restaurant",
      category: "Dine-in Restaurant",
      cuisines: ["South Indian", "Indian"],
      rating: 4.2,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "217744",
      latitude: 1.3070,
      longitude: 103.8455,
      address: "76-78 Serangoon Rd, Singapore 217981",
      phone: "+65 6293 6980",
      website: "https://www.komalavilas.com.sg/",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "7:30AM - 10:30PM"
    },
    {
      id: "ir5",
      name: "MTR Singapore",
      category: "Dine-in Restaurant",
      cuisines: ["South Indian", "Indian"],
      rating: 4.3,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "217972",
      latitude: 1.3065,
      longitude: 103.8465,
      address: "438 Serangoon Rd, Singapore 218134",
      phone: "+65 6296 5800",
      website: "http://www.mtrsingapore.com/",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "8:30AM - 3PM, 5:30–9:30PM"
    },
    {
      id: "ir6",
      name: "Mustafa Cafe",
      category: "Dine-in Restaurant",
      cuisines: ["Indian", "Halal"],
      rating: 3.8,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208533",
      latitude: 1.3055,
      longitude: 103.8475,
      address: "145 Syed Alwi Rd, Singapore 207704",
      phone: "+65 6295 5822",
      website: "https://www.mustafa.com.sg/",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "24 hours"
    },
    {
      id: "ir7",
      name: " ছোট রেস্টুরেন্ট (Chotto Restaurant)",
      category: "Dine-in Restaurant",
      cuisines: ["Bengali", "Indian"],
      rating: 3.5,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208702",
      latitude: 1.3095,
      longitude: 103.8425,
      address: "81Desker Rd, Singapore 209603",
      phone: "+65 8768 5247",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "24 hours"
    },
    {
      id: "ir8",
      name: " ছোট রেস্টুরেন্ট (Chotto Restaurant)",
      category: "Dine-in Restaurant",
      cuisines: ["Bengali", "Indian"],
      rating: 3.5,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208702",
      latitude: 1.3095,
      longitude: 103.8425,
      address: "81Desker Rd, Singapore 209603",
      phone: "+65 8768 5247",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "24 hours"
    },
    {
      id: "ir9",
      name: " ছোট রেস্টুরেন্ট (Chotto Restaurant)",
      category: "Dine-in Restaurant",
      cuisines: ["Bengali", "Indian"],
      rating: 3.5,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208702",
      latitude: 1.3095,
      longitude: 103.8425,
      address: "81Desker Rd, Singapore 209603",
      phone: "+65 8768 5247",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "24 hours"
    },
    {
      id: "ir10",
      name: " ছোট রেস্টুরেন্ট (Chotto Restaurant)",
      category: "Dine-in Restaurant",
      cuisines: ["Bengali", "Indian"],
      rating: 3.5,
      locality: "Little India",
      city: "Singapore",
      state: "Central Singapore",
      zipCode: "208702",
      latitude: 1.3095,
      longitude: 103.8425,
      address: "81Desker Rd, Singapore 209603",
      phone: "+65 8768 5247",
      website: "https://www.example.com",
      image: "https://lh3.googleusercontent.com/places/ANmVG8WJmxUs9tK9J-QJPEtgQe-gY6nkhQjnmOXmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mYmJ9F3dB-wCSj3QHwZEj-ks9IZv4t2aP996R9jjpn-K9mY=s1600-w400",
      "opening hours": "24 hours"
    },
  ];

  const generateRandomPhotos = (): string[] => {
    const photoUrls = [
      "https://images.unsplash.com/photo-1517248135469-d3d51ca46168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1467003954586-28a0e5d977a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1551782450-a2132b4ba212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    ];
  
    const shuffled = [...photoUrls].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const generateMenuItems = (cuisines: string[]): any[] => {
    const menuItems = [];
    cuisines.forEach(cuisine => {
      menuItems.push({
        id: `menu-${cuisine}-1`,
        name: `Sample ${cuisine} Dish 1`,
        description: `Delicious sample ${cuisine} dish`,
        price: 15,
        category: "Main Course",
      });
      menuItems.push({
        id: `menu-${cuisine}-2`,
        name: `Sample ${cuisine} Dish 2`,
        description: `Another delicious sample ${cuisine} dish`,
        price: 12,
        category: "Appetizer",
      });
    });
    return menuItems;
  };

  const generateFeatures = (category: string): string[] => {
    const features = ["Free Wifi", "Family Friendly", "Takeout"];
    if (category.toLowerCase().includes("restaurant")) {
      features.push("Dine-In");
    }
    return features;
  };

  const convertOpeningHours = (openingHours: string): { [key: string]: { open: string; close: string } } => {
    // Implement logic to convert the opening hours string to the desired format
    // This is a placeholder, replace with actual conversion logic
    return {
      Monday: { open: "11:00", close: "22:00" },
      Tuesday: { open: "11:00", close: "22:00" },
      Wednesday: { open: "11:00", close: "22:00" },
      Thursday: { open: "11:00", close: "22:00" },
      Friday: { open: "11:00", close: "23:00" },
      Saturday: { open: "10:00", close: "23:00" },
      Sunday: { open: "10:00", close: "21:00" }
    };
  };

  // Convert each restaurant data item to a Restaurant object
  return restaurantData.map(data => {
    const hours = convertOpeningHours(data["opening hours"]);
    const priceRange = "$$"; // You might want to implement logic to determine price range based on data

    return {
      id: data.id,
      name: data.name,
      description: `${data.name} is a ${data.category.toLowerCase()} restaurant located in ${data.locality}, ${data.city}, offering delicious ${data.cuisines.join(', ')} cuisine.`,
      cuisine: data.cuisines as CuisineType[],
      priceRange,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      location: {
        lat: data.latitude,
        lng: data.longitude
      },
      phone: data.phone,
      website: data.website || "",
      hours,
      photos: [data.image, ...generateRandomPhotos()].filter(Boolean),
      rating: data.rating,
      reviewCount: Math.floor(Math.random() * 100) + 10,
      menuItems: generateMenuItems(data.cuisines),
      features: generateFeatures(data.category),
    };
  });
};

// Helper function to generate random number of photos
const generateRandomNumber = (limit: number): number => {
  return Math.floor(Math.random() * limit) + 1;
};
