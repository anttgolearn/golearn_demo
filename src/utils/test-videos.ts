// Test script to check if videos are accessible
export const testVideoAccessibility = async () => {
  const videoFiles = [
    '/resources/videos/Chào.mp4',
    '/resources/videos/1.mp4',
    '/resources/videos/bố mẹ.mp4',
    '/resources/videos/màu đỏ.mp4',
    '/resources/videos/vui mừng - nam.mp4',
    '/resources/videos/cơm.mp4',
    '/resources/videos/buổi sáng - bắc.mp4',
    '/resources/videos/con chó - nam.mp4',
  ];

  console.log('Testing video accessibility...');
  
  for (const videoUrl of videoFiles) {
    try {
      const response = await fetch(videoUrl, { method: 'HEAD' });
      console.log(`${videoUrl}: ${response.ok ? '✅ OK' : '❌ Failed (Status: ' + response.status + ')'}`);
    } catch (error) {
      console.log(`${videoUrl}: ❌ Error - ${error}`);
    }
  }
};

// Run test in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment to run test
  // testVideoAccessibility();
}
