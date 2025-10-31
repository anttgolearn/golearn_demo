import { ClozeSpec } from "./index";

export type ClozeQA = ClozeSpec;

export const CLOZE_QA: Record<string, ClozeQA[]> = {
  greetings: [
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/cảm ơn.mp4',
      correctPhrase: 'Cảm ơn',
      options: ['Cảm', 'Xin', 'Tạm'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/Chào.mp4',
      correctPhrase: 'Xin chào',
      options: ['Xin', 'Cảm', 'Tạm'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/tạm biệt.mp4',
      correctPhrase: 'Tạm biệt',
      options: ['Tạm', 'Xin', 'Cảm'],
    },
  ],
  emotions: [
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/vui_mừng.mp4',
      correctPhrase: 'Vui mừng',
      options: ['Vui', 'Buồn', 'Giận', 'Tự'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/buồn thảm.mp4',
      correctPhrase: 'Buồn thảm',
      options: ['Buồn', 'Vui', 'Giận', 'Lo'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/giận_dữ.mp4',
      correctPhrase: 'Giận dữ',
      options: ['Giận', 'Vui', 'Buồn', 'Tự'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/thích_thú.mp4',
      correctPhrase: 'Thích thú',
      options: ['Thích', 'Giận', 'Buồn', 'Lo'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/Ngạc_nhiên.mp4',
      correctPhrase: 'Ngạc nhiên',
      options: ['Ngạc', 'Giận', 'Vui', 'Buồn'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/hoảng_sợ.mp4',
      correctPhrase: 'Hoảng sợ',
      options: ['Hoảng', 'Vui', 'Giận', 'Buồn'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/hồi_hộp.mp4',
      correctPhrase: 'Hồi hộp',
      options: ['Hồi', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/bối rối.mp4',
      correctPhrase: 'Bối rối',
      options: ['Bối', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/tự_tin.mp4',
      correctPhrase: 'Tự tin',
      options: ['Tự', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/lo_sợ.mp4',
      correctPhrase: 'Lo sợ',
      options: ['Lo', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/ghen_tị.mp4',
      correctPhrase: 'Ghen tị',
      options: ['Ghen', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/tuyệt_vọng.mp4',
      correctPhrase: 'Tuyệt vọng',
      options: ['Tuyệt', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/nghẹn_ngào.mp4',
      correctPhrase: 'Nghẹn ngào',
      options: ['Nghẹn', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/nổi_giận.mp4',
      correctPhrase: 'Nổi giận',
      options: ['Nổi', 'Vui', 'Buồn', 'Giận'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/giận_dỗi.mp4',
      correctPhrase: 'Giận dỗi',
      options: ['Giận', 'Vui', 'Buồn', 'Tự'],
    },
    {
      prompt: 'Điền từ còn thiếu',
      video: '/resources/videos/cô đơn.mp4',
      correctPhrase: 'Cô đơn',
      options: ['Cô', 'Vui', 'Buồn', 'Giận'],
    },
  ],
};


