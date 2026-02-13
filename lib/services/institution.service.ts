import { api } from '../api/client';

export interface CreateInstitutionRequest {
  name: string;
  type: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export const institutionService = {
  /**
   * Cria uma nova instituição/escola
   */
  async create(data: CreateInstitutionRequest): Promise<Institution> {
    return api.post<Institution>('/instituition/create', data);
  },
};
