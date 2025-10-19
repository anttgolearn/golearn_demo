import React, { useState, useEffect } from 'react';
import { Fill, getCorrectFills, isTypingMode } from './cloze-helpers';

type OptionsClozeProps = {
  question: {
    id: string;
    prompt: string;
    mediaUrl?: string;
    options?: string[];
    correctAnswer?: string | string[];
    isTyping?: boolean;
    isAnswered?: boolean;
    // Enhanced cloze properties
    correctFills?: string; // Format: "{NICE} MEET-you" or "{[CROSS][CROSSING]} -1-2-3 RIGHT"
    hint?: string[]; // Array of hints
    gapParts?: string[]; // Array of text parts with gaps
  };
  selected?: string | string[] | null;
  onSelect: (value: string) => void;
  correctAnswer?: string | string[];
  showResult?: boolean;
};

export const OptionsCloze: React.FC<OptionsClozeProps> = ({
  question,
  selected,
  onSelect,
  correctAnswer,
  showResult = false,
}) => {
  console.log('OptionsCloze received:', { question, selected, correctAnswer });
  
  // Generate cloze question based on video content
  const generateClozeFromVideo = () => {
    // Get the main word from correctAnswer or options
    const mainWord = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer || '';
    const options = question.options || [];
    
    if (!mainWord) return { gapParts: ['HELLO', ''], hints: ['WORLD'] };
    
    // Create gapParts based on the main word
    // For Vietnamese words, try to split into meaningful parts
    const words = mainWord.split(' ');
    if (words.length >= 2) {
      // Multi-word: hide the last word
      const beforeGap = words.slice(0, -1).join(' ');
      const hiddenWord = words[words.length - 1];
      return {
        gapParts: [beforeGap, ''],
        hints: [hiddenWord, ...options.slice(0, 2)]
      };
    } else {
      // Single word: create a context sentence
      const contextSentences: { [key: string]: string[] } = {
        'chào': ['Xin', ''],
        'tạm biệt': ['Tạm', ''],
        'cảm ơn': ['Cảm', ''],
        'xin lỗi': ['Xin', ''],
        'hello': ['HELLO', ''],
        'goodbye': ['GOOD', 'BYE'],
        'thank you': ['THANK', 'YOU'],
        'sorry': ['SORRY', '']
      };
      
      const context = contextSentences[mainWord.toLowerCase()] || [mainWord, ''];
      return {
        gapParts: context,
        hints: [mainWord, ...options.slice(0, 2)]
      };
    }
  };
  
  // Use generated cloze or fallback to question data
  const { gapParts, hints } = question.gapParts && question.options 
    ? { gapParts: question.gapParts, hints: question.options }
    : generateClozeFromVideo();
  
  console.log('Cloze data:', { gapParts, hints, isTyping: question.isTyping, options: question.options });
  
  // Parse correct fills from question format
  const correctFills = question.correctFills 
    ? getCorrectFills(question.correctFills)
    : (Array.isArray(correctAnswer) ? correctAnswer.map(a => [a]) : [[correctAnswer || '']]);
  
  // Determine if in typing mode
  const isTyping = question.isTyping ?? isTypingMode(hints);
  
  console.log('Typing mode check:', { 
    isTyping, 
    questionIsTyping: question.isTyping, 
    hintsLength: hints.length, 
    hints 
  });
  
  // For cloze questions, always show hints if they exist and we're not in typing mode
  const shouldShowHints = !isTyping && hints && hints.length > 0;
  
  // Initialize selected fills state
  const [selectedFills, setSelectedFills] = useState<Fill[]>(
    correctFills.map(() => ({ id: -1, value: '' }))
  );

  // Update selected fills when selected prop changes
  useEffect(() => {
    if (selected) {
      if (Array.isArray(selected)) {
        setSelectedFills(selected.map((value, index) => ({ id: index, value })));
      } else {
        setSelectedFills([{ id: 0, value: selected }]);
      }
    }
  }, [selected]);

  const changeFills = (fills: Fill[]) => {
    console.log('changeFills called:', { fills, isAnswered: question.isAnswered, showResult });
    if (question.isAnswered || showResult) {
      console.log('changeFills blocked - question answered or showing result');
      return;
    }
    
    setSelectedFills(fills);
    const values = fills.map(f => f.value);
    console.log('changeFills - calling onSelect with:', values.join(','));
    
    // Always call onSelect with the current values, even if not all gaps are filled
    // This allows the parent component to track the current state
    onSelect(values.join(','));
  };

  const onGapPress = (index: number) => {
    if (question.isAnswered || showResult) return;
    if (selectedFills[index]?.value) {
      changeFills(
        selectedFills.map((f, i) => (i === index ? { id: -1, value: '' } : f))
      );
    }
  };

  const onHintPress = (value: string, id: number) => {
    console.log('onHintPress called:', { value, id, isAnswered: question.isAnswered, showResult, correctFills: correctFills.length });
    
    // Simple check - if already answered, don't allow selection
    if (question.isAnswered || showResult) {
      console.log('Selection blocked - question already answered or showing result');
      return;
    }
    
    // For single gap questions, always replace the current selection
    console.log('Setting hint value:', value, 'for gap 0');
    const newFills = [{ value, id }];
    setSelectedFills(newFills);
    
    // Call onSelect immediately
    console.log('Calling onSelect with:', value);
    onSelect(value);
  };

  // Keyboard support
  useEffect(() => {
    if (question.isAnswered || showResult || !shouldShowHints) return;
    
    const handler = (evt: KeyboardEvent) => {
      if (!/^[1-9]$/.test(evt.key)) return;
      
      const id = Number(evt.key) - 1;
      if (id < hints.length && selectedFills.every(f => f.id !== id)) {
        onHintPress(hints[id], id);
      }
    };
    
    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  }, [question.isAnswered, showResult, shouldShowHints, hints, selectedFills]);

  // Always render click-to-select mode (no typing)
  // Render click-to-select mode
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="space-y-4">
        <div className="text-xl font-bold text-center text-gray-800 mb-4">
          {question.prompt || 'Fill in the gap!'}
        </div>
        
        {/* Video preview */}
        {question.mediaUrl && (
          <div className="w-full max-w-4xl mb-2">
            <div className="relative rounded-xl border bg-white overflow-hidden h-64">
              <video
                src={question.mediaUrl}
                autoPlay
                loop
                playsInline
                style={{
                  position: 'absolute',
                  inset: '0px',
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </div>
        )}
        
        {/* Click-to-select gaps - styled like the target format */}
        <div className="w-full rounded-2xl border-2 border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-center gap-3 text-gray-800">
            {/* Text before gap */}
            <span className="text-2xl font-bold text-gray-900">
              {gapParts[0]}
            </span>
            
            {/* Gap button */}
            <button
              type="button"
              className={`h-12 min-w-[120px] px-4 rounded-lg border-2 text-center transition-colors text-lg font-semibold ${
                selectedFills[0]?.value
                  ? 'border-orange-500 bg-orange-100 text-orange-800'
                  : 'border-gray-300 bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
              onClick={() => onGapPress(0)}
              disabled={question.isAnswered || showResult}
            >
              {selectedFills[0]?.value || '____'}
            </button>
            {/* Debug info */}
            <div className="text-xs text-gray-500 mt-1">
              Debug: {JSON.stringify(selectedFills)}
            </div>
            
            {/* Text after gap */}
            {gapParts[1] && (
              <span className="text-2xl font-bold text-gray-900">
                {gapParts[1]}
              </span>
            )}
          </div>
        </div>
        
        {/* Hints Panel - styled like the target format */}
        {shouldShowHints && (
          <div className="w-full rounded-2xl border-2 border-gray-200 p-6 bg-gray-50 mt-4">
            <div className="flex items-center justify-center flex-wrap gap-4" data-testid="question-hints-panel">
              {hints.map((hint, index) => {
                const isUsed = selectedFills.some(f => f.id === index);
                const isAnswered = question.isAnswered || showResult;
                console.log(`Hint ${index}:`, { hint, isUsed, isAnswered, selectedFills });
                
                return (
                  <div 
                    key={index} 
                    tabIndex={0}
                    className={`flex flex-col items-center transition-all duration-200 ${
                      isUsed || isAnswered 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'cursor-pointer hover:scale-105'
                    }`}
                    data-testid={`question-hint-${index}`}
                    style={{ transitionDuration: '0s' }}
                    onClick={() => {
                      console.log('Hint clicked:', { hint, index, isUsed, isAnswered });
                      if (!isUsed && !isAnswered) {
                        onHintPress(hint, index);
                      } else {
                        console.log('Click ignored - already used or answered');
                      }
                    }}
                  >
                    {/* Main hint button with complex nested structure */}
                    <div 
                      className={`rounded-lg border-2 p-4 min-w-[80px] text-center transition-all duration-200 ${
                        isUsed
                          ? 'bg-gray-200 text-gray-500 border-gray-300' // Used state
                          : isAnswered
                          ? 'bg-white text-gray-700 border-gray-300' // Answered but not selected
                          : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700' // Default state
                      }`}
                      style={{ 
                        boxShadow: 'rgba(87, 81, 77, 0.25) 0px 3px 8px',
                        transitionDuration: '0s'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Inner div clicked:', { hint, index, isUsed, isAnswered });
                        if (!isUsed && !isAnswered) {
                          onHintPress(hint, index);
                        }
                      }}
                    >
                      {/* Text content */}
                      <div className="text-center">
                        <span className={`text-sm font-semibold ${
                          isUsed ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {hint}
                        </span>
                      </div>
                    </div>
                    
                    {/* Option number - only show when not answered */}
                    {!isAnswered && (
                      <span 
                        className="text-xs text-gray-500 mt-2 font-medium bg-gray-200 px-2 py-1 rounded-full chooseNumber"
                        data-testid={`keyboard-button-${index + 1}`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
