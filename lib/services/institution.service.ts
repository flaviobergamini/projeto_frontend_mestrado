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

export const institutionService = {
  async getQuestions(): Promise<QuestionsResponse> {
    return api.get<QuestionsResponse>('/institution/questions');
  },

  async createInstitution(
    beneficiaryId: number,
    sections: Section[],
    answers: Record<string, string | boolean>
  ) {
    const sectionsWithAnswers = sections.map((section) => ({
      section_name: section.section_name,
      questions: section.questions.map((q) => ({
        key: q.key,
        question: q.question,
        type: q.type,
        answer: answers[q.key] ?? (q.type === 'boolean' ? false : 'Não informado'),
      })),
    }));

    return api.post('/institution/create', {
      beneficiary_id: beneficiaryId,
      custom_questions: {
        institution: { sections: sectionsWithAnswers },
      },
    });
  },
};
