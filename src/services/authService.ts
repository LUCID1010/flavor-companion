
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Mock database of users
const USERS_STORAGE_KEY = 'foodiefinder_users';
const CURRENT_USER_KEY = 'foodiefinder_current_user';

// Get all users from localStorage
const getUsers = (): Record<string, User> => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

// Save users to localStorage
const saveUsers = (users: Record<string, User>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Save current user
const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Register a new user
export const registerUser = (name: string, email: string, password: string): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users[email]) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    favorites: []
  };
  
  // Add user to "database"
  users[email] = newUser;
  saveUsers(users);
  
  // Set as current user
  saveCurrentUser(newUser);
  
  toast.success('Registration successful!');
  return newUser;
};

// Login user
export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  
  // Check if user exists
  const user = users[email];
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // In a real app, you would check password hash here
  // For demo purposes, we're not checking password
  
  // Set as current user
  saveCurrentUser(user);
  
  toast.success('Login successful!');
  return user;
};

// Logout user
export const logoutUser = () => {
  saveCurrentUser(null);
  toast.success('Logout successful!');
};

// Add restaurant to favorites
export const addFavorite = (restaurantId: string) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    toast.error('You must be logged in to add favorites');
    return false;
  }
  
  if (!currentUser.favorites.includes(restaurantId)) {
    currentUser.favorites.push(restaurantId);
    
    // Update user in "database"
    const users = getUsers();
    users[currentUser.email] = currentUser;
    saveUsers(users);
    
    // Update current user
    saveCurrentUser(currentUser);
    
    toast.success('Restaurant added to favorites!');
    return true;
  }
  
  return false;
};

// Remove restaurant from favorites
export const removeFavorite = (restaurantId: string) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return false;
  }
  
  if (currentUser.favorites.includes(restaurantId)) {
    currentUser.favorites = currentUser.favorites.filter(id => id !== restaurantId);
    
    // Update user in "database"
    const users = getUsers();
    users[currentUser.email] = currentUser;
    saveUsers(users);
    
    // Update current user
    saveCurrentUser(currentUser);
    
    toast.success('Restaurant removed from favorites!');
    return true;
  }
  
  return false;
};

// Update user location
export const updateUserLocation = (latitude: number, longitude: number) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return false;
  }
  
  currentUser.location = { latitude, longitude };
  
  // Update user in "database"
  const users = getUsers();
  users[currentUser.email] = currentUser;
  saveUsers(users);
  
  // Update current user
  saveCurrentUser(currentUser);
  
  return true;
};
