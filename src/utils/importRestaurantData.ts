
import { Restaurant, PriceRange } from '@/types';

// This is a utility to convert the data from the CSV-like format in the image to Restaurant objects
export const importRestaurants = (): Restaurant[] => {
  // This would normally be imported from a CSV file or API
  // For this demo, we'll hardcode some of the data from the image
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
      cuisines: ["North Indian"],
      timings: "8:30am to 10:30pm",
      price: 700,
      rating: 4.4,
      reviewCount: 814,
      features: ["Lunch", "Dinner"]
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
      cuisines: ["North Indian"],
      timings: "11:00am to 11:00pm",
      price: 600,
      rating: 4.4,
      reviewCount: 1203,
      features: ["Delivery"]
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
      cuisines: ["Fast Food"],
      timings: "9:30 AM to 10:00 PM",
      price: 300,
      rating: 4.2,
      reviewCount: 801,
      features: ["No Alcohol", "Takeaway"]
    },
    {
      id: "3400290",
      name: "Bhagat Halwai",
      category: "Quick Bites",
      url: "https://www.example.com/bhagat-anand",
      address: "Anda Point",
      city: "Agra",
      locality: "Civil Lines",
      latitude: 27.2057,
      longitude: 78.0057,
      zipCode: "282002",
      cuisines: ["Desserts", "Sweets"],
      timings: "8am to 10pm",
      price: 300,
      rating: 4.3,
      reviewCount: 693,
      features: ["Takeaway"]
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
      cuisines: ["North Indian", "Chinese"],
      timings: "11:30 AM to 11:00 PM",
      price: 1000,
      rating: 4.9,
      reviewCount: 470,
      features: ["Lunch", "Dinner", "Excellent Service"]
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
      cuisine: data.cuisines,
      priceRange,
      address: data.address,
      city: data.city,
      state: "Uttar Pradesh",
      zipCode: data.zipCode,
      location: {
        lat: data.latitude,
        lng: data.longitude,
      },
      phone: "+91 9876543210", // Placeholder
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
        `https://source.unsplash.com/featured/?restaurant,${data.cuisines[0].toLowerCase().replace(' ', '')}`,
        `https://source.unsplash.com/featured/?food,${data.cuisines[0].toLowerCase().replace(' ', '')}`,
        `https://source.unsplash.com/featured/?dining,${data.name.toLowerCase().replace(' ', '')}`
      ],
      rating: data.rating,
      reviewCount: data.reviewCount,
      menuItems: [
        {
          id: `${data.id}-1`,
          name: `${data.cuisines[0]} Special`,
          description: `A delicious ${data.cuisines[0]} specialty`,
          price: Math.round(data.price / 4),
          category: "Specialties",
          popular: true,
        },
        {
          id: `${data.id}-2`,
          name: "Classic Dish",
          description: "A favorite among customers",
          price: Math.round(data.price / 5),
          category: "Mains",
          popular: true,
        }
      ],
      features: data.features,
    };
  });
};

// Add the imported restaurants to the mock data
export const importRestaurantsToMockData = () => {
  // This would normally update the database
  // For this demo, we'll just return the imported restaurants
  return importRestaurants();
};
