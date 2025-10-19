import React, { useState } from 'react';
import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card';

interface CameraPracticeFeedbackScreenProps {
  onComplete: (feedback: CameraPracticeFeedback) => void;
  onBack: () => void;
  result: CameraPracticeResult;
}

interface CameraPracticeResult {
  score: number;
  accuracy: number;
  timeSpent: number;
  signsPracticed: string[];
}

interface CameraPracticeFeedback {
  overallExperience: 'good' | 'okay' | 'not_okay';
  difficulty: 'too_easy' | 'just_right' | 'too_hard';
  cameraQuality: 'excellent' | 'good' | 'fair' | 'poor';
  feedback: string;
  wouldRecommend: boolean;
}

const CameraPracticeFeedbackScreen: React.FC<CameraPracticeFeedbackScreenProps> = ({
  onComplete,
  onBack,
  result
}) => {
  const [feedback, setFeedback] = useState<CameraPracticeFeedback>({
    overallExperience: 'good',
    difficulty: 'just_right',
    cameraQuality: 'good',
    feedback: '',
    wouldRecommend: true
  });

  const handleSubmit = () => {
    onComplete(feedback);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Xuất sắc!';
    if (score >= 60) return 'Làm tốt lắm!';
    return 'Tiếp tục thực hành!';
  };

  return (
    <div className="flex-1 bg-orange-50 p-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <Button onClick={onBack} variant="ghost" className="p-2">
          ← Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Hoàn thành thực hành!</h1>
        <div className="w-15" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Results Summary */}
        <Card className="mb-6">
          <div className="flex flex-col items-center p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Kết quả của bạn</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="text-5xl font-bold" style={{ color: getScoreColor(result.score) }}>
                {result.score}%
              </div>
              <div className="text-base text-gray-600 mt-1">Tổng điểm</div>
            </div>
            
            <div className="flex flex-row justify-around w-full mb-5">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-gray-800">{result.accuracy}%</div>
                <div className="text-sm text-gray-600 mt-1">Độ chính xác</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-gray-800">
                  {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 mt-1">Thời gian</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-gray-800">{result.signsPracticed.length}</div>
                <div className="text-sm text-gray-600 mt-1">Ký hiệu đã thực hành</div>
              </div>
            </div>
            
            <div className="text-lg font-semibold" style={{ color: getScoreColor(result.score) }}>
              {getScoreText(result.score)}
            </div>
          </div>
        </Card>

        {/* Feedback Form */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Trải nghiệm của bạn như thế nào?</h2>
          
          {/* Overall Experience */}
          <div className="mb-6">
            <div className="text-base font-semibold text-gray-800 mb-3">Bạn đánh giá trải nghiệm tổng thể như thế nào?</div>
            <div className="flex flex-row flex-wrap gap-2">
              {[
                { value: 'good', label: 'Tốt', emoji: '😊' },
                { value: 'okay', label: 'Bình thường', emoji: '😐' },
                { value: 'not_okay', label: 'Không tốt', emoji: '😞' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={feedback.overallExperience === option.value ? 'default' : 'outline'}
                  onClick={() => setFeedback(prev => ({ ...prev, overallExperience: option.value as any }))}
                  className={`flex flex-row items-center py-2 px-3 rounded-full min-w-25 justify-center ${
                    feedback.overallExperience === option.value ? 'bg-orange-500' : ''
                  }`}
                >
                  <span className="text-base mr-1.5">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="mb-6">
            <div className="text-base font-semibold text-gray-800 mb-3">Mức độ khó như thế nào?</div>
            <div className="flex flex-row flex-wrap gap-2">
              {[
                { value: 'too_easy', label: 'Quá dễ', emoji: '😴' },
                { value: 'just_right', label: 'Vừa phải', emoji: '👍' },
                { value: 'too_hard', label: 'Quá khó', emoji: '😰' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={feedback.difficulty === option.value ? 'default' : 'outline'}
                  onClick={() => setFeedback(prev => ({ ...prev, difficulty: option.value as any }))}
                  className={`flex flex-row items-center py-2 px-3 rounded-full min-w-25 justify-center ${
                    feedback.difficulty === option.value ? 'bg-orange-500' : ''
                  }`}
                >
                  <span className="text-base mr-1.5">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Camera Quality */}
          <div className="mb-6">
            <div className="text-base font-semibold text-gray-800 mb-3">Chất lượng camera như thế nào?</div>
            <div className="flex flex-row flex-wrap gap-2">
              {[
                { value: 'excellent', label: 'Xuất sắc', emoji: '⭐' },
                { value: 'good', label: 'Tốt', emoji: '👍' },
                { value: 'fair', label: 'Khá', emoji: '👌' },
                { value: 'poor', label: 'Kém', emoji: '👎' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={feedback.cameraQuality === option.value ? 'default' : 'outline'}
                  onClick={() => setFeedback(prev => ({ ...prev, cameraQuality: option.value as any }))}
                  className={`flex flex-row items-center py-2 px-3 rounded-full min-w-25 justify-center ${
                    feedback.cameraQuality === option.value ? 'bg-orange-500' : ''
                  }`}
                >
                  <span className="text-base mr-1.5">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div className="mb-6">
            <div className="text-base font-semibold text-gray-800 mb-3">Có phản hồi thêm nào không? (Tùy chọn)</div>
            <div className="border border-gray-300 rounded-lg p-3 min-h-20 bg-gray-50">
              <div className="text-base text-gray-600 leading-relaxed">
                {feedback.feedback || 'Chia sẻ suy nghĩ của bạn về buổi thực hành...'}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="pt-5">
        <Button onClick={handleSubmit} className="bg-orange-500 py-4 px-8 rounded-lg">
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};


export default CameraPracticeFeedbackScreen;
