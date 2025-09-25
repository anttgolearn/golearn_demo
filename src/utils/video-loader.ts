// Utility functions for video loading and error handling

export const checkVideoExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking video existence:', url, error);
    return false;
  }
};

export const preloadVideo = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error(`Failed to load video: ${url}`));
    video.src = url;
  });
};

export const getVideoFallbackUrl = (): string => {
  // If video fails to load, we can return a placeholder or default video
  return '/placeholder-video.mp4'; // You can add a default video here
};

export const formatVideoPath = (filename: string): string => {
  // Ensure proper path formatting for videos
  if (filename.startsWith('/')) {
    return filename;
  }
  return `/resources/videos/${filename}`;
};
