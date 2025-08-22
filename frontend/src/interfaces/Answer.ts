interface Citation {
  document: string;
}

interface AnswerResult {
  question: string;
  answer: string;
  citations: Citation[];
}

export type { Citation, AnswerResult };
