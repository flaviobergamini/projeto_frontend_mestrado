/**
 * Tipos compartilhados entre serviços
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
}

/**
 * Re-exporta tipos dos serviços para facilitar importação
 */
export type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from '../services/auth.service';

export type {
  GeneratePEIRequest,
  GeneratePEIResponse,
  GeneratePEIPDFRequest,
  GeneratePEIPDFResponse,
} from '../services/pei.service';

export type {
  InstitutionQuestion,
  InstitutionSection,
  InstitutionQuestionsResponse,
} from '../services/institution.service';

export type {
  CaseStudyQuestion,
  CaseStudySection,
  CaseStudyQuestionsResponse,
} from '../services/case-study.service';

export type {
  CreateDiaryRequest,
  Diary,
} from '../services/diary.service';
