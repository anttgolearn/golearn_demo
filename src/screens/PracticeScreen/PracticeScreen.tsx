import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card';
import { CameraPracticeFlow } from '../../components/organisms/CameraPracticeFlow';

interface PracticeMode {
  id: string;
  title: string;
  icon: string;
  locked: boolean;
  badge?: string;
  onPress: () => void;
}

const PracticeScreen: React.FC = () => {
  const [showCameraPractice, setShowCameraPractice] = useState(false);
  const [isCameraPracticeUnlocked] = useState(true); // Simulate feature flag
  const [language] = useState('asl'); // Simulate language setting

  const practiceModes: PracticeMode[] = [
    {
      id: 'vocabulary',
      title: 'Thực hành từ vựng',
      icon: '📚',
      locked: false,
      onPress: () => console.log('Vocabulary practice'),
    },
    {
      id: 'camera-practice',
      title: 'Thực hành Camera',
      icon: '📱',
      locked: false,
      badge: 'BETA',
      onPress: () => setShowCameraPractice(true),
    },
    {
      id: 'conversation',
      title: 'Thực hành hội thoại',
      icon: '💬',
      locked: false,
      onPress: () => console.log('Conversation practice'),
    },
    {
      id: 'grammar',
      title: 'Thực hành ngữ pháp',
      icon: '📝',
      locked: true,
      onPress: () => console.log('Grammar practice'),
    },
  ];

  // Filter camera practice based on conditions
  const filteredModes = practiceModes.filter(mode => {
    if (mode.id === 'camera-practice') {
      return (
        isCameraPracticeUnlocked &&
        language === 'asl' &&
        Platform.OS === 'android'
      );
    }
    return true;
  });

  const handleCameraPracticeComplete = () => {
    setShowCameraPractice(false);
    console.log('Camera practice completed');
  };

  const handleCameraPracticeBack = () => {
    setShowCameraPractice(false);
  };

  if (showCameraPractice) {
    return (
      <CameraPracticeFlow
        onComplete={handleCameraPracticeComplete}
        onBack={handleCameraPracticeBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thực hành</Text>
        <Text style={styles.subtitle}>
          Chọn chế độ thực hành để cải thiện kỹ năng ngôn ngữ ký hiệu của bạn
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.modesContainer}>
          {filteredModes.map((mode) => (
            <Card key={mode.id} className="mb-4">
              <Button
                onPress={mode.onPress}
                disabled={mode.locked}
                style={[
                  styles.modeButton,
                  mode.locked && styles.lockedButton
                ]}
              >
                <View style={styles.modeContent}>
                  <View style={styles.modeHeader}>
                    <Text style={styles.modeIcon}>{mode.icon}</Text>
                    <View style={styles.modeTitleContainer}>
                      <Text style={[
                        styles.modeTitle,
                        mode.locked && styles.lockedText
                      ]}>
                        {mode.title}
                      </Text>
                      {mode.badge && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{mode.badge}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <Text style={[
                    styles.modeDescription,
                    mode.locked && styles.lockedText
                  ]}>
                    {mode.locked 
                      ? 'Hoàn thành thêm bài học để mở khóa chế độ thực hành này'
                      : 'Thực hành và cải thiện kỹ năng ngôn ngữ ký hiệu của bạn'
                    }
                  </Text>
                  
                  {mode.locked && (
                    <View style={styles.lockIcon}>
                      <Text style={styles.lockIconText}>🔒</Text>
                    </View>
                  )}
                </View>
              </Button>
            </Card>
          ))}
        </View>

        {/* Feature Info */}
        <Card className="mt-6">
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Về các chế độ thực hành</Text>
            <Text style={styles.infoText}>
              Mỗi chế độ thực hành được thiết kế để giúp bạn cải thiện các khía cạnh khác nhau của kỹ năng ngôn ngữ ký hiệu. 
              Hoàn thành bài học để mở khóa thêm tùy chọn thực hành.
            </Text>
            
            {Platform.OS !== 'android' && (
              <View style={styles.platformInfo}>
                <Text style={styles.platformInfoText}>
                  📱 Thực hành Camera chỉ có sẵn trên thiết bị Android
                </Text>
              </View>
            )}
          </View>
        </Card>
      </ScrollView>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  content: {
    flex: 1,
  },
  modesContainer: {
    marginBottom: 20,
  },
  modeButton: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  lockedButton: {
    opacity: 0.6,
  },
  modeContent: {
    padding: 20,
    position: 'relative',
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  modeTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292F32',
    flex: 1,
  },
  badge: {
    backgroundColor: '#EB6837',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modeDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  lockIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  lockIconText: {
    fontSize: 20,
  },
  infoContainer: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  platformInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  platformInfoText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
  },
});

export default PracticeScreen;
