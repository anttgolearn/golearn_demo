import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from '../../shared/ui/button';
import { Progress } from '../../shared/ui/progress';

interface CameraPracticeOnboardingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const { width } = Dimensions.get('window');

const CameraPracticeOnboardingScreen: React.FC<CameraPracticeOnboardingScreenProps> = ({
  onComplete,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Chào mừng đến với Thực hành Camera",
      description: "Thực hành kỹ năng ngôn ngữ ký hiệu của bạn với phản hồi thời gian thực bằng camera của thiết bị.",
      icon: "📱",
      features: [
        "Nhận diện ký hiệu thời gian thực",
        "Phản hồi tức thì về độ chính xác",
        "Thực hành 10 ký hiệu cơ bản",
        "Theo dõi tiến độ của bạn"
      ]
    },
    {
      title: "Cách hoạt động",
      description: "Làm theo các bước đơn giản này để tận dụng tối đa buổi thực hành của bạn.",
      icon: "🎯",
      features: [
        "Đặt mình trước camera",
        "Làm theo ký hiệu hiển thị trên màn hình",
        "Thực hành từng ký hiệu cho đến khi thoải mái",
        "Nhận phản hồi tức thì về độ chính xác"
      ]
    },
    {
      title: "Thiết lập Camera",
      description: "Đảm bảo bạn có ánh sáng tốt và vị trí phù hợp để có trải nghiệm tốt nhất.",
      icon: "💡",
      features: [
        "Đảm bảo ánh sáng tốt trên mặt và tay",
        "Giữ tay trong khung hình camera",
        "Duy trì khoảng cách thoải mái với camera",
        "Đảm bảo thiết bị của bạn ổn định"
      ]
    },
    {
      title: "Sẵn sàng bắt đầu?",
      description: "Bạn đã sẵn sàng! Hãy bắt đầu hành trình thực hành ngôn ngữ ký hiệu của bạn.",
      icon: "🚀",
      features: [
        "Buổi thực hành sẽ kéo dài 5-10 phút",
        "Bạn có thể tạm dừng hoặc dừng bất cứ lúc nào",
        "Tiến độ của bạn sẽ được lưu tự động",
        "Hãy vui vẻ và đừng lo lắng về sự hoàn hảo!"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onClick={prevStep} variant="ghost" style={styles.backButton}>
          ← Quay lại
        </Button>
        <Text style={styles.title}>Thực hành Camera</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        <Progress value={progress} className="w-full" />
        <Text style={styles.progressText}>
          Bước {currentStep + 1} trong {steps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{currentStepData.icon}</Text>
          </View>
          
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          
          <Text style={styles.stepDescription}>{currentStepData.description}</Text>
          
          <View style={styles.featuresContainer}>
            {currentStepData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.controls}>
        <Button onClick={nextStep} className="w-full bg-orange-600 text-white py-4 px-8 rounded-lg mb-3">
          {currentStep === steps.length - 1 ? 'Bắt đầu thực hành' : 'Tiếp theo'}
        </Button>
        
        {currentStep < steps.length - 1 && (
          <Button onClick={onComplete} variant="ghost" className="py-3 px-6">
            Bỏ qua hướng dẫn
          </Button>
        )}
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
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EB6837',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 50,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#292F32',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureBullet: {
    fontSize: 20,
    color: '#EB6837',
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    flex: 1,
  },
  controls: {
    paddingTop: 20,
  },
  primaryButton: {
    backgroundColor: '#EB6837',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default CameraPracticeOnboardingScreen;
