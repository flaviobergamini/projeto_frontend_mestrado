import { api } from '../api/client';

export interface CreateDiaryRequest {
  caseStudyId: string;
  date: string;
  activities?: string;
  observations?: string;
  progress?: string;
  challenges?: string;
  attachments?: string[];
  [key: string]: any;
}

export interface Diary {
  id: string;
  caseStudyId: string;
  date: string;
  activities?: string;
  observations?: string;
  progress?: string;
  challenges?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export const diaryService = {
  /**
   * Cria uma nova entrada no diário
   */
  async create(data: CreateDiaryRequest): Promise<Diary> {
    return api.post<Diary>('/diary/create', data);
  },
};
