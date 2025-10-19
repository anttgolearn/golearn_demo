import React, { useRef, useState, useEffect } from "react";
import "./DialogVideo.css";

export interface DialogVideoProps {
  videoUrl: string;
  label?: string;
  directionRight?: boolean; // Person A (left) vs Person B (right)
  onEnd: () => void;
  validated: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
  person?: 'a' | 'b';
  order?: number;
  totalVideos?: number;
  isActive?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

export const DialogVideo: React.FC<DialogVideoProps> = ({
  videoUrl,
  label,
  directionRight = false,
  onEnd,
  validated,
  showSubtitle = true,
  subtitle,
  person = 'a',
  order = 1,
  totalVideos = 1,
  isActive = true,
  onPlay,
  onPause
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
      };

      const handleLoadedData = () => {
        setIsLoading(false);
      };

      const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.();
      };

      const handlePause = () => {
        setIsPlaying(false);
        onPause?.();
      };

      const handleEnded = () => {
        setIsPlaying(false);
        onEnd();
      };

      const handleError = () => {
        setHasError(true);
        setIsLoading(false);
      };

      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
      };
    }
  }, [onEnd, onPlay, onPause]);

  const getPersonColor = (person: 'a' | 'b') => {
    return person === 'a' ? 'indigo' : 'purple';
  };

  const getPersonLabel = (person: 'a' | 'b') => {
    return person === 'a' ? 'Person A' : 'Person B';
  };

  const personColor = getPersonColor(person);

  return (
    <div className={`dialog-video-container ${directionRight ? 'direction-right' : 'direction-left'} ${
      isActive ? 'active' : 'inactive'
    }`}>
      {/* Video Player */}
      <div className={`dialog-video-player ${personColor} ${isPlaying ? 'playing' : ''}`}>
        <video
          ref={videoRef}
          className="dialog-video"
          src={videoUrl}
          playsInline
          controls
          preload="metadata"
        />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="dialog-video-loading">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <div className="loading-text">Đang tải video...</div>
          </div>
        )}

        {/* Error Overlay */}
        {hasError && (
          <div className="dialog-video-error">
            <div className="error-icon">⚠️</div>
            <div className="error-text">Không thể tải video</div>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="retry-button"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Subtitle Overlay */}
        {showSubtitle && subtitle && !isLoading && !hasError && (
          <div className="dialog-video-subtitle">
            <div className="subtitle-content">
              <div className="subtitle-person">
                {getPersonLabel(person)}
              </div>
              <div className="subtitle-text">
                {subtitle}
              </div>
            </div>
          </div>
        )}

        {/* Video Status Indicator */}
        {isPlaying && (
          <div className="dialog-video-status">
            <div className="status-indicator playing">
              <div className="status-dot"></div>
              <span>Đang phát</span>
            </div>
          </div>
        )}

        {/* Video Progress Indicator */}
        <div className="dialog-video-progress">
          <div className="progress-bar">
            {Array.from({ length: totalVideos }, (_, index) => (
              <div
                key={index}
                className={`progress-segment ${
                  index < order - 1 ? 'completed' :
                  index === order - 1 ? 'current' : 'pending'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Person Indicator */}
        <div className={`dialog-person-indicator ${personColor}`}>
          <div className="person-avatar">
            {person.toUpperCase()}
          </div>
          <div className="person-label">
            {getPersonLabel(person)}
          </div>
        </div>
      </div>

      {/* Video Label */}
      {label && (
        <div className="dialog-video-label">
          {label}
        </div>
      )}

      {/* Validation Status */}
      {validated && (
        <div className="dialog-validation-status">
          <div className="validation-checkmark">✓</div>
          <span>Đã xem</span>
        </div>
      )}
    </div>
  );
};

export default DialogVideo;
