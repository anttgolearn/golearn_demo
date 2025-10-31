import { MultipleChoiceSpec } from "./index";

export type MultipleChoiceQA = MultipleChoiceSpec;

export const MULTIPLE_CHOICE_QA: Record<string, MultipleChoiceQA[]> = {
  greetings: [
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/Chào.mp4',
      correctLabel: 'Chào',
      options: ['Chào', 'Tạm biệt', 'Xin lỗi', 'Cảm ơn'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/cảm ơn.mp4',
      correctLabel: 'Cảm ơn',
      options: ['Cảm ơn', 'Xin chào', 'Tạm biệt', 'Xin lỗi'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/xin lỗi.mp4',
      correctLabel: 'Xin lỗi',
      options: ['Xin lỗi', 'Chào', 'Cảm ơn'],
    },
  ],
  emotions: [
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/vui_mừng.mp4',
      correctLabel: 'Vui mừng',
      options: ['Vui mừng', 'Buồn thảm', 'Tự tin', 'Giận dữ'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/buồn thảm.mp4',
      correctLabel: 'Buồn thảm',
      options: ['Buồn thảm', 'Vui mừng', 'Tự tin', 'Giận dữ'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/giận_dữ.mp4',
      correctLabel: 'Giận dữ',
      options: ['Giận dữ', 'Tự tin', 'Bối rối'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/tự_tin.mp4',
      correctLabel: 'Tự tin',
      options: ['Tự tin', 'Vui mừng', 'Giận dữ'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/thích_thú.mp4',
      correctLabel: 'Thích thú',
      options: ['Thích thú', 'Ngạc nhiên', 'Buồn thảm'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/Ngạc_nhiên.mp4',
      correctLabel: 'Ngạc nhiên',
      options: ['Ngạc nhiên', 'Hoảng sợ', 'Vui mừng'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/hoảng_sợ.mp4',
      correctLabel: 'Hoảng sợ',
      options: ['Hoảng sợ', 'Ngạc nhiên', 'Giận dữ'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/hồi_hộp.mp4',
      correctLabel: 'Hồi hộp',
      options: ['Hồi hộp', 'Lo sợ', 'Bối rối'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/bối rối.mp4',
      correctLabel: 'Bối rối',
      options: ['Bối rối', 'Tự tin', 'Vui mừng'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/lo_sợ.mp4',
      correctLabel: 'Lo sợ',
      options: ['Lo sợ', 'Hoảng sợ', 'Buồn thảm'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/ghen_tị.mp4',
      correctLabel: 'Ghen tị',
      options: ['Ghen tị', 'Ghen ghét', 'Bối rối'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/tuyệt_vọng.mp4',
      correctLabel: 'Tuyệt vọng',
      options: ['Tuyệt vọng', 'Buồn thảm', 'Cô đơn'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/nghẹn_ngào.mp4',
      correctLabel: 'Nghẹn ngào',
      options: ['Nghẹn ngào', 'Bối rối', 'Buồn thảm'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/nổi_giận.mp4',
      correctLabel: 'Nổi giận',
      options: ['Nổi giận', 'Giận dữ', 'Tức tối'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/giận_dỗi.mp4',
      correctLabel: 'Giận dỗi',
      options: ['Giận dỗi', 'Giận dữ', 'Bối rối'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/cô đơn.mp4',
      correctLabel: 'Cô đơn',
      options: ['Cô đơn', 'Tuyệt vọng', 'Buồn thảm'],
    },
  ],
  numbers: [
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/số 1.mp4',
      correctLabel: 'Số 1',
      options: ['Số 1', 'Số 2', 'Số 3'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/số 2.mp4',
      correctLabel: 'Số 2',
      options: ['Số 1', 'Số 2', 'Số 3'],
    },
    {
      prompt: "Ký hiệu này có nghĩa là gì?",
      video: '/resources/videos/số 3.mp4',
      correctLabel: 'Số 3',
      options: ['Số 1', 'Số 2', 'Số 3'],
    },
  ],
};


