import type { AnswerType } from "./quiz";

export type QuestionModel = {
  id: string;
  type: AnswerType;
  prompt: string;
  mediaUrl?: string;
  options?: string[];
  correctAnswer?: string;
};


