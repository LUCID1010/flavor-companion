
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  User, 
  getCurrentUser, 
  loginUser, 
  registerUser, 
  logoutUser,
  addFavorite,
  removeFavorite, 
  updateUserLocation
} from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleFavorite: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
  setUserLocation: (latitude: number, longitude: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user on mount
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const user = loginUser(email, password);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      const user = registerUser(name, email, password);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    logoutUser();
    setUser(null);
  };
  
  const toggleFavorite = (restaurantId: string) => {
    if (!user) return;
    
    if (isFavorite(restaurantId)) {
      removeFavorite(restaurantId);
      setUser({...user, favorites: user.favorites.filter(id => id !== restaurantId)});
    } else {
      addFavorite(restaurantId);
      setUser({...user, favorites: [...user.favorites, restaurantId]});
    }
  };
  
  const isFavorite = (restaurantId: string): boolean => {
    return user?.favorites?.includes(restaurantId) || false;
  };
  
  const setUserLocation = (latitude: number, longitude: number) => {
    if (!user) return;
    updateUserLocation(latitude, longitude);
    setUser({...user, location: { latitude, longitude }});
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      toggleFavorite, 
      isFavorite,
      setUserLocation
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
