# Review Vocab Screen

## Overview
The ReviewVocabScreen is a learning recap screen that appears after completing a quiz. It allows users to review the vocabulary they learned in the lesson to enhance retention.

## Features

### 1. Learning Recap
- **Title**: "Learning recap"
- **Subtitle**: "Review the signs from this lesson to enhance your retention."
- Displays vocabulary from the completed lesson

### 2. Vocabulary Display
- **Grid Layout**: Responsive grid showing vocabulary cards
- **Visual Feedback**: Color-coded cards based on quiz performance
  - Green: Correct answers
  - Red: Incorrect answers
  - Gray: Unanswered questions
- **Difficulty Indicators**: Easy, Medium, Hard badges
- **Play Buttons**: Click to watch video demonstrations

### 3. Interactive Features
- **Video Modal**: Click any vocabulary card to open video player
- **Video Controls**: Standard HTML5 video controls
- **Performance Icons**: ✅ Correct, ❌ Incorrect, ❓ Unanswered
- **Example Sentences**: Context for each vocabulary item

### 4. Navigation
- **Back Button**: Return to quiz result screen
- **Continue Button**: Proceed to next lesson or awards

## Props Interface

```typescript
interface Props {
  lessonId: string;           // ID of the lesson being reviewed
  onContinue: () => void;     // Callback when user clicks continue
  onBack?: () => void;        // Optional callback for back navigation
}
```

## Data Structure

```typescript
interface VocabItem {
  id: string;                 // Unique identifier
  word: string;               // Vocabulary word/phrase
  videoUrl: string;           // Path to video demonstration
  meaning: string;            // Definition/translation
  example: string;            // Example sentence
  difficulty: "Dễ" | "Trung bình" | "Khó";  // Difficulty level
  isCorrect?: boolean;        // Quiz performance (true/false/undefined)
}
```

## Styling

### CSS Classes
- `.vocab-card`: Base vocabulary card styling
- `.vocab-card.correct`: Green styling for correct answers
- `.vocab-card.incorrect`: Red styling for incorrect answers
- `.difficulty-easy/medium/hard`: Difficulty badge colors
- `.animate-fade-in-up`: Staggered animation for cards

### Responsive Design
- **Mobile**: Single column layout
- **Tablet**: Two column layout
- **Desktop**: Three column layout

## Navigation Flow

```
Quiz Result Screen → Review Vocab Screen → Next Lesson/Awards
```

1. User completes quiz
2. Quiz result screen shows score
3. User clicks "Continue"
4. Review vocab screen loads with lesson vocabulary
5. User can review vocabulary and watch videos
6. User clicks "Continue Learning"
7. Proceeds to next lesson or awards screen

## Integration

### App.tsx Integration
```typescript
// Route definition
"review-vocab": `#/review-vocab/${currentLessonId}`

// Navigation logic
if (hash.startsWith("/review-vocab/")) {
  const match = hash.match(/^\/review-vocab\/(.+?)$/)
  if (match && match[1]) setCurrentLessonId(decodeURIComponent(match[1]))
  return "review-vocab"
}

// Component rendering
if (appState === "review-vocab") {
  return (
    <ReviewVocabScreen 
      lessonId={currentLessonId}
      onContinue={handleNextAfterResult}
      onBack={() => navigate("quiz-result")}
    />
  )
}
```

### Quiz Result Integration
```typescript
// FinalQuizResultScreen.tsx
<FinalQuizResultScreen 
  onContinue={() => navigate("review-vocab", currentLessonId)}
  lessonId={currentLessonId}
/>
```

## Future Enhancements

1. **Real Data Integration**: Connect to actual lesson vocabulary API
2. **Progress Tracking**: Track which vocabulary items were reviewed
3. **Spaced Repetition**: Implement spaced repetition algorithm
4. **Audio Support**: Add audio pronunciation
5. **Offline Support**: Cache videos for offline viewing
6. **Analytics**: Track user engagement with vocabulary review

## Testing

### Test IDs
- `review-vocab-screen`: Main container
- `vocab-card-{id}`: Individual vocabulary cards
- `video-modal`: Video player modal
- `continue-button`: Continue learning button

### Test Scenarios
1. Load vocabulary from lesson
2. Display correct/incorrect performance
3. Open and close video modal
4. Navigate back to quiz result
5. Continue to next lesson
6. Responsive layout on different screen sizes
