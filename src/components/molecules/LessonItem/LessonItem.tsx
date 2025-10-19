import React from "react";

type LessonItemProps = {
  lesson: {
    id: string;
    title: string;
    type: 'learn' | 'trainer' | 'milestone';
    locked?: boolean;
    description?: string;
    estimatedTime?: number;
  };
  index: number;
  isActiveLesson?: boolean;
  unitId?: number;
  chapterId?: number;
  chapterLessonsLength?: number;
  onPress?: () => void;
};

export const LessonItem: React.FC<LessonItemProps> = ({ 
  lesson, 
  index, 
  isActiveLesson, 
  onPress 
}) => {
  const { type, locked, description, estimatedTime } = lesson;
  
  // Map lesson type to Vietnamese display names
  const getTypeDisplayName = (type: string, index: number) => {
    switch (type.toLowerCase()) {
      case 'learn':
        // Lesson 3 (index 2) is special case for learn type
        if (index === 2) {
          return `Khám phá từ mới qua hình ảnh`;
        }
        return `Khám phá từ mới`;
      case 'trainer':
        return `Luyện tập từ mới`;
      case 'milestone':
        return `Review các từ đã học`;
      default:
        return `${type} ${index + 1}`;
    }
  };
  
  const badge = type === 'learn' ? 'Learn' : type === 'trainer' ? 'Trainer' : 'Milestone';
  const badgeClass = type === 'learn' ? 'bg-blue-100 text-blue-700' : type === 'trainer' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700';
  
  // Determine if lesson is completed (simplified logic - can be enhanced)
  const completed = index === 0; // First lesson is completed for demo
  
  return (
    <button
      className={`w-full text-left border rounded-lg p-4 hover:bg-muted disabled:opacity-60 transition-all duration-200 ${
        isActiveLesson ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-gray-200'
      }`}
      onClick={onPress}
      disabled={locked}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
            completed ? 'bg-green-500 text-white' : isActiveLesson ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}>
            {completed ? '✓' : index + 1}
          </div>
          <div>
            <div className="font-medium">Lesson {index + 1}</div>
            <div className="text-sm text-gray-600 font-mono">
              {getTypeDisplayName(type, index)}
            </div>

            {description && (
              <div className="text-xs text-gray-500 mt-1">{description}</div>
            )}

          </div>
        </div>
        <div className={`text-xs px-2 py-1 rounded ${badgeClass}`}>{badge}</div>
      </div>
    </button>
  );
};

export default LessonItem;


