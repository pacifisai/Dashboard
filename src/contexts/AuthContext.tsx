import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('pacifisai_token');
    const userData = localStorage.getItem('pacifisai_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('pacifisai_token');
        localStorage.removeItem('pacifisai_user');
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('pacifisai_users') || '[]');
      
      // Check if email already exists
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('Email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password: password, // In real app, this would be hashed
      };

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('pacifisai_users', JSON.stringify(existingUsers));

      // Auto login after registration
      const userWithoutPassword = { id: newUser.id, email: newUser.email };
      setUser(userWithoutPassword);
      localStorage.setItem('pacifisai_token', 'mock_token_' + newUser.id);
      localStorage.setItem('pacifisai_user', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('pacifisai_users') || '[]');
      
      // Find user with matching credentials
      const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Login successful
      const userWithoutPassword = { id: foundUser.id, email: foundUser.email };
      setUser(userWithoutPassword);
      localStorage.setItem('pacifisai_token', 'mock_token_' + foundUser.id);
      localStorage.setItem('pacifisai_user', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pacifisai_token');
    localStorage.removeItem('pacifisai_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};