import React, { useState, useEffect } from 'react';
import { Question } from '../../../screens/QuizScreen/children/question';
import { iconicVocabularyByChapter } from '../data/iconic-vocabulary';

interface IconicLearningWrapperProps {
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
  lessonId?: string; // Optional lesson ID to determine chapter
}

const IconicLearningWrapper: React.FC<IconicLearningWrapperProps> = ({ onComplete, lessonId = "01_01_1-discover" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [startTime] = useState(Date.now());

  // Function to extract chapterId from lessonId
  const getChapterIdFromLessonId = (lessonId: string): string => {
    // Extract unit and chapter from lessonId like "02_01_3-iconic"
    const match = lessonId.match(/^(\d+)_(\d+)_/);
    if (match) {
      const unit = match[1];
      const chapter = match[2];
      // Convert to integer to remove leading zeros, then back to string
      const unitNum = parseInt(unit, 10).toString();
      const chapterNum = parseInt(chapter, 10).toString();
      const chapterId = `${unitNum}_${chapterNum}`;
      console.log(`Mapping lessonId: ${lessonId} -> chapterId: ${chapterId}`);
      return chapterId;
    }
    console.log(`No match found for lessonId: ${lessonId}, using default 1_1`);
    return "1_1"; // Default fallback
  };

  const chapterId = getChapterIdFromLessonId(lessonId);

  // Reset state when lessonId changes
  useEffect(() => {
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setUserAnswers([]);
  }, [lessonId]);

  // Function to get iconic vocabulary based on chapter
  const getIconicVocabularyByChapter = (chapterId: string) => {
    // Use data from iconic-vocabulary.ts
    return (iconicVocabularyByChapter as any)[chapterId] || [];
  };

  const iconicVocabulary = getIconicVocabularyByChapter(chapterId);
  console.log(`Using chapterId: ${chapterId}, vocabulary count: ${iconicVocabulary.length}`);
  console.log('First vocabulary item:', iconicVocabulary[0]);

  const currentWord = iconicVocabulary[currentIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeSpent > 0) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeSpent]);

  const handleIconicAnswer = (answerId: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerId.toString());
    // Don't show feedback yet - wait for button click
  };

  const handleNext = () => {
    if (currentIndex < iconicVocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Quiz completed
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      setTimeSpent(totalTime);
      onComplete(score, totalTime);
    }
  };

  const handleSelect = (_answer: string) => {
    // This is required by Question component but not used for ICONIC_LEARNING
  };

  const handleSubmitAnswer = (_answers: Array<string> | Array<number>, _isFinalAnswer?: boolean) => {
    // This is required by Question component but not used for ICONIC_LEARNING
  };

  // Determine prompt based on question type
  const getPrompt = () => {
    const hasVideoOptions = currentWord.options.some((opt: any) => opt.type === "video");
    return hasVideoOptions ? "Chọn video đúng với nghĩa của hình ảnh!" : "CHọn tranh đúng với nghĩa của ký hiệu!";
  };

  // Determine media type for center display
  const getCenterMedia = () => {
    const hasVideoOptions = currentWord.options.some((opt: any) => opt.type === "video");
    if (hasVideoOptions) {
      // If options are videos, show image in center
      return currentWord.image || "https://www.lingvano.com/bsl/wp-content/uploads/sites/4/asl_content/01/01_02/01_02-SWIM.jpg";
    }
    // If options are images, show video in center
    return currentWord.video;
  };

  const getCenterMediaType = () => {
    const hasVideoOptions = currentWord.options.some((opt: any) => opt.type === "video");
    return hasVideoOptions ? "image" : "video";
  };

  // Determine button text and behavior like discover quiz
  const getButtonText = () => {
    if (!selectedAnswer) return "Chọn đáp án"; // No selection yet
    if (!showFeedback) return "Kiểm tra"; // Has selection, not checked yet
    return currentIndex < iconicVocabulary.length - 1 ? "Tiếp theo" : "Hoàn thành"; // Checked, show next/complete
  };

  const handleButtonClick = () => {
    if (!selectedAnswer) return; // No selection yet
    if (!showFeedback) {
      // First click: Show result
      const selectedOption = currentWord.options.find((opt: any) => opt.id.toString() === selectedAnswer);
      const correct = selectedOption?.isCorrect || false;
      setIsCorrect(correct);
      setShowFeedback(true);
      
      if (correct) {
        setScore(prev => prev + currentWord.points);
      }
      
      const newAnswers = [...userAnswers, correct ? 'correct' : 'incorrect'];
      setUserAnswers(newAnswers);
      return;
    }
    // Second click: Next question
    handleNext();
  };

  return (
    <Question
      prompt={getPrompt()}
      type="ICONIC_LEARNING"
      mediaUrl={getCenterMedia()}
      mediaType={getCenterMediaType()}
      selected={selectedAnswer}
      onSelect={handleSelect}
      showResult={showFeedback}
      correctAnswer={currentWord.options.find((opt: any) => opt.isCorrect)?.id.toString()}
      iconicOptions={currentWord.options}
      currentIndex={currentIndex}
      totalQuestions={iconicVocabulary.length}
      onIconicAnswer={handleIconicAnswer}
      onSubmitAnswer={handleSubmitAnswer}
      buttonText={getButtonText()}
      onButtonClick={handleButtonClick}
      buttonDisabled={!selectedAnswer}
    />
  );
};

export default IconicLearningWrapper;
