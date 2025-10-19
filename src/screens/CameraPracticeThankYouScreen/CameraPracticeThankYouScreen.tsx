import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../shared/ui/button';

interface CameraPracticeThankYouScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const CameraPracticeThankYouScreen: React.FC<CameraPracticeThankYouScreenProps> = ({
  onComplete,
  onBack
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎉</Text>
        </View>
        
        <Text style={styles.title}>Cảm ơn bạn!</Text>
        
        <Text style={styles.message}>
          Cảm ơn bạn đã hoàn thành buổi thực hành camera. Phản hồi của bạn giúp chúng tôi cải thiện trải nghiệm học tập cho mọi người.
        </Text>
        
        <View style={styles.highlightsContainer}>
          <Text style={styles.highlightsTitle}>Bước tiếp theo?</Text>
          
          <View style={styles.highlightItem}>
            <Text style={styles.highlightEmoji}>📚</Text>
            <Text style={styles.highlightText}>
              Tiếp tục với các bài học thường xuyên để xây dựng thêm từ vựng
            </Text>
          </View>
          
          <View style={styles.highlightItem}>
            <Text style={styles.highlightEmoji}>🔄</Text>
            <Text style={styles.highlightText}>
              Thực hành lại bất cứ lúc nào để cải thiện độ chính xác
            </Text>
          </View>
          
          <View style={styles.highlightItem}>
            <Text style={styles.highlightEmoji}>🌟</Text>
            <Text style={styles.highlightText}>
              Chia sẻ tiến độ của bạn với bạn bè và gia đình
            </Text>
          </View>
        </View>
        
        <View style={styles.encouragementContainer}>
          <Text style={styles.encouragementText}>
            "Mọi chuyên gia đều từng là người mới bắt đầu. Mọi chuyên nghiệp đều từng là nghiệp dư. Mọi biểu tượng đều từng là vô danh."
          </Text>
          <Text style={styles.encouragementAuthor}>- Robin Sharma</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Button onPress={onComplete} style={styles.primaryButton}>
          Tiếp tục học
        </Button>
        
        <Button onPress={onBack} variant="ghost" style={styles.secondaryButton}>
          Quay lại thực hành
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
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EB6837',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  highlightsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  highlightsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 20,
    textAlign: 'center',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  highlightEmoji: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    flex: 1,
  },
  encouragementContainer: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    marginHorizontal: 20,
  },
  encouragementText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#292F32',
    lineHeight: 24,
    marginBottom: 8,
  },
  encouragementAuthor: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  controls: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#EB6837',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default CameraPracticeThankYouScreen;
