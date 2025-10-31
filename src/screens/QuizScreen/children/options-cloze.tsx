import React, { useState, useEffect } from 'react';
import { Fill, parsePhrase } from './cloze-helpers';

type OptionsClozeProps = {
  question: {
    id: string;
    prompt: string;
    mediaUrl?: string;
    options?: string[]; // Các từ nhiễu thêm vào
    correctAnswer?: string | string[]; // Cụm từ đúng, ví dụ: "Cảm ơn"
    isTyping?: boolean;
    isAnswered?: boolean;
    // Enhanced cloze properties
    correctFills?: string; // Format: "{NICE} MEET-you" or "{[CROSS][CROSSING]} -1-2-3 RIGHT"
    hint?: string[]; // Array of hints
    gapParts?: string[]; // Array of text parts with gaps
    hiddenIndices?: number[]; // Các index sẽ bị ẩn, ví dụ: [0] để ẩn từ đầu tiên
  };
  selected?: string | string[] | null;
  onSelect: (value: any) => void; // Sẽ trả về Fill[]
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
  
  // Parse cụm từ đúng thành mảng Fill với index và key
  // Ví dụ: "Cảm ơn" → [{ value: "Cảm", index: 0, key: "c" }, { value: "ơn", index: 1, key: "ơ" }]
  const correctPhrase = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer || '';
  const correctFills: Fill[] = parsePhrase(correctPhrase);
  
  
  // Xác định các index sẽ bị ẩn (random hoặc từ question)
  // Mặc định ẩn từ đầu tiên nếu không có hiddenIndices
  const hiddenIndices = question.hiddenIndices || [0];
  
  // Tạo danh sách hints (đáp án) bao gồm:
  // 1. Các từ đúng cần điền (dựa vào hiddenIndices)
  // 2. Các từ nhiễu từ question.options
  const correctHints = hiddenIndices.map(idx => correctFills[idx]);
  const distractorWords = question.options || [];
  
  // Tạo mảng hints với Fill object cho mỗi hint
  const allHints: Fill[] = [
    ...correctHints,
    ...distractorWords.map((word) => ({
      value: word,
      index: -1, // Từ nhiễu không có index hợp lệ
      key: word.charAt(0).toLowerCase()
    }))
  ];

  // Loại bỏ các hint trùng nhãn (ưu tiên giữ hint đúng có index >= 0)
  const dedupeHints = (fills: Fill[]): Fill[] => {
    const map = new Map<string, Fill>();
    fills.forEach((f) => {
      const k = f.value.toLowerCase().trim();
      const existing = map.get(k);
      if (!existing) {
        map.set(k, f);
        return;
      }
      // Nếu đã có một bản trùng, ưu tiên bản có index hợp lệ (đáp án đúng)
      if (existing.index === -1 && f.index !== -1) {
        map.set(k, f);
      }
    });
    return Array.from(map.values());
  };
  
  // Shuffle hints để random vị trí
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  
  const [hints] = useState(() => shuffleArray(dedupeHints(allHints)));
  
  
  // State để lưu các Fill đã chọn cho từng gap
  // Key là gapIdx (vị trí gap), value là Fill đã chọn
  const [selectedFills, setSelectedFills] = useState<Map<number, Fill>>(new Map());

  // Update selected fills when selected prop changes
  useEffect(() => {
    if (selected && Array.isArray(selected)) {
      const newMap = new Map<number, Fill>();
      (selected as unknown as Fill[]).forEach((fill) => {
        if (fill && typeof fill === 'object' && 'index' in fill) {
          newMap.set(fill.index, fill);
        }
      });
      setSelectedFills(newMap);
    }
  }, [selected]);

  // Khi chọn một hint cho một gap
  const onHintPress = (hint: Fill, gapIdx: number) => {
    
    if (question.isAnswered || showResult) return;
    
    // Kiểm tra xem hint này đã được dùng cho gap khác chưa
    const isHintUsed = Array.from(selectedFills.entries()).some(
      ([key, fill]) => key !== gapIdx && fill.index === hint.index && fill.key === hint.key && fill.value === hint.value
    );
    
    if (isHintUsed) {
      return;
    }
    
    // Cập nhật selectedFills
    const newFills = new Map(selectedFills);
    newFills.set(gapIdx, hint);
    setSelectedFills(newFills);
    
    // Nếu đã điền đủ các gap ẩn thì compose câu hoàn chỉnh, ngược lại gửi chuỗi rỗng
    const allFilled = hiddenIndices.every(idx => newFills.has(idx));
    if (allFilled) {
      const composed = correctFills
        .map((fill, idx) => (hiddenIndices.includes(idx) ? (newFills.get(idx)?.value || '') : fill.value))
        .join(' ');
      onSelect(composed);
    } else {
      onSelect('');
    }
  };

  // Xóa một fill đã chọn
  const onGapPress = (gapIdx: number) => {
    if (question.isAnswered || showResult) return;
    
    const newFills = new Map(selectedFills);
    newFills.delete(gapIdx);
    setSelectedFills(newFills);
    
    const fillsArray = Array.from(newFills.values());
    onSelect(fillsArray);
  };

  // Keyboard support (tạm thời disable vì cần refactor)
  useEffect(() => {
    if (question.isAnswered || showResult) return;
    
    const handler = (evt: KeyboardEvent) => {
      if (!/^[1-9]$/.test(evt.key)) return;
      
      const hintIdx = Number(evt.key) - 1;
      if (hintIdx < hints.length) {
        // Chọn hint cho gap đầu tiên chưa được điền
        const firstEmptyGap = hiddenIndices.find(idx => !selectedFills.has(idx));
        if (firstEmptyGap !== undefined) {
          onHintPress(hints[hintIdx], firstEmptyGap);
        }
      }
    };
    
    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  }, [question.isAnswered, showResult, hints, selectedFills, hiddenIndices]);

  // Render câu với gaps
  // Ví dụ: Nếu correctFills = ["Cảm", "ơn"] và hiddenIndices = [0]
  // Thì hiển thị: ____ ơn
  const renderSentenceWithGaps = () => {
    return (
      <div className="flex items-center justify-center gap-3 text-gray-800 flex-wrap">
        {correctFills.map((fill, idx) => {
          const isHidden = hiddenIndices.includes(idx);
          
          if (isHidden) {
            // Hiển thị gap button
            const selectedFill = selectedFills.get(idx);
            return (
              <button
                key={idx}
                type="button"
                className={`h-12 min-w-[120px] px-4 rounded-lg border-2 text-center transition-colors text-lg font-semibold ${
                  selectedFill
                    ? 'border-orange-500 bg-orange-100 text-orange-800'
                    : 'border-gray-300 bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
                onClick={() => onGapPress(idx)}
                disabled={question.isAnswered || showResult}
              >
                {selectedFill?.value || '____'}
              </button>
            );
          } else {
            // Hiển thị từ không bị ẩn
            return (
              <span key={idx} className="text-2xl font-bold text-gray-900">
                {fill.value}
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="space-y-4">
        <div className="text-xl font-bold text-center text-gray-800 mb-4">
          {question.prompt || 'Điền vào chỗ trống!'}
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
        
        {/* Sentence with gaps */}
        <div className="w-full rounded-2xl border-2 border-gray-200 p-6 bg-gray-50">
          {renderSentenceWithGaps()}
          
          {/* Debug info removed */}
        </div>
        
        {/* Hints Panel */}
        <div className="w-full rounded-2xl border-2 border-gray-200 p-6 bg-gray-50 mt-4">
          <div className="flex items-center justify-center flex-wrap gap-4" data-testid="question-hints-panel">
            {hints.map((hint, hintIndex) => {
              // Kiểm tra hint này đã được dùng chưa
              const isUsed = Array.from(selectedFills.values()).some(
                fill => fill.index === hint.index && fill.key === hint.key && fill.value === hint.value
              );
              
              return (
                <div
                  key={hintIndex}
                  tabIndex={0}
                  className={`flex flex-col items-center transition-all duration-200 ${
                    isUsed
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer hover:scale-105'
                  }`}
                  data-testid={`question-hint-${hintIndex}`}
                  style={{ transitionDuration: '0s' }}
                  onClick={() => {
                    if (isUsed || question.isAnswered || showResult) return;
                    
                    // Chọn hint cho gap đầu tiên chưa được điền
                    const firstEmptyGap = hiddenIndices.find(idx => !selectedFills.has(idx));
                    if (firstEmptyGap !== undefined) {
                      onHintPress(hint, firstEmptyGap);
                    }
                  }}
                >
                  {/* Main hint button */}
                  <div 
                    className={`rounded-lg border-2 p-4 min-w-[80px] text-center transition-all duration-200 ${
                      isUsed
                        ? 'bg-gray-200 text-gray-500 border-gray-300' 
                        : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                    style={{ 
                      boxShadow: 'rgba(87, 81, 77, 0.25) 0px 3px 8px',
                      transitionDuration: '0s'
                    }}
                  >
                    <div className="text-center">
                      <span className={`text-sm font-semibold ${
                        isUsed ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {hint.value}
                      </span>
                    </div>
                  </div>
                  
                  {/* Option number */}
                  {!question.isAnswered && !isUsed && (
                    <span 
                      className="text-xs text-gray-500 mt-2 font-medium bg-gray-200 px-2 py-1 rounded-full chooseNumber"
                      data-testid={`keyboard-button-${hintIndex + 1}`}
                    >
                      {hintIndex + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
