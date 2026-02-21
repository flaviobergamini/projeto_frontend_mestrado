import { api } from '../api/client';

export interface InstitutionQuestion {
  key: string;
  question: string;
  type: 'text' | 'boolean';
}

export interface InstitutionSection {
  section_name: string;
  questions: InstitutionQuestion[];
}

export interface InstitutionQuestionsResponse {
  sections: InstitutionSection[];
}

export const institutionService = {
  async getQuestions(): Promise<InstitutionQuestionsResponse> {
    return api.get<InstitutionQuestionsResponse>('/institution/questions');
  },

  async createInstitution(
    beneficiaryId: number,
    sections: InstitutionSection[],
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
