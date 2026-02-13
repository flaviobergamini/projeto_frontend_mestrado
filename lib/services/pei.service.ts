import { api } from '../api/client';

export interface GeneratePEIRequest {
  studentId: string;
  caseStudyId: string;
  goals?: string[];
  strategies?: string[];
  [key: string]: any;
}

export interface GeneratePEIResponse {
  id: string;
  studentId: string;
  caseStudyId: string;
  content: any;
  createdAt: string;
}

export interface GeneratePEIPDFRequest {
  peiId: string;
}

export interface GeneratePEIPDFResponse {
  url: string;
  fileName: string;
}

export const peiService = {
  /**
   * Gera um novo PEI (Plano Educacional Individualizado)
   */
  async generate(data: GeneratePEIRequest): Promise<GeneratePEIResponse> {
    return api.post<GeneratePEIResponse>('/pei/generate', data);
  },

  /**
   * Gera PDF do PEI
   */
  async generatePDF(data: GeneratePEIPDFRequest): Promise<GeneratePEIPDFResponse> {
    return api.post<GeneratePEIPDFResponse>('/pei/generate-pdf', data);
  },

  /**
   * Faz download do PDF do PEI
   */
  async downloadPDF(peiId: string): Promise<void> {
    const response = await this.generatePDF({ peiId });

    if (typeof window !== 'undefined') {
      // Criar link temporário e fazer download
      const link = document.createElement('a');
      link.href = response.url;
      link.download = response.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
};
