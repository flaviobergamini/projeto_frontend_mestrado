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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export const authService = {
  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/auth/login',
      credentials,
      { requiresAuth: false }
    );

    // Salvar tokens
    tokenManager.setTokens(response.accessToken, response.refreshToken);

    // Salvar dados do usuário
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Registra novo usuário
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/auth/register',
      data,
      { requiresAuth: false }
    );

    // Salvar tokens
    tokenManager.setTokens(response.accessToken, response.refreshToken);

    // Salvar dados do usuário
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Renova o access token usando o refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    const response = await api.post<RefreshTokenResponse>(
      '/auth/refresh-token',
      { refreshToken },
      { requiresAuth: false }
    );

    tokenManager.setAccessToken(response.accessToken);

    return response;
  },

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    tokenManager.clearTokens();

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!tokenManager.getAccessToken();
  },

  /**
   * Retorna os dados do usuário armazenados
   */
  getCurrentUser(): AuthResponse['user'] | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
