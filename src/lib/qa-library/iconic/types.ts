export type IconicOption =
  | { id: number; type: 'image'; image: string; text: string; isCorrect: boolean }
  | { id: number; type: 'video'; video: string; text: string; isCorrect: boolean };

export type IconicQuestionType = 'video_choice' | 'picture_choice';

export interface IconicQuestion {
  id: number;
  word: string;
  video?: string;
  instruction: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit: number;
  questionType: IconicQuestionType;
  description: string;
  options: IconicOption[];
}

export type ChapterId = string; // e.g., "2_1"

export type IconicQuestionBank = Record<ChapterId, IconicQuestion[]>;

export interface IconicTemplateInput {
  id: number;
  label: string;
  video: string;
  correctText: string;
  incorrectText: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number;
  timeLimit?: number;
}

export type IconicTemplate = (input: IconicTemplateInput) => IconicQuestion[];


