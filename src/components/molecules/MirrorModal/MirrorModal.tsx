import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Info } from 'lucide-react';

interface MirrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  signText: string;
  videoSrc?: string;
}

export const MirrorModal: React.FC<MirrorModalProps> = ({
  isOpen,
  onClose,
  signText,
  videoSrc
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      requestCameraPermission();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const requestCameraPermission = async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCameraPermission(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasCameraPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-label="Bottom sheet backdrop"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end">
        <div className="w-full h-40% bg-[#FFF8F3] rounded-t-2xl transform transition-transform duration-300 ease-out">
          {/* Header */}
          <div className="flex items-center justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pb-4 h-full flex flex-col">
            {/* Sign Text */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{signText}</h2>
            </div>

            {/* Camera Permission Info */}
            {hasCameraPermission === false && (
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-6">
                <Info className="w-6 h-6 text-gray-700 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p>Vui lòng cho phép truy cập camera trong cài đặt trình duyệt để sử dụng tính năng này.</p>
                </div>
              </div>
            )}

            {/* Video Container */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              {/* Main Camera View */}
              {isLoading ? (
                <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang truy cập camera...</p>
                  </div>
                </div>
              ) : hasCameraPermission ? (
                <div className="w-full h-64 bg-black rounded-xl overflow-hidden relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Camera không khả dụng</p>
                  </div>
                </div>
              )}

              {/* Reference Video */}
              {videoSrc && (
                <div className="w-full h-32 bg-black rounded-xl overflow-hidden">
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MirrorModal;
