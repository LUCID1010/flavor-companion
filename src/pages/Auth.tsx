
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type AuthMode = 'login' | 'register' | 'confirmation';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // Redirect if already authenticated
  useEffect(() => {
    // Get the return URL from localStorage if available
    const returnUrl = localStorage.getItem('returnUrl') || '/';
    
    if (user) {
      // Remove the returnUrl from localStorage after successful login
      localStorage.removeItem('returnUrl');
      navigate(returnUrl);
    }
    
    // Check for authentication hash from magic link or OAuth
    const checkForAuthRedirect = async () => {
      const { hash } = window.location;
      if (hash && hash.includes('access_token')) {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          toast.error(error.message);
        } else if (data?.session) {
          localStorage.removeItem('returnUrl');
          navigate(returnUrl);
        }
        setIsLoading(false);
      }
    };
    
    checkForAuthRedirect();

    // Check for registration success query param
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('registrationSuccess') === 'true') {
      setMode('confirmation');
    }
  }, [user, navigate, location]);
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
        // Change mode to confirmation after successful registration
        setMode('confirmation');
        // Add registration success to URL for page refreshes
        const url = new URL(window.location.href);
        url.searchParams.set('registrationSuccess', 'true');
        window.history.pushState({}, '', url);
      }
    } catch (error) {
      // Error is already handled in useAuth hook
      setIsLoading(false);
    }
  };

  // Handle social auth
  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      
      // Save the current path to redirect back after login
      const returnUrl = location.state?.from || '/';
      localStorage.setItem('returnUrl', returnUrl);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || `Failed to sign in with ${provider}`);
      setIsLoading(false);
    }
  };
  
  // Handle password reset
  const handlePasswordReset = async () => {
    const email = prompt('Please enter your email to receive a password reset link');
    
    if (!email) return;
    
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`
      });
      
      if (error) throw error;
      
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render registration confirmation page
  if (mode === 'confirmation') {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex flex-1 items-center justify-center py-16">
          <div className="foodie-container flex justify-center">
            <div className="relative w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-elegant sm:p-8 md:p-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="mb-2 text-2xl font-semibold text-gray-900">Registration Complete!</h1>
                <p className="mb-6 text-gray-600">
                  Your account has been created successfully. You can now sign in to explore great Indian restaurants.
                </p>
                <button
                  onClick={() => setMode('login')}
                  className="w-full rounded-lg bg-foodie-500 py-3 font-medium text-white shadow-button transition-all hover:bg-foodie-600 active:bg-foodie-700"
                >
                  Continue to Sign In
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center py-16">
        <div className="foodie-container flex justify-center">
          <div className="relative w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-elegant sm:p-8 md:p-10">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
                <Loader2 className="h-8 w-8 animate-spin text-foodie-500" />
              </div>
            )}
            
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-gray-600">
                {mode === 'login' 
                  ? 'Sign in to your FoodieFinder account'
                  : 'Join FoodieFinder to discover great restaurants'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {mode === 'register' && (
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-foodie-400 focus:outline-none focus:ring-1 focus:ring-foodie-400"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-foodie-400 focus:outline-none focus:ring-1 focus:ring-foodie-400"
                    required
                  />
                </div>
                
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button 
                        type="button"
                        onClick={handlePasswordReset}
                        className="text-xs font-medium text-foodie-600 transition-colors hover:text-foodie-700"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-foodie-400 focus:outline-none focus:ring-1 focus:ring-foodie-400"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={toggleShowPassword}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                {mode === 'register' && (
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-foodie-500 focus:ring-foodie-400"
                        required
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the <a href="#" className="font-medium text-foodie-600 hover:text-foodie-700">Terms of Service</a> and <a href="#" className="font-medium text-foodie-600 hover:text-foodie-700">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full rounded-lg bg-foodie-500 py-3 font-medium text-white shadow-button transition-all hover:bg-foodie-600 active:bg-foodie-700",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading 
                    ? 'Please wait...' 
                    : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </form>
            
            <div className="relative mt-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-4 text-sm text-gray-500">
                Or continue with
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth('google')}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                disabled={isLoading}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth('facebook')}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                disabled={isLoading}
              >
                <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                  />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-foodie-600 transition-colors hover:text-foodie-700"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
