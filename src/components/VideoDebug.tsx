import { useState } from 'react';

interface VideoDebugProps {
  videoUrl: string;
  title: string;
}

export function VideoDebug({ videoUrl, title }: VideoDebugProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const testVideo = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(videoUrl, { method: 'HEAD' });
      if (response.ok) {
        setLoaded(true);
        console.log(`✅ Video accessible: ${videoUrl}`);
      } else {
        setError(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
      <div className="font-semibold">Debug Info:</div>
      <div>URL: {videoUrl}</div>
      <div>Title: {title}</div>
      <button 
        onClick={testVideo}
        disabled={isLoading}
        className="mt-1 px-2 py-1 bg-blue-500 text-white rounded text-xs disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Video'}
      </button>
      {loaded && <div className="text-green-600">✅ Video accessible</div>}
      {error && <div className="text-red-600">❌ {error}</div>}
    </div>
  );
}
