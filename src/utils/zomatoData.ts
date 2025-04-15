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

// Expanded Zomato restaurant dataset based on Kaggle dataset
const zomatoRestaurantData: ZomatoRestaurant[] = [
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
  },
  {
    res_id: "18793305",
    name: "Tawa Street",
    cuisines: "North Indian, Street Food, Mumbai Street Food",
    locality: "Deccan Gymkhana",
    city: "Pune",
    address: "Shop 4, Deccan Gold Society, Near Garware College, Deccan Gymkhana, Pune",
    latitude: 18.51781,
    longitude: 73.83521,
    aggregate_rating: 4.3,
    votes: 1562,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 600
  },
  {
    res_id: "6508549",
    name: "Cafe Goodluck",
    cuisines: "Parsi, Iranian, Cafe",
    locality: "Deccan Gymkhana",
    city: "Pune",
    address: "5, Fergusson College Road, Deccan Gymkhana, Pune",
    latitude: 18.52231,
    longitude: 73.84033,
    aggregate_rating: 4.4,
    votes: 2983,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 550
  },
  {
    res_id: "6507807",
    name: "Vohuman Cafe",
    cuisines: "Cafe, Bakery, Parsi",
    locality: "Camp",
    city: "Pune",
    address: "Millennium Star, 33/1, Opposite SGS Mall, Dhole Patil Road, Camp, Pune",
    latitude: 18.53007,
    longitude: 73.87657,
    aggregate_rating: 4.5,
    votes: 2238,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 450
  },
  {
    res_id: "18424167",
    name: "Irani Cafe",
    cuisines: "Cafe, Parsi",
    locality: "Camp",
    city: "Pune",
    address: "Shop 5, Sanas Plaza, Sastri Road, Camp, Pune",
    latitude: 18.51562,
    longitude: 73.87218,
    aggregate_rating: 4.2,
    votes: 1075,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 500
  },
  {
    res_id: "6507810",
    name: "German Bakery",
    cuisines: "Cafe, Bakery, Continental",
    locality: "Koregaon Park",
    city: "Pune",
    address: "Survey 33, North Main Road, Koregaon Park, Pune",
    latitude: 18.54198,
    longitude: 73.89318,
    aggregate_rating: 4.3,
    votes: 3156,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1200
  },
  {
    res_id: "45138",
    name: "Leopold Cafe & Bar",
    cuisines: "Continental, North Indian, Chinese, Italian",
    locality: "Colaba",
    city: "Mumbai",
    address: "S.B. Singh Road, Colaba Causeway, Colaba, Mumbai",
    latitude: 18.92177,
    longitude: 72.83151,
    aggregate_rating: 4.3,
    votes: 5782,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1500
  },
  {
    res_id: "35422",
    name: "Trishna",
    cuisines: "Seafood, Mangalorean, Coastal",
    locality: "Fort",
    city: "Mumbai",
    address: "7, Saibaba Road, Kala Ghoda, Fort, Mumbai",
    latitude: 18.92976,
    longitude: 72.83176,
    aggregate_rating: 4.6,
    votes: 4329,
    price_range: 4,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 2500
  },
  {
    res_id: "32792",
    name: "Britannia & Co.",
    cuisines: "Parsi, Iranian",
    locality: "Fort",
    city: "Mumbai",
    address: "Wakefield House, 11, Sport Road, 16, Ballard Estate, Fort, Mumbai",
    latitude: 18.94123,
    longitude: 72.83867,
    aggregate_rating: 4.5,
    votes: 3121,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 1000
  },
  {
    res_id: "38896",
    name: "Cafe Mondegar",
    cuisines: "Continental, North Indian, Italian",
    locality: "Colaba",
    city: "Mumbai",
    address: "Metro House, 5-A, Shahid Bhagat Singh Road, Colaba, Mumbai",
    latitude: 18.92168,
    longitude: 72.83126,
    aggregate_rating: 4.2,
    votes: 2984,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 1500
  },
  {
    res_id: "301485",
    name: "Karim's",
    cuisines: "Mughlai, North Indian",
    locality: "Jama Masjid",
    city: "New Delhi",
    address: "16, Gali Kababian, Jama Masjid, New Delhi",
    latitude: 28.65152,
    longitude: 77.23305,
    aggregate_rating: 4.7,
    votes: 8976,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 800
  },
  {
    res_id: "303049",
    name: "Indian Accent",
    cuisines: "Modern Indian",
    locality: "Lodhi Colony",
    city: "New Delhi",
    address: "The Lodhi, Lodhi Road, Lodhi Colony, New Delhi",
    latitude: 28.59073,
    longitude: 77.22748,
    aggregate_rating: 4.9,
    votes: 4321,
    price_range: 5,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 5000
  },
  {
    res_id: "302049",
    name: "Bukhara",
    cuisines: "North Indian, Mughlai",
    locality: "Chanakyapuri",
    city: "New Delhi",
    address: "ITC Maurya, Diplomat Enclave, Sardar Patel Marg, Chanakyapuri, New Delhi",
    latitude: 28.59944,
    longitude: 77.17976,
    aggregate_rating: 4.8,
    votes: 3987,
    price_range: 5,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 6000
  },
  {
    res_id: "51242",
    name: "Mavalli Tiffin Room (MTR)",
    cuisines: "South Indian",
    locality: "Lalbagh",
    city: "Bangalore",
    address: "14, Lalbagh Road, Lalbagh, Bangalore",
    latitude: 12.95153,
    longitude: 77.58679,
    aggregate_rating: 4.7,
    votes: 7632,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 600
  },
  {
    res_id: "50467",
    name: "Vidyarthi Bhavan",
    cuisines: "South Indian",
    locality: "Basavanagudi",
    city: "Bangalore",
    address: "32, Gandhi Bazaar Main Road, Basavanagudi, Bangalore",
    latitude: 12.94542,
    longitude: 77.56976,
    aggregate_rating: 4.6,
    votes: 5432,
    price_range: 1,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 300
  },
  {
    res_id: "18467823",
    name: "Pal Dhaba",
    cuisines: "North Indian, Punjabi",
    locality: "Sector 28",
    city: "Chandigarh",
    address: "SCO 4, Sector 28-D, Sector 28, Chandigarh",
    latitude: 30.7046,
    longitude: 76.7879,
    aggregate_rating: 4.8,
    votes: 3245,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 600
  },
  {
    res_id: "18467824",
    name: "Gopal's",
    cuisines: "South Indian, North Indian",
    locality: "Sector 7",
    city: "Chandigarh",
    address: "SCO 77-78, Sector 7-C, Sector 7, Chandigarh",
    latitude: 30.7334,
    longitude: 76.7791,
    aggregate_rating: 4.5,
    votes: 2789,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 650
  },
  {
    res_id: "18467825",
    name: "Saffron",
    cuisines: "North Indian, Mughlai",
    locality: "Sector 17",
    city: "Chandigarh",
    address: "SCO 58-59, Sector 17-C, Sector 17, Chandigarh",
    latitude: 30.7428,
    longitude: 76.7820,
    aggregate_rating: 4.6,
    votes: 3120,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1200
  },
  {
    res_id: "18467826",
    name: "Backpackers Cafe",
    cuisines: "Continental, Italian, American",
    locality: "Sector 9",
    city: "Chandigarh",
    address: "SCO 9, Sector 9-D, Sector 9, Chandigarh",
    latitude: 30.7369,
    longitude: 76.7813,
    aggregate_rating: 4.4,
    votes: 2450,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1300
  },
  {
    res_id: "18467827",
    name: "Whistling Duck",
    cuisines: "Italian, Continental, European",
    locality: "Sector 26",
    city: "Chandigarh",
    address: "SCO 10, Sector 26, Chandigarh",
    latitude: 30.7276,
    longitude: 76.8148,
    aggregate_rating: 4.7,
    votes: 2980,
    price_range: 4,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 2000
  },
  {
    res_id: "18467828",
    name: "Ghazal Restaurant",
    cuisines: "North Indian, Mughlai, Chinese",
    locality: "Sector 17",
    city: "Chandigarh",
    address: "SCO 189-190, Sector 17-C, Sector 17, Chandigarh",
    latitude: 30.7434,
    longitude: 76.7830,
    aggregate_rating: 4.3,
    votes: 1980,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 800
  },
  {
    res_id: "18467829",
    name: "Sindhi Sweets",
    cuisines: "North Indian, Street Food, Desserts",
    locality: "Sector 17",
    city: "Chandigarh",
    address: "SCO 17-18, Sector 17-D, Sector 17, Chandigarh",
    latitude: 30.7407,
    longitude: 76.7804,
    aggregate_rating: 4.5,
    votes: 3450,
    price_range: 1,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 300
  },
  {
    res_id: "18467830",
    name: "Swagath Restaurant",
    cuisines: "North Indian, Punjabi",
    locality: "Sector 26",
    city: "Chandigarh",
    address: "SCO 11, Sector 26, Chandigarh",
    latitude: 30.7283,
    longitude: 76.8165,
    aggregate_rating: 4.4,
    votes: 1945,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1500
  },
  {
    res_id: "18467831",
    name: "Peddlers",
    cuisines: "North Indian, Chinese, Continental",
    locality: "Sector 35",
    city: "Chandigarh",
    address: "SCO 1, Sector 35-C, Chandigarh",
    latitude: 30.7212,
    longitude: 76.7610,
    aggregate_rating: 4.2,
    votes: 1876,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1200
  },
  {
    res_id: "19467831",
    name: "Pinch of Spice",
    cuisines: "North Indian, Mughlai",
    locality: "Tajganj",
    city: "Agra",
    address: "23/453, Wazirpura Road, Tajganj, Agra",
    latitude: 27.1667,
    longitude: 78.0422,
    aggregate_rating: 4.7,
    votes: 2340,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 1300
  },
  {
    res_id: "19467832",
    name: "Dasaprakash",
    cuisines: "South Indian, North Indian",
    locality: "Civil Lines",
    city: "Agra",
    address: "18, Gwalior Road, Civil Lines, Agra",
    latitude: 27.1974,
    longitude: 78.0134,
    aggregate_rating: 4.4,
    votes: 1876,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 800
  },
  {
    res_id: "19467833",
    name: "Taj Terrace",
    cuisines: "North Indian, Mughlai, Continental",
    locality: "Tajganj",
    city: "Agra",
    address: "Eastern Gate, Shilpgram, Tajganj, Agra",
    latitude: 27.1634,
    longitude: 78.0412,
    aggregate_rating: 4.8,
    votes: 2134,
    price_range: 4,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 2500
  },
  {
    res_id: "301486",
    name: "Gulati",
    cuisines: "North Indian, Mughlai",
    locality: "Pandara Road",
    city: "New Delhi",
    address: "6, Pandara Road Market, New Delhi",
    latitude: 28.5936,
    longitude: 77.2365,
    aggregate_rating: 4.6,
    votes: 6543,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 1800
  },
  {
    res_id: "301487",
    name: "Saravana Bhavan",
    cuisines: "South Indian",
    locality: "Connaught Place",
    city: "New Delhi",
    address: "P-13, Connaught Circus, Connaught Place, New Delhi",
    latitude: 28.6304,
    longitude: 77.2199,
    aggregate_rating: 4.5,
    votes: 7893,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 700
  },
  {
    res_id: "45139",
    name: "Pali Village Cafe",
    cuisines: "Italian, Continental, European",
    locality: "Bandra West",
    city: "Mumbai",
    address: "Ambedkar Road, Pali Hill, Bandra West, Mumbai",
    latitude: 19.0647,
    longitude: 72.8275,
    aggregate_rating: 4.4,
    votes: 3421,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 2000
  },
  {
    res_id: "45140",
    name: "Bastian",
    cuisines: "Seafood, Asian, Continental",
    locality: "Bandra West",
    city: "Mumbai",
    address: "B/1, New Kamal Building, Linking Road, Bandra West, Mumbai",
    latitude: 19.0636,
    longitude: 72.8294,
    aggregate_rating: 4.8,
    votes: 2876,
    price_range: 4,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 4000
  },
  {
    res_id: "55139",
    name: "Murugan Idli Shop",
    cuisines: "South Indian",
    locality: "Besant Nagar",
    city: "Chennai",
    address: "Shop 6, New Door 77, 4th Main Road, Besant Nagar, Chennai",
    latitude: 13.0002,
    longitude: 80.2668,
    aggregate_rating: 4.6,
    votes: 7650,
    price_range: 1,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 300
  },
  {
    res_id: "55140",
    name: "Saravana Bhavan",
    cuisines: "South Indian",
    locality: "Anna Nagar",
    city: "Chennai",
    address: "14, Vijaya Raghava Road, T. Nagar, Chennai",
    latitude: 13.0418,
    longitude: 80.2339,
    aggregate_rating: 4.7,
    votes: 8432,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 500
  },
  {
    res_id: "55141",
    name: "Dindigul Thalappakatti",
    cuisines: "Biryani, South Indian, Chettinad",
    locality: "Nungambakkam",
    city: "Chennai",
    address: "22, Kennet Lane, Egmore, Chennai",
    latitude: 13.0731,
    longitude: 80.2590,
    aggregate_rating: 4.4,
    votes: 5632,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 800
  },
  {
    res_id: "65139",
    name: "Tunday Kababi",
    cuisines: "Mughlai, Lucknowi",
    locality: "Aminabad",
    city: "Lucknow",
    address: "168/6, Nawab Ganj, Aminabad, Lucknow",
    latitude: 26.8512,
    longitude: 80.9346,
    aggregate_rating: 4.8,
    votes: 9765,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 600
  },
  {
    res_id: "65140",
    name: "Dastarkhwan",
    cuisines: "Mughlai, Lucknowi, North Indian",
    locality: "Hazratganj",
    city: "Lucknow",
    address: "B/8, Shahnajaf Road, Hazratganj, Lucknow",
    latitude: 26.8469,
    longitude: 80.9387,
    aggregate_rating: 4.6,
    votes: 7645,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 800
  },
  {
    res_id: "65141",
    name: "Idris Biryani",
    cuisines: "Biryani, Lucknowi",
    locality: "Chowk",
    city: "Lucknow",
    address: "Chowk, Lucknow",
    latitude: 26.8608,
    longitude: 80.9125,
    aggregate_rating: 4.7,
    votes: 8721,
    price_range: 1,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 400
  },
  {
    res_id: "75139",
    name: "Suvarna Mahal",
    cuisines: "Rajasthani, North Indian",
    locality: "Rambagh Palace",
    city: "Jaipur",
    address: "Rambagh Palace, Bhawani Singh Road, Jaipur",
    latitude: 26.8921,
    longitude: 75.8077,
    aggregate_rating: 4.9,
    votes: 2134,
    price_range: 5,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 5000
  },
  {
    res_id: "75140",
    name: "Chokhi Dhani",
    cuisines: "Rajasthani, North Indian",
    locality: "Tonk Road",
    city: "Jaipur",
    address: "12 Miles, Tonk Road, Via Vatika, Jaipur",
    latitude: 26.7674,
    longitude: 75.8473,
    aggregate_rating: 4.7,
    votes: 8976,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 1,
    average_cost_for_two: 1500
  },
  {
    res_id: "75141",
    name: "Handi",
    cuisines: "North Indian, Rajasthani, Mughlai",
    locality: "MI Road",
    city: "Jaipur",
    address: "18, MI Road, Jayanti Market, Jaipur",
    latitude: 26.9124,
    longitude: 75.8104,
    aggregate_rating: 4.5,
    votes: 6543,
    price_range: 3,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 1,
    average_cost_for_two: 1200
  },
  {
    res_id: "51243",
    name: "Shree Sagar (CTR)",
    cuisines: "South Indian",
    locality: "Malleshwaram",
    city: "Bangalore",
    address: "7th Cross, Margosa Road, Malleshwaram, Bangalore",
    latitude: 12.9915,
    longitude: 77.5726,
    aggregate_rating: 4.8,
    votes: 6789,
    price_range: 1,
    currency: "₹",
    has_online_delivery: 0,
    has_table_booking: 0,
    average_cost_for_two: 200
  },
  {
    res_id: "51244",
    name: "Truffles",
    cuisines: "Continental, American, Desserts",
    locality: "Koramangala",
    city: "Bangalore",
    address: "93, 4th B Cross, Koramangala 5th Block, Bangalore",
    latitude: 12.9339,
    longitude: 77.6159,
    aggregate_rating: 4.6,
    votes: 8432,
    price_range: 2,
    currency: "₹",
    has_online_delivery: 1,
    has_table_booking: 0,
    average_cost_for_two: 900
  }
];

// Load Zomato restaurant data
export const getZomatoRestaurants = (): ZomatoRestaurant[] => {
  // Return the expanded dataset
  return zomatoRestaurantData;
};

// Convert Zomato restaurant to our app's Restaurant format
export const convertZomatoToRestaurant = (zomato: ZomatoRestaurant): Restaurant => {
  // Parse cuisines string to array
  const cuisineArray = zomato.cuisines
    .split(',')
    .map(c => c.trim())
    .filter(c => 
      // Filter to include only Indian cuisines and other common cuisines
      c.includes('Indian') ||
      ['Punjabi', 'Mughlai', 'Bengali', 'Gujarati', 'Rajasthani', 
       'Goan', 'Kashmiri', 'Kerala', 'Andhra', 'Hyderabadi', 
       'Chettinad', 'Maharashtrian', 'Karnataka', 'Parsi', 'Cafe',
       'Street Food', 'Continental', 'Chinese', 'Italian', 'Seafood',
       'Coastal', 'Mangalorean', 'Bakery', 'Iranian'].includes(c)
    ) as CuisineType[];

  // If no cuisines found, use a default
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
  
  // Add cuisine-based features
  const cuisineString = zomato.cuisines.toLowerCase();
  if (cuisineString.includes('north indian')) features.push('North Indian');
  if (cuisineString.includes('south indian')) features.push('South Indian');
  if (cuisineString.includes('street food')) features.push('Street Food');
  if (cuisineString.includes('seafood') || cuisineString.includes('coastal')) features.push('Seafood');
  if (cuisineString.includes('cafe')) features.push('Cafe');

  // Create hours - randomize slightly to make data more realistic
  const hours: Record<string, { open: string; close: string }> = {};
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Determine if it's a cafe (opens earlier) or restaurant
  const isCafe = cuisineString.includes('cafe') || cuisineString.includes('bakery');
  const openHour = isCafe ? '08:00' : '11:00';
  const closeHour = '22:00'; // Standard closing time
  
  days.forEach(day => {
    // Weekend hours might be different
    const isWeekend = day === 'Saturday' || day === 'Sunday';
    const weekendCloseHour = isWeekend ? '23:00' : closeHour;
    
    hours[day] = {
      open: openHour,
      close: weekendCloseHour
    };
  });

  // Generate more realistic photo URLs based on cuisine
  const cuisineForPhoto = zomato.cuisines.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
  const photoUrls = [
    `https://source.unsplash.com/featured/?${cuisineForPhoto},food,restaurant`,
    `https://source.unsplash.com/featured/?indian,${cuisineForPhoto},dish`,
    `https://source.unsplash.com/featured/?restaurant,interior,${zomato.city.toLowerCase()}`
  ];

  return {
    id: zomato.res_id,
    name: zomato.name,
    description: `${zomato.name} serves delicious ${zomato.cuisines} cuisine in ${zomato.locality}, ${zomato.city}.`,
    cuisine: cuisineArray,
    priceRange: priceRangeMap[zomato.price_range] || '$$',
    address: zomato.address,
    city: zomato.city,
    state: zomato.city === 'Mumbai' ? 'Maharashtra' : 
           zomato.city === 'New Delhi' ? 'Delhi' : 
           zomato.city === 'Bangalore' ? 'Karnataka' : 
           zomato.city === 'Pune' ? 'Maharashtra' : 'India',
    zipCode: '',
    location: {
      lat: zomato.latitude,
      lng: zomato.longitude
    },
    phone: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`, // Random Indian mobile number
    website: `https://${zomato.name.toLowerCase().replace(/[^\w]+/g, '')}.com`, // Placeholder
    hours: hours,
    photos: photoUrls,
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
    isVegetarian: cuisineString.includes('pure veg') || cuisineString.includes('vegetarian')
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
