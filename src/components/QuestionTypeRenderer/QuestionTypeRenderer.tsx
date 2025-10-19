import React from "react";
import ContentQuestion from "./ContentQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import ClozeAnswerQuestion from "./ClozeAnswerQuestion";
import DialogQuestion from "./DialogQuestion";

// Types
export interface Question {
  id: number;
  category: string;
  title: string;
  type: 'content' | 'single' | 'multiple' | 'cloze_answer' | 'dialog';
  questionParts: QuestionPart[];
  answerOptions: AnswerOption[];
  submittedAnswer?: Answer;
}

export interface QuestionPart {
  type: 'video' | 'image' | 'html' | 'table' | 'popup';
  url?: string;
  content?: string;
  caption?: string;
  dialogPerson?: 'a' | 'b' | null;
  order?: number;
}

export interface AnswerOption {
  id: number;
  answerText?: string;
  isCorrect?: boolean;
  media?: {
    type: 'video' | 'image';
    url: string;
    label: string;
    caption: string;
  };
}

export interface Answer {
  answerText?: string;
  isCorrect: boolean;
  selectedOptions?: number[];
}

export interface QuestionTypeRendererProps {
  question: Question;
  selectedAnswers: number[];
  showResult: boolean;
  onAnswerSelect: (optionId: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  onRetry: () => void;
}

/**
 * Universal Question Type Renderer
 * Renders different question types based on question.type
 */
export const QuestionTypeRenderer: React.FC<QuestionTypeRendererProps> = ({
  question,
  selectedAnswers,
  showResult,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  score,
  totalQuestions,
  timeSpent,
  onRetry
}) => {
  // Common props for all question types
  const commonProps = {
    question,
    selectedAnswers,
    showResult,
    onAnswerSelect,
    onSubmitAnswer,
    onNextQuestion,
    isLastQuestion,
    score,
    totalQuestions,
    timeSpent,
    onRetry
  };

  // Render based on question type
  switch (question.type) {
    case 'content':
      return <ContentQuestion {...commonProps} />;
    
    case 'single':
      return <SingleChoiceQuestion {...commonProps} />;
    
    case 'multiple':
      return <MultipleChoiceQuestion {...commonProps} />;
    
    case 'cloze_answer':
      return <ClozeAnswerQuestion {...commonProps} />;
    
    case 'dialog':
      return <DialogQuestion {...commonProps} />;
    
    default:
      return (
        <div className="text-center p-8">
          <div className="text-red-500 text-lg font-semibold mb-2">
            Loại câu hỏi không được hỗ trợ
          </div>
          <div className="text-gray-600">
            Type: {question.type}
          </div>
        </div>
      );
  }
};

export default QuestionTypeRenderer;
