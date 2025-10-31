import { VideoComparisonSpec } from "./index";

export type VideoComparisonQA = VideoComparisonSpec;

export const VIDEO_COMPARISON_QA: Record<string, VideoComparisonQA[]> = {
  greetings: [
    {
      prompt: "Chọn video khớp với ký hiệu 'Chào'",
      options: [
        { label: 'A', video: '/resources/videos/Chào.mp4' },
        { label: 'B', video: '/resources/videos/tạm biệt.mp4' },
      ],
      correct: 'A',
    },
    {
      prompt: "Chọn video khớp với ký hiệu 'Cảm ơn'",
      options: [
        { label: 'A', video: '/resources/videos/cảm ơn.mp4' },
        { label: 'B', video: '/resources/videos/xin lỗi.mp4' },
      ],
      correct: 'A',
    },
  ],
  emotions: [
    {
      prompt: "Chọn video khớp với ký hiệu 'Tự tin'",
      options: [
        { label: 'A', video: '/resources/videos/tự_tin.mp4' },
        { label: 'B', video: '/resources/videos/buồn thảm.mp4' },
      ],
      correct: 'A',
    },
    {
      prompt: "Chọn video khớp với ký hiệu 'Vui mừng'",
      options: [
        { label: 'A', video: '/resources/videos/vui_mừng.mp4' },
        { label: 'B', video: '/resources/videos/giận_dữ.mp4' },
      ],
      correct: 'A',
    },
  ],
};


