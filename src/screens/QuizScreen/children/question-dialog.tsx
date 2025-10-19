import React from "react";
import AnswerOptions from "./answer-options";

type Props = {
  prompt: string;
  options?: string[];
  videoOptions?: Array<{ label: string; videoSrc?: string }>;
  selected?: string | null;
  onSelect: (label: string) => void;
  onConfirm: () => void;
  showResult?: boolean;
  correctAnswer?: string;
  isLast?: boolean;
};

export const QuestionDialog: React.FC<Props> = ({ prompt, onConfirm, isLast, ...rest }) => {
  return (
    <div className="flex flex-col items-center animate-fade-in w-full max-w-4xl mx-auto px-4">
      <div className="text-center text-xl font-bold mb-8 w-full">{prompt}</div>
      <AnswerOptions {...rest} />
      <div className="flex justify-end w-full max-w-4xl">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onConfirm}>
          {isLast ? 'Hoàn thành' : 'Tiếp tục'}
        </button>
      </div>
    </div>
  );
};

export default QuestionDialog;


