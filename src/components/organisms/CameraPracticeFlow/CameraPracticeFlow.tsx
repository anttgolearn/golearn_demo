import React, { useState } from 'react';
// import CameraPracticeOnboardingScreen from '../../../screens/CameraPracticeOnboardingScreen/CameraPracticeOnboardingScreen';
// import CameraPracticeScreen from '../../../screens/CameraPracticeScreen';
// import CameraPracticeResultScreen from '../../../screens/CameraPracticeResultScreen/CameraPracticeResultScreen';
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
  const [, setFeedback] = useState<CameraPracticeFeedback | null>(null);

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
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Camera Practice Onboarding</h2>
            <p className="mb-6">This feature is temporarily disabled for web build.</p>
            <button onClick={handleOnboardingComplete} className="px-4 py-2 bg-blue-500 text-white rounded">
              Continue
            </button>
          </div>
        );
      
      case 'practice':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Camera Practice</h2>
            <p className="mb-6">This feature is temporarily disabled for web build.</p>
            <button onClick={() => handlePracticeComplete({ score: 80, accuracy: 85, timeSpent: 120, signsPracticed: ['hello', 'thank you'] })} className="px-4 py-2 bg-blue-500 text-white rounded">
              Complete Practice
            </button>
          </div>
        );
      
      case 'result':
        return practiceResult ? (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Results</h2>
            <p className="mb-6">Score: {practiceResult.score}%</p>
            <div className="space-x-4">
              <button onClick={handleResultContinue} className="px-4 py-2 bg-green-500 text-white rounded">
                Continue
              </button>
              <button onClick={handleResultRetry} className="px-4 py-2 bg-blue-500 text-white rounded">
                Retry
              </button>
            </div>
          </div>
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
    <div className="flex-1">
      {renderCurrentStep()}
    </div>
  );
};


export default CameraPracticeFlow;
