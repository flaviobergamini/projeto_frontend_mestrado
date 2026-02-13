import { api } from '../api/client';

export interface CreateCaseStudyRequest {
  studentName: string;
  studentAge: number;
  institutionId: string;
  diagnosis?: string;
  observations?: string;
  strengths?: string[];
  challenges?: string[];
  [key: string]: any;
}

export interface CaseStudy {
  id: string;
  studentName: string;
  studentAge: number;
  institutionId: string;
  diagnosis?: string;
  observations?: string;
  strengths?: string[];
  challenges?: string[];
  createdAt: string;
  updatedAt: string;
}

export const caseStudyService = {
  /**
   * Cria um novo estudo de caso
   */
  async create(data: CreateCaseStudyRequest): Promise<CaseStudy> {
    return api.post<CaseStudy>('/case-study/create', data);
  },
};
