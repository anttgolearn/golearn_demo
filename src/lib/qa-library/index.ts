// Central QA library to provide normalized question/answer pools per type
// Demo data is hardcoded per question type to avoid cross-module imports

export type QAVideoItem = { label: string; video: string };

export type SingleChoiceSpec = {
  prompt: string;
  correct: QAVideoItem;
  distractors: QAVideoItem[];
};

export type MultipleChoiceSpec = {
  prompt: string;
  video: string;
  correctLabel: string;
  options: string[];
};

export type ClozeSpec = {
  prompt: string;
  video: string;
  correctPhrase: string;
  options: string[];
};

export type VideoComparisonSpec = {
  prompt: string;
  options: { label: string; video: string }[];
  correct: string;
};

// Barrel exports for per-type datasets
export * from './single-choice-data';
export * from './multiple-choice-data';
export * from './cloze-data';
export * from './video-comparison-data';


