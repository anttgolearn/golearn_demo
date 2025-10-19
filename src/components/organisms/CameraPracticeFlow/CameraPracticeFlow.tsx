import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraPracticeOnboardingScreen from '../../../screens/CameraPracticeOnboardingScreen/CameraPracticeOnboardingScreen';
import CameraPracticeScreen from '../../../screens/CameraPracticeScreen';
import CameraPracticeResultScreen from '../../../screens/CameraPracticeResultScreen/CameraPracticeResultScreen';
import CameraPracticeFeedbackScreen from '../../../screens/CameraPracticeFeedbackScreen/CameraPracticeFeedbackScreen';
import CameraPracticeThankYouScreen from '../../../screens/CameraPracticeThankYouScreen/CameraPracticeThankYouScreen';

type CameraPracticeStep = 
  | 'onboarding'
  | 'practice'
  | 'result'
  | 'feedback'
  | 'thankyou';

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

interface CameraPracticeFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const CameraPracticeFlow: React.FC<CameraPracticeFlowProps> = ({
  onComplete,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState<CameraPracticeStep>('onboarding');
  const [practiceResult, setPracticeResult] = useState<CameraPracticeResult | null>(null);
  const [feedback, setFeedback] = useState<CameraPracticeFeedback | null>(null);

  const handleOnboardingComplete = () => {
    setCurrentStep('practice');
  };

  const handlePracticeComplete = (result: CameraPracticeResult) => {
    setPracticeResult(result);
    setCurrentStep('result');
  };

  const handleResultContinue = () => {
    setCurrentStep('feedback');
  };

  const handleResultRetry = () => {
    setCurrentStep('practice');
  };

  const handleFeedbackComplete = (feedbackData: CameraPracticeFeedback) => {
    setFeedback(feedbackData);
    setCurrentStep('thankyou');
  };

  const handleThankYouComplete = () => {
    onComplete();
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'onboarding':
        onBack();
        break;
      case 'practice':
        setCurrentStep('onboarding');
        break;
      case 'result':
        setCurrentStep('practice');
        break;
      case 'feedback':
        setCurrentStep('result');
        break;
      case 'thankyou':
        setCurrentStep('feedback');
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'onboarding':
        return (
          <CameraPracticeOnboardingScreen
            onComplete={handleOnboardingComplete}
            onBack={handleBack}
          />
        );
      
      case 'practice':
        return (
          <CameraPracticeScreen
            onComplete={handlePracticeComplete}
            onBack={handleBack}
          />
        );
      
      case 'result':
        return practiceResult ? (
          <CameraPracticeResultScreen
            onContinue={handleResultContinue}
            onRetry={handleResultRetry}
            onBack={handleBack}
            result={practiceResult}
          />
        ) : null;
      
      case 'feedback':
        return practiceResult ? (
          <CameraPracticeFeedbackScreen
            onComplete={handleFeedbackComplete}
            onBack={handleBack}
            result={practiceResult}
          />
        ) : null;
      
      case 'thankyou':
        return (
          <CameraPracticeThankYouScreen
            onComplete={handleThankYouComplete}
            onBack={handleBack}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraPracticeFlow;
