
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as AppUser } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (restaurantId: string) => Promise<void>;
  isFavorite: (restaurantId: string) => boolean;
  setUserLocation: (latitude: number, longitude: number) => Promise<void>;
  updateProfile: (userData: Partial<AppUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Initialize auth and load user data
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );
    
    // Check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) throw profileError;
      
      // Get favorites
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('user_favorites')
        .select('restaurant_id')
        .eq('user_id', userId);
      
      if (favoritesError) throw favoritesError;
      
      const favoriteIds = favoritesData.map(fav => fav.restaurant_id);
      setFavorites(favoriteIds);
      
      // Build complete user object
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) throw new Error('User not found');
      
      const appUser: AppUser = {
        id: authUser.id,
        name: profile?.name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: profile?.avatar || 'apple',
        favorites: favoriteIds
      };
      
      setUser(appUser);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  // Sign in with email and password
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register a new user
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) throw error;
      
      toast.success('Registration successful! Please check your email for verification.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign out
  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle restaurant favorite status
  const toggleFavorite = async (restaurantId: string) => {
    if (!user) {
      toast.error('You must be logged in to add favorites');
      return;
    }
    
    try {
      if (isFavorite(restaurantId)) {
        // Remove from favorites
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('restaurant_id', restaurantId);
        
        if (error) throw error;
        
        setFavorites(prev => prev.filter(id => id !== restaurantId));
        setUser(prev => prev ? {...prev, favorites: prev.favorites.filter(id => id !== restaurantId)} : null);
        toast.success('Restaurant removed from favorites');
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            restaurant_id: restaurantId
          });
        
        if (error) throw error;
        
        setFavorites(prev => [...prev, restaurantId]);
        setUser(prev => prev ? {...prev, favorites: [...prev.favorites, restaurantId]} : null);
        toast.success('Restaurant added to favorites');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update favorites');
    }
  };
  
  // Check if restaurant is in favorites
  const isFavorite = (restaurantId: string): boolean => {
    return favorites.includes(restaurantId);
  };
  
  // Update user location
  const setUserLocation = async (latitude: number, longitude: number) => {
    if (!user) return;
    
    setUser(prev => prev ? {
      ...prev,
      location: { latitude, longitude }
    } : null);
  };
  
  // Update user profile
  const updateProfile = async (userData: Partial<AppUser>) => {
    try {
      if (!user) throw new Error('User not logged in');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          avatar: userData.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUser(prev => prev ? { ...prev, ...userData } : null);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
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
      setUserLocation,
      updateProfile
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
