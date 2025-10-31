import { IconicQuestion, IconicTemplate, IconicTemplateInput } from './types';
import { getImageSet } from './images';

// Template: given one label/video, create 2 questions (video -> image, image -> video)
export const twoWayMediaTemplate: IconicTemplate = (input: IconicTemplateInput): IconicQuestion[] => {
  const {
    id,
    label,
    video,
    correctText,
    incorrectText,
    difficulty = 'medium',
    points = 15,
    timeLimit = 20,
  } = input;

  const images = getImageSet(label);

  const q1: IconicQuestion = {
    id,
    word: label,
    video,
    instruction: `Xem video và chọn ảnh đúng cho ký hiệu ${label.toLowerCase()}`,
    difficulty,
    points,
    timeLimit,
    questionType: 'video_choice',
    description: `Ký hiệu ${label.toLowerCase()} mô tả đúng ngữ nghĩa trong ngữ cảnh hình ảnh`,
    options: [
      { id: 1, type: 'image', image: images.correct, text: correctText, isCorrect: true },
      { id: 2, type: 'image', image: images.incorrect, text: incorrectText, isCorrect: false },
    ],
  };

  const q2: IconicQuestion = {
    id: id + 1,
    word: label,
    video,
    instruction: `Nhìn ảnh và chọn video đúng cho ký hiệu ${label.toLowerCase()}`,
    difficulty,
    points,
    timeLimit,
    questionType: 'picture_choice',
    description: `Chọn video thể hiện đúng ký hiệu ${label.toLowerCase()}`,
    options: [
      { id: 1, type: 'video', video, text: `Video ${label.toLowerCase()}`, isCorrect: true },
      { id: 2, type: 'video', video: '/resources/videos/Chào.mp4', text: 'Video nhiễu', isCorrect: false },
    ],
  };

  return [q1, q2];
};

// Template: simple picture choice only
export const pictureChoiceTemplate: IconicTemplate = (input: IconicTemplateInput): IconicQuestion[] => {
  const { id, label, video, correctText, incorrectText, difficulty = 'easy', points = 10, timeLimit = 15 } = input;
  const images = getImageSet(label);
  return [
    {
      id,
      word: label,
      video,
      instruction: `Chọn ảnh đúng cho ký hiệu ${label.toLowerCase()}`,
      difficulty,
      points,
      timeLimit,
      questionType: 'picture_choice',
      description: `Nhận diện ký hiệu ${label.toLowerCase()} qua hình ảnh mô tả`,
      options: [
        { id: 1, type: 'image', image: images.correct, text: correctText, isCorrect: true },
        { id: 2, type: 'image', image: images.incorrect, text: incorrectText, isCorrect: false },
      ],
    },
  ];
};


