type OptionProps = {
  text: string;
  url?: string | null;
  isCorrect?: boolean;
  label?: string | null;
};

export const getQuestionTypeFromAnswers = (options: OptionProps[]): 'text' | 'image' | 'video' => {
  if (!options || options.length === 0) return 'text';
  
  // Check if any option has video URL
  const hasVideo = options.some(option => option.url && option.url.includes('.mp4'));
  if (hasVideo) return 'video';
  
  // Check if any option has image URL
  const hasImage = options.some(option => option.url && (option.url.includes('.jpg') || option.url.includes('.png') || option.url.includes('.jpeg') || option.url.includes('.gif')));
  if (hasImage) return 'image';
  
  // Default to text
  return 'text';
};
