'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/api/client';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage e se há token válido
    const savedUser = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();

    if (savedUser && isAuthenticated) {
      setUser(savedUser);
    }

    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.login({ email, password });
      const savedUser = authService.getCurrentUser();
      setUser(savedUser);
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      if (error instanceof ApiError) {
        return { success: false, error: error.message };
      }

      return {
        success: false,
        error: 'Erro ao fazer login. Tente novamente.',
      };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.register({ name, email, password });
      return { success: true };
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      if (error instanceof ApiError) {
        return { success: false, error: error.message };
      }

      return {
        success: false,
        error: 'Erro ao cadastrar. Tente novamente.',
      };
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user && authService.isAuthenticated(),
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
