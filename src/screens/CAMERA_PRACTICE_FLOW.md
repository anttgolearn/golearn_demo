# Camera Practice Flow

This document describes the complete camera practice flow implementation for the sign language learning app.

## Overview

The camera practice feature allows users to practice sign language using their device's camera with real-time feedback. It's designed as a BETA feature available only on Android devices for ASL (American Sign Language).

## Flow Architecture

### 1. Entry Point
- **PracticeScreen** (`src/screens/PracticeScreen/PracticeScreen.tsx`)
  - Shows "Camera Practice" button when conditions are met:
    - Feature flag `FF_CAMERA_PRACTICE` is enabled
    - Camera practice is unlocked
    - Language is set to 'asl'
    - Platform is Android
  - Navigates to camera practice flow

### 2. Camera Practice Flow
The flow consists of 5 sequential screens:

#### 2.1 Onboarding Screen
- **File**: `src/screens/CameraPracticeOnboardingScreen/CameraPracticeOnboardingScreen.tsx`
- **Purpose**: Introduces users to camera practice
- **Features**:
  - 4-step introduction
  - Progress indicator
  - Skip option
  - Camera setup tips

#### 2.2 Practice Screen
- **File**: `src/screens/CameraPracticeScreen/CameraPracticeScreen.tsx` (Android)
- **File**: `src/screens/CameraPracticeScreen/CameraPracticeScreen.web.tsx` (Web)
- **Purpose**: Main practice session
- **Features**:
  - Camera permission handling
  - Live camera feed
  - Sign practice with 10 essential signs
  - Real-time timer
  - Progress tracking

#### 2.3 Result Screen
- **File**: `src/screens/CameraPracticeResultScreen/CameraPracticeResultScreen.tsx`
- **Purpose**: Shows practice results and achievements
- **Features**:
  - Score display with color coding
  - Detailed statistics (accuracy, time, signs practiced)
  - Achievement badges
  - Improvement tips
  - Retry option

#### 2.4 Feedback Screen
- **File**: `src/screens/CameraPracticeFeedbackScreen/CameraPracticeFeedbackScreen.tsx`
- **Purpose**: Collects user feedback
- **Features**:
  - Overall experience rating
  - Difficulty level assessment
  - Camera quality feedback
  - Optional text feedback
  - Recommendation question

#### 2.5 Thank You Screen
- **File**: `src/screens/CameraPracticeThankYouScreen/CameraPracticeThankYouScreen.tsx`
- **Purpose**: Concludes the practice session
- **Features**:
  - Thank you message
  - Next steps guidance
  - Motivational quote
  - Continue learning option

### 3. Supporting Components

#### 3.1 Video Component
- **File**: `src/components/atoms/Video/Video.tsx`
- **Purpose**: Displays videos with mirror button
- **Features**:
  - Video placeholder
  - Mirror button integration
  - Accessibility support

#### 3.2 Question Content Component
- **File**: `src/components/molecules/QuestionContent/QuestionContent.tsx`
- **Purpose**: Renders video content in questions
- **Features**:
  - Camera permission handling
  - Mirror button integration
  - Question title display

#### 3.3 Mirror Modal Component
- **File**: `src/components/molecules/MirrorModal/MirrorModal.tsx`
- **Purpose**: Camera mirror for practice
- **Features**:
  - Camera access request
  - Live video feed
  - Reference video display
  - Permission error handling

#### 3.4 Camera Practice Flow Manager
- **File**: `src/components/organisms/CameraPracticeFlow/CameraPracticeFlow.tsx`
- **Purpose**: Manages the complete flow
- **Features**:
  - State management
  - Screen transitions
  - Data passing between screens

## Data Flow

### 1. Practice Results
```typescript
interface CameraPracticeResult {
  score: number;           // Overall score (0-100)
  accuracy: number;        // Accuracy percentage (0-100)
  timeSpent: number;       // Time in seconds
  signsPracticed: string[]; // Array of practiced signs
}
```

### 2. User Feedback
```typescript
interface CameraPracticeFeedback {
  overallExperience: 'good' | 'okay' | 'not_okay';
  difficulty: 'too_easy' | 'just_right' | 'too_hard';
  cameraQuality: 'excellent' | 'good' | 'fair' | 'poor';
  feedback: string;        // Optional text feedback
  wouldRecommend: boolean; // Would recommend to others
}
```

## Platform Support

### Android
- Full camera practice functionality
- Real-time camera access
- Native camera integration

### Web
- Shows "not available" message
- Redirects users to Android app
- Maintains consistent UI

## Integration Points

### 1. Practice Screen Integration
```typescript
// Feature flag check
if (
  configStore.isExperimental(RemoteConfigKeys.FF_CAMERA_PRACTICE) &&
  configStore.cameraPracticeUnlocked &&
  authStore.language === 'asl' &&
  Platform.OS === 'android'
) {
  // Show camera practice option
}
```

### 2. Video Learning Integration
```typescript
// Mirror button in video components
<Video
  source={videoUrl}
  onMirrorPress={() => openMirrorModal()}
  label="Practice this sign"
/>
```

## Usage Examples

### 1. Starting Camera Practice
```typescript
import { CameraPracticeFlow } from '../components/organisms/CameraPracticeFlow';

<CameraPracticeFlow
  onComplete={() => console.log('Practice completed')}
  onBack={() => navigateBack()}
/>
```

### 2. Using Video with Mirror
```typescript
import { Video } from '../components/atoms/Video';

<Video
  source="path/to/video.mp4"
  onMirrorPress={() => setShowMirror(true)}
  label="HELLO"
/>
```

## Future Enhancements

1. **Real-time Sign Recognition**: Integrate ML models for live sign detection
2. **Progress Tracking**: Save practice history and improvement over time
3. **Social Features**: Share achievements and compete with friends
4. **Advanced Analytics**: Detailed performance metrics and insights
5. **Custom Practice**: Allow users to create custom practice sessions

## Testing

### Unit Tests
- Test each screen component individually
- Mock camera permissions and video streams
- Test state management and data flow

### Integration Tests
- Test complete flow from start to finish
- Test platform-specific behavior
- Test error handling and edge cases

### User Testing
- Test on various Android devices
- Test camera quality and performance
- Test user experience and feedback collection

## Dependencies

- React Native Camera (for Android)
- Expo Camera (for cross-platform support)
- React Navigation (for screen transitions)
- Custom UI components (Button, Card, Progress)
- Platform detection utilities
