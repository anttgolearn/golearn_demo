import React from "react";

type QuizHeaderProps = { current: number; total: number };

export const QuizHeader: React.FC<QuizHeaderProps> = ({ current, total }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="font-semibold">Câu {current + 1} / {total}</div>
    <div className="h-2 bg-gray-200 rounded w-40">
      <div className="h-2 bg-blue-500 rounded" style={{ width: `${((current + 1) / Math.max(1, total)) * 100}%` }} />
    </div>
  </div>
);

export default QuizHeader;


