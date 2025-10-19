import React, { useState } from "react";

// Test component to check video loading
export const VideoTestDemo: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const testVideos = [
    {
      id: "hello",
      word: "HELLO",
      videoUrl: "/resources/videos/hello-sign-demo.mp4",
      meaning: "Lời chào cơ bản khi gặp ai đó",
      example: "Xin chào! Mình là Minh.",
      difficulty: "Dễ",
      isCorrect: true
    },
    {
      id: "welcome",
      word: "WELCOME", 
      videoUrl: "/resources/videos/welcome.mp4",
      meaning: "Lời chào mừng",
      example: "Chào mừng bạn đến với lớp học!",
      difficulty: "Dễ",
      isCorrect: true
    },
    {
      id: "me",
      word: "ME",
      videoUrl: "/resources/videos/me.mp4",
      meaning: "Tôi, mình",
      example: "Mình là học sinh.",
      difficulty: "Dễ",
      isCorrect: true
    }
  ];

  const handleVideoClick = (video: any) => {
    console.log('Test video clicked:', video);
    console.log('Video URL:', video.videoUrl);
    setSelectedVideo(video.videoUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Video Test Demo</h1>
        
        {/* Video List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {testVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <h3 className="text-lg font-semibold mb-2">{video.word}</h3>
              <p className="text-sm text-gray-600 mb-2">{video.meaning}</p>
              <p className="text-xs text-blue-600">{video.videoUrl}</p>
            </button>
          ))}
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Video Player Test</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <video
                className="w-full h-80 object-cover"
                src={selectedVideo}
                controls
                autoPlay
                loop
                onLoadStart={() => {
                  console.log('Video loading started:', selectedVideo);
                }}
                onCanPlay={() => {
                  console.log('Video can play:', selectedVideo);
                }}
                onError={(e) => {
                  console.error('Video load error:', selectedVideo);
                  console.error('Error details:', e);
                }}
              >
                <source src={selectedVideo} type="video/mp4" />
                Video không khả dụng
              </video>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Video URL: {selectedVideo}</p>
              <button
                onClick={() => setSelectedVideo(null)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        )}

        {/* Available Videos List */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Available Videos in /resources/videos/</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[
              'hello-sign-demo.mp4',
              'welcome.mp4', 
              'me.mp4',
              'you.mp4',
              'family.mp4',
              'father.mp4',
              'mother.mp4',
              'brother.mp4',
              'sister.mp4',
              'sibling.mp4',
              'thank-you.mp4',
              'sorry.mp4',
              'no.mp4',
              'yes.mp4',
              'goodbye.mp4'
            ].map((video) => (
              <div key={video} className="p-2 bg-gray-50 rounded text-xs">
                {video}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTestDemo;
