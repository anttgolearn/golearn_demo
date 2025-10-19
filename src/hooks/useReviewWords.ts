import { useMemo } from 'react';
import { HARDCODED_QUIZZES, MockQuestion } from '../lib/mock-lessons';

// Question categories constants
export const QuestionCategories = {
  CONTENT: {
    CAT_1A: '1a',
    CAT_2A: '2a', 
    CAT_3A: '3a',
  },
  PRACTICE: {
    CAT_1B: '1b',
    CAT_2B: '2b',
    CAT_3B: '3b',
  },
  DIALOG: {
    CAT_1C: '1c',
    CAT_2C: '2c',
    CAT_3C: '3c',
  }
} as const;

// Interfaces
export interface VocabVideo {
  title: string;
  videoUrl: string;
}

export interface ReviewWordsResult {
  correctAnswers: VocabVideo[];
  incorrectAnswers: VocabVideo[];
  reviewWords: Map<string, VocabVideo>;
}

// Mock user answers - in real app this would come from quiz store
const mockUserAnswers: Record<string, boolean> = {
  '1': true,  // Chào - correct
  '2': true,  // Chọn ký hiệu đúng cho "Chào" - correct
  '3': false, // Ký hiệu nào có nghĩa là "Tạm biệt" - incorrect
  '4': true,  // Ký hiệu nào có nghĩa là "Xin lỗi" - correct
  '5': true,  // Điền vào chỗ trống - correct
};

export const useReviewWords = (lessonId: string = '01_01_1-discover'): ReviewWordsResult => {
  return useMemo(() => {
    const videoMap = new Map<string, VocabVideo>();
    const correctAnswers: VocabVideo[] = [];
    const incorrectAnswers: VocabVideo[] = [];

    // Get quiz data from HARDCODED_QUIZZES
    const quizData = HARDCODED_QUIZZES[lessonId];
    if (!quizData) {
      console.warn(`No quiz data found for lessonId: ${lessonId}`);
      return {
        correctAnswers: [],
        incorrectAnswers: [],
        reviewWords: new Map(),
      };
    }

    // Helper function to add video to map
    const addVideo = (key: string, video: VocabVideo, isCorrect: boolean) => {
      if (!videoMap.has(key)) {
        videoMap.set(key, video);
        if (isCorrect) {
          correctAnswers.push(video);
        } else {
          incorrectAnswers.push(video);
        }
      }
    };

    // Process each question from real quiz data
    quizData.questions.forEach((question: MockQuestion) => {
      const isCorrect = mockUserAnswers[question.id.toString()] ?? false;

      // 1. Content Questions (CAT_1A) - Extract from questionParts[0]
      if (question.category === QuestionCategories.CONTENT.CAT_1A) {
        const firstPart = question.questionParts[0];
        if (firstPart?.type === 'video' && firstPart.url) {
          const video = {
            title: firstPart.content || question.title.replace('Từ mới: ', ''),
            videoUrl: firstPart.url,
          };
          addVideo(video.title, video, isCorrect);
        }
      }

      // 2. Answer Options with Video - Extract from answerOptions
      question.answerOptions.forEach((answer) => {
        if (answer.media?.label && answer.media?.type === 'video') {
          const video = {
            title: answer.media.label,
            videoUrl: answer.media.url,
          };
          addVideo(answer.media.label, video, isCorrect);
        }
      });

      // 3. Question Parts with Video - Extract from questionParts
      question.questionParts
        .filter((part) => part.type === 'video' && part.content)
        .forEach((questionPart) => {
          const video = {
            title: questionPart.content!,
            videoUrl: questionPart.url!,
          };
          addVideo(questionPart.content!, video, isCorrect);
        });
    });

    // Sort by word length (shorter words first)
    const sortedVideoMap = new Map(
      [...videoMap.entries()].sort((a, b) => {
        const aLength = a[0].split(' ').length;
        const bLength = b[0].split(' ').length;
        return aLength - bLength;
      })
    );

    console.log('Extracted videos from lesson:', {
      lessonId,
      totalVideos: videoMap.size,
      correctCount: correctAnswers.length,
      incorrectCount: incorrectAnswers.length,
      videos: Array.from(videoMap.keys())
    });

    return {
      correctAnswers,
      incorrectAnswers,
      reviewWords: sortedVideoMap,
    };
  }, [lessonId]);
};
