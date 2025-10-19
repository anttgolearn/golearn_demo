import React from "react";
import { QuestionContent } from "../../molecules/QuestionContent/QuestionContent";
import { LessonPanel } from "../../molecules/LessonPanel/LessonPanel";

type QuestionPart = {
  type: 'video' | 'image' | 'html' | 'table';
  url?: string;
  content?: string;
};

type ContentPageProps = {
  prompt: string;
  onContinue?: () => void;
  isLast?: boolean;
  mediaUrl?: string;
  questionParts?: QuestionPart[];
  isPartialWidth?: boolean; // For CONTENT CAT_1C
  onMirrorClick?: (videoSrc: string) => void;
};

export const ContentPage: React.FC<ContentPageProps> = ({ 
  prompt, 
  onContinue, 
  isLast, 
  mediaUrl, 
  questionParts,
  isPartialWidth = false,
  onMirrorClick 
}) => (
  <div className="w-full max-w-4xl mx-auto px-4">
    {/* Question Content */}
    <QuestionContent
      prompt={prompt}
      questionParts={questionParts}
      mediaUrl={mediaUrl}
      fullWidth={!isPartialWidth}
      onMirrorClick={onMirrorClick}
    />

    {/* Lesson Panel */}
    <LessonPanel
      buttonText={isLast ? 'Hoàn thành' : 'Tiếp tục'}
      onButtonClick={onContinue || (() => {})}
    />
  </div>
);

export default ContentPage;


