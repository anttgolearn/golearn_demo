import React, { useState } from 'react';
import { VideoAnswerOption } from './molecules/VideoAnswerOption';
import { AnswerFeedbackPanel } from './molecules/AnswerFeedbackPanel';
import { getResponsiveDimensions, getConsistentClasses } from '../lib/responsive-utils';

export const TestLayoutConsistency: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const videoOptions = [
    { label: "HELLO", videoSrc: "/resources/videos/hello.mp4" },
    { label: "WELCOME", videoSrc: "/resources/videos/welcome.mp4" },
    { label: "ME", videoSrc: "/resources/videos/me.mp4" },
    { label: "YOU", videoSrc: "/resources/videos/you.mp4" },
  ];

  const handleCheck = () => {
    if (!selected) return;
    const correct = selected === "HELLO"; // Mock correct answer
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const dims = getResponsiveDimensions();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className={`${getConsistentClasses('container')} space-y-8`}>
        
        {/* Header */}
        <div className="text-center">
          <h1 className={`${getConsistentClasses('text')} mb-2`}>
            Layout Consistency Test
          </h1>
          <p className="text-gray-600">Testing uniform sizing and spacing across all components</p>
        </div>

        {/* Question */}
        <div className={`${getConsistentClasses('card')} bg-white shadow-lg`}>
          <h2 className={`${getConsistentClasses('text')} text-center mb-8`}>
            Choose the correct sign!
          </h2>
          
          {/* Video Options Grid */}
          <div className={`grid ${dims.gridCols} ${dims.elementSpacing} ${dims.sectionSpacing}`}>
            {videoOptions.map((option, index) => (
              <VideoAnswerOption
                key={index}
                videoSrc={option.videoSrc}
                label={option.label}
                isSelected={selected === option.label}
                isCorrect={showResult ? (selected === "HELLO" ? selected === option.label : null) : null}
                onClick={() => setSelected(option.label)}
                disabled={showResult}
              />
            ))}
          </div>

          {/* Action Buttons */}
          {!showResult ? (
            <div className="flex justify-center">
              <button
                className={`${getConsistentClasses('button')} bg-blue-600 hover:bg-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleCheck}
                disabled={!selected}
              >
                Check Answer
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                className={`${getConsistentClasses('button')} bg-gray-600 hover:bg-gray-700 text-white shadow-lg`}
                onClick={handleNext}
              >
                Reset Test
              </button>
            </div>
          )}
        </div>

        {/* Dimension Reference */}
        <div className={`${getConsistentClasses('card')} bg-blue-50`}>
          <h3 className={`${getConsistentClasses('text')} mb-4`}>Standardized Dimensions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Container:</strong> {dims.containerMaxWidth}
            </div>
            <div>
              <strong>Video Height:</strong> {dims.videoHeight}
            </div>
            <div>
              <strong>Button Height:</strong> {dims.buttonHeight}
            </div>
            <div>
              <strong>Section Spacing:</strong> {dims.sectionSpacing}
            </div>
            <div>
              <strong>Element Spacing:</strong> {dims.elementSpacing}
            </div>
            <div>
              <strong>Grid Gap:</strong> {dims.gridGap}
            </div>
          </div>
        </div>

        {/* Feedback Panel Test */}
        {showResult && (
          <div className="relative h-32">
            <AnswerFeedbackPanel
              isCorrect={isCorrect}
              onNext={handleNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestLayoutConsistency;
