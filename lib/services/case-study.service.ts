import { api } from '../api/client';

export interface CaseStudyQuestion {
  key: string;
  question: string;
  type: 'text' | 'boolean';
}

export interface CaseStudySection {
  section_name: string;
  questions: CaseStudyQuestion[];
}

export interface CaseStudyQuestionsResponse {
  sections: CaseStudySection[];
}

export const caseStudyService = {
  async getQuestions(): Promise<CaseStudyQuestionsResponse> {
    return api.get<CaseStudyQuestionsResponse>('/case-study/questions', { requiresAuth: false });
  },

  async createCaseStudy(
    beneficiaryId: number,
    sections: CaseStudySection[],
    answers: Record<string, string | boolean>
  ) {
    const custom_questions = {
      sections: sections.map((section) => ({
        section_name: section.section_name,
        questions: section.questions.map((q) => ({
          key: q.key,
          question: q.question,
          type: q.type,
          answer: answers[q.key] ?? (q.type === 'boolean' ? false : 'Não respondido'),
        })),
      })),
    };

    return api.post('/case-study/create', {
      beneficiary_id: beneficiaryId,
      custom_questions,
    });
  },
};
