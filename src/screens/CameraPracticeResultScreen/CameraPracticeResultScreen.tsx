import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card';
import { Progress } from '../../shared/ui/progress';

interface CameraPracticeResultScreenProps {
  onContinue: () => void;
  onRetry: () => void;
  onBack: () => void;
  result: CameraPracticeResult;
}

interface CameraPracticeResult {
  score: number;
  accuracy: number;
  timeSpent: number;
  signsPracticed: string[];
}

const CameraPracticeResultScreen: React.FC<CameraPracticeResultScreenProps> = ({
  onContinue,
  onRetry,
  onBack,
  result
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Xuất sắc!';
    if (score >= 80) return 'Tuyệt vời!';
    if (score >= 70) return 'Làm tốt lắm!';
    if (score >= 60) return 'Tốt!';
    return 'Tiếp tục thực hành!';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Bạn đang làm chủ ngôn ngữ ký hiệu!';
    if (score >= 80) return 'Bạn đang làm rất tốt!';
    if (score >= 70) return 'Bạn đang tiến bộ rất nhiều!';
    if (score >= 60) return 'Bạn đang đi đúng hướng!';
    return 'Thực hành tạo nên sự hoàn hảo!';
  };

  const getAchievements = (score: number) => {
    const achievements = [];
    if (score >= 80) achievements.push('🎯 Bậc thầy chính xác');
    if (result.signsPracticed.length >= 10) achievements.push('📚 Nhà khám phá ký hiệu');
    if (result.timeSpent >= 300) achievements.push('⏰ Người học tận tâm');
    if (result.accuracy >= 85) achievements.push('⭐ Chuyên gia chính xác');
    return achievements;
  };

  const achievements = getAchievements(result.score);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onClick={onBack} variant="ghost" style={styles.backButton}>
          ← Quay lại
        </Button>
        <Text style={styles.title}>Kết quả thực hành</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Score Card */}
        <Card className="mb-6">
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Điểm số của bạn</Text>
            <Text style={[styles.score, { color: getScoreColor(result.score) }]}>
              {result.score}%
            </Text>
            <Text style={[styles.scoreText, { color: getScoreColor(result.score) }]}>
              {getScoreText(result.score)}
            </Text>
            <Text style={styles.scoreMessage}>
              {getScoreMessage(result.score)}
            </Text>
          </View>
        </Card>

        {/* Detailed Stats */}
        <Card className="mb-6">
          <Text style={styles.sectionTitle}>Chi tiết thực hành</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{result.accuracy}%</Text>
              <Text style={styles.statLabel}>Độ chính xác</Text>
              <Progress value={result.accuracy} className="w-full mt-2" />
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
              </Text>
              <Text style={styles.statLabel}>Thời gian</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{result.signsPracticed.length}</Text>
              <Text style={styles.statLabel}>Ký hiệu đã thực hành</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {Math.round((result.signsPracticed.length / result.timeSpent) * 60)}
              </Text>
              <Text style={styles.statLabel}>Ký hiệu/phút</Text>
            </View>
          </View>
        </Card>

        {/* Signs Practiced */}
        <Card className="mb-6">
          <Text style={styles.sectionTitle}>Các ký hiệu bạn đã thực hành</Text>
          <View style={styles.signsContainer}>
            {result.signsPracticed.map((sign, index) => (
              <View key={index} style={styles.signItem}>
                <Text style={styles.signNumber}>{index + 1}</Text>
                <Text style={styles.signText}>{sign}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Achievements */}
        {achievements.length > 0 && (
          <Card className="mb-6">
            <Text style={styles.sectionTitle}>Thành tích đã mở khóa!</Text>
            <View style={styles.achievementsContainer}>
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <Text style={styles.achievementEmoji}>
                    {achievement.split(' ')[0]}
                  </Text>
                  <Text style={styles.achievementText}>
                    {achievement.split(' ').slice(1).join(' ')}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Tips for Improvement */}
        {result.score < 80 && (
          <Card className="mb-6">
            <Text style={styles.sectionTitle}>Mẹo cải thiện</Text>
            <View style={styles.tipsContainer}>
              <Text style={styles.tipItem}>• Thực hành trong ánh sáng tốt</Text>
              <Text style={styles.tipItem}>• Giữ tay trong khung hình camera</Text>
              <Text style={styles.tipItem}>• Dành thời gian cho từng ký hiệu</Text>
              <Text style={styles.tipItem}>• Thực hành thường xuyên để có kết quả tốt hơn</Text>
            </View>
          </Card>
        )}
      </ScrollView>

      <View style={styles.controls}>
        <Button onClick={onRetry} variant="outline" style={styles.secondaryButton}>
          Thực hành lại
        </Button>
        <Button onClick={onContinue} style={styles.primaryButton}>
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
  scoreContainer: {
    alignItems: 'center',
    padding: 20,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  score: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
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
  signsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  signItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EB6837',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  signNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 6,
  },
  signText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#292F32',
    flex: 1,
  },
  tipsContainer: {
    gap: 8,
  },
  tipItem: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#EB6837',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  secondaryButton: {
    flex: 1,
    borderColor: '#EB6837',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
});

export default CameraPracticeResultScreen;
