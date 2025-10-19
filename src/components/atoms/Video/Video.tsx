import React from 'react';

interface VideoProps {
  source: string;
  onMirrorPress?: () => void;
  label?: string;
  testID?: string;
  accessibilityLabel?: string;
  style?: any;
}

const Video: React.FC<VideoProps> = ({
  source,
  onMirrorPress,
  label,
  testID = 'video',
  accessibilityLabel,
  style
}) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200" data-testid={testID} style={style}>
      {/* Video Container */}
      <div className="relative aspect-video">
        <div className="flex-1 bg-gray-100 flex justify-center items-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-600 mb-1">Video Player</div>
            <div className="text-sm text-gray-400">{source}</div>
          </div>
        </div>
        
        {/* Mirror Button */}
        {onMirrorPress && (
          <button
            className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={onMirrorPress}
            data-testid="mirror-button"
            aria-label={accessibilityLabel || 'Open sign mirror'}
          >
            <span className="text-xl">🪞</span>
          </button>
        )}
      </div>
      
      {/* Video Label */}
      {label && (
        <div className="p-4 bg-white">
          <div className="text-base font-semibold text-gray-800 text-center">{label}</div>
        </div>
      )}
    </div>
  );
};


export default Video;
