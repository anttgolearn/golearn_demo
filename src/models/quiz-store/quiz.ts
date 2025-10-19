export type AnswerType = "CONTENT" | "MULTIPLE_CHOICE";

export type QuizQuestion = {
  id: string;
  type: AnswerType;
  prompt: string;
  mediaUrl?: string;
  options?: string[];
  correctAnswer?: string;
};

export type QuizModel = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};


