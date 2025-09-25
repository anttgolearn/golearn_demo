// Mapping of question IDs to their correct video files
export const videoMapping: Record<string, string> = {
  "greet": "/resources/videos/Chào.mp4",
  "thanks": "/resources/videos/Chào.mp4", // Sử dụng Chào.mp4 tạm thời vì không có video cảm ơn
  "number": "/resources/videos/1.mp4",
  "family": "/resources/videos/bố mẹ.mp4",
  "colors": "/resources/videos/màu đỏ.mp4",
  "emotions": "/resources/videos/vui mừng - nam.mp4",
  "food": "/resources/videos/cơm.mp4",
  "time": "/resources/videos/buổi sáng - bắc.mp4",
  "body": "/resources/videos/màu đỏ.mp4", // Tạm thời sử dụng màu đỏ
  "animals": "/resources/videos/con chó - nam.mp4",
  "actions": "/resources/videos/Chào.mp4", // Tạm thời
  "directions": "/resources/videos/Chào.mp4", // Tạm thời
  "weather": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "clothes": "/resources/videos/Chào.mp4", // Tạm thời
  "school": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "transport": "/resources/videos/Chào.mp4", // Tạm thời
  "house": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "nature": "/resources/videos/Chào.mp4", // Tạm thời
  "sports": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "music": "/resources/videos/Chào.mp4", // Tạm thời
  "shapes": "/resources/videos/Chào.mp4", // Tạm thời
  "professions": "/resources/videos/Chào.mp4", // Tạm thời
  "technology": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "furniture": "/resources/videos/Chào.mp4", // Tạm thời
  "kitchen": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "bathroom": "/resources/videos/Chào.mp4", // Tạm thời
  "office": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "hospital": "/resources/videos/Chào.mp4", // Tạm thời
  "shopping": "/resources/videos/màu đỏ.mp4", // Tạm thời
  "travel": "/resources/videos/Chào.mp4", // Tạm thời
  "seasons": "/resources/videos/màu đỏ.mp4", // Tạm thời
};

// Available videos in the resources directory
export const availableVideos = [
  "Chào.mp4",
  "1.mp4",
  "2.mp4", 
  "3.mp4",
  "bố mẹ.mp4",
  "màu đỏ.mp4",
  "vui mừng - nam.mp4",
  "cơm.mp4",
  "buổi sáng - bắc.mp4",
  "con chó - nam.mp4",
  // Add more as needed
];

export const getVideoUrl = (questionId: string): string => {
  return videoMapping[questionId] || "/resources/videos/Chào.mp4";
};
