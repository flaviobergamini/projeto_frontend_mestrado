import { api } from '../api/client';

export interface Question {
  key: string;
  question: string;
  type: 'text' | 'boolean';
}

export interface Section {
  section_name: string;
  questions: Question[];
}

export interface QuestionsResponse {
  sections: Section[];
}

export const caseStudyService = {
  async getQuestions(): Promise<QuestionsResponse> {
    return api.get<QuestionsResponse>('/case-study/questions', { requiresAuth: false });
  },

  async createCaseStudy(
    beneficiaryId: number,
    sections: Section[],
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
