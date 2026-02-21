import { api, tokenManager } from '../api/client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Formato real retornado pela API (snake_case)
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  email_verified: boolean;
}

export interface RegisterResponse {
  id?: number | string;
  name?: string;
  email?: string;
  message?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      credentials,
      { requiresAuth: false }
    );

    tokenManager.setTokens(response.access_token, response.refresh_token);

    // Salvar email como informação mínima do usuário
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'user',
        JSON.stringify({ id: '', name: credentials.email, email: credentials.email })
      );
    }

    return response;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      data,
      { requiresAuth: false }
    );

    return response;
  },

  logout(): void {
    tokenManager.clearTokens();

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  isAuthenticated(): boolean {
    return !!tokenManager.getAccessToken();
  },

  getCurrentUser(): { id: string; name: string; email: string } | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
