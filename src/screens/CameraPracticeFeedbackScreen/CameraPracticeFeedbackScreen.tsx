import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={onBack} variant="ghost" style={styles.backButton}>
          ← Quay lại
        </Button>
        <Text style={styles.title}>Hoàn thành thực hành!</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Results Summary */}
        <Card className="mb-6">
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Kết quả của bạn</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={[styles.score, { color: getScoreColor(result.score) }]}>
                {result.score}%
              </Text>
              <Text style={styles.scoreLabel}>Tổng điểm</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{result.accuracy}%</Text>
                <Text style={styles.statLabel}>Độ chính xác</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
                </Text>
                <Text style={styles.statLabel}>Thời gian</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{result.signsPracticed.length}</Text>
                <Text style={styles.statLabel}>Ký hiệu đã thực hành</Text>
              </View>
            </View>
            
            <Text style={[styles.encouragement, { color: getScoreColor(result.score) }]}>
              {getScoreText(result.score)}
            </Text>
          </View>
        </Card>

        {/* Feedback Form */}
        <Card className="mb-6">
          <Text style={styles.feedbackTitle}>Trải nghiệm của bạn như thế nào?</Text>
          
          {/* Overall Experience */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Bạn đánh giá trải nghiệm tổng thể như thế nào?</Text>
            <View style={styles.optionContainer}>
              {[
                { value: 'good', label: 'Tốt', emoji: '😊' },
                { value: 'okay', label: 'Bình thường', emoji: '😐' },
                { value: 'not_okay', label: 'Không tốt', emoji: '😞' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={feedback.overallExperience === option.value ? 'default' : 'outline'}
                  onPress={() => setFeedback(prev => ({ ...prev, overallExperience: option.value as any }))}
                  style={[
                    styles.optionButton,
                    feedback.overallExperience === option.value && styles.selectedOption
                  ]}
                >
                  <Text style={styles.optionEmoji}>{option.emoji}</Text>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </Button>
              ))}
            </View>
          </View>

          {/* Difficulty Level */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Mức độ khó như thế nào?</Text>
            <View style={styles.optionContainer}>
              {[
                { value: 'too_easy', label: 'Quá dễ', emoji: '😴' },
                { value: 'just_right', label: 'Vừa phải', emoji: '👍' },
                { value: 'too_hard', label: 'Quá khó', emoji: '😰' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={feedback.difficulty === option.value ? 'default' : 'outline'}
                  onPress={() => setFeedback(prev => ({ ...prev, difficulty: option.value as any }))}
                  style={[
                    styles.optionButton,
                    feedback.difficulty === option.value && styles.selectedOption
                  ]}
                >
                  <Text style={styles.optionEmoji}>{option.emoji}</Text>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </Button>
              ))}
            </View>
          </View>

          {/* Camera Quality */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Chất lượng camera như thế nào?</Text>
            <View style={styles.optionContainer}>
              {[
                { value: 'excellent', label: 'Xuất sắc', emoji: '⭐' },
                { value: 'good', label: 'Tốt', emoji: '👍' },
                { value: 'fair', label: 'Khá', emoji: '👌' },
                { value: 'poor', label: 'Kém', emoji: '👎' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={feedback.cameraQuality === option.value ? 'default' : 'outline'}
                  onPress={() => setFeedback(prev => ({ ...prev, cameraQuality: option.value as any }))}
                  style={[
                    styles.optionButton,
                    feedback.cameraQuality === option.value && styles.selectedOption
                  ]}
                >
                  <Text style={styles.optionEmoji}>{option.emoji}</Text>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </Button>
              ))}
            </View>
          </View>

          {/* Additional Feedback */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Có phản hồi thêm nào không? (Tùy chọn)</Text>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInput}>
                {feedback.feedback || 'Chia sẻ suy nghĩ của bạn về buổi thực hành...'}
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.controls}>
        <Button onPress={handleSubmit} style={styles.primaryButton}>
          Tiếp tục
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#292F32',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  resultsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#292F32',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  encouragement: {
    fontSize: 18,
    fontWeight: '600',
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292F32',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#EB6837',
  },
  optionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    backgroundColor: '#F9FAFB',
  },
  textInput: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  controls: {
    paddingTop: 20,
  },
  primaryButton: {
    backgroundColor: '#EB6837',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
});

export default CameraPracticeFeedbackScreen;
