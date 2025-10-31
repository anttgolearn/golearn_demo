import { QAVideoItem, SingleChoiceSpec } from "./index";

export type SingleChoiceQA = SingleChoiceSpec;

const greetingsPool: Record<string, QAVideoItem> = {
  chao: { label: 'Xin Chào', video: '/resources/videos/Chào.mp4' },
  tamBiet: { label: 'Tạm biệt', video: '/resources/videos/tạm biệt.mp4' },
  camOn: { label: 'Cảm ơn', video: '/resources/videos/cảm ơn.mp4' },
  xinLoi: { label: 'Xin lỗi', video: '/resources/videos/xin lỗi.mp4' },
  xinChao: { label: 'Xin chào', video: '/resources/videos/Chào.mp4' },
};

const emotionsPool: Record<string, QAVideoItem> = {
  vuiMung: { label: 'Vui mừng', video: '/resources/videos/vui_mừng.mp4' },
  buonTham: { label: 'Buồn thảm', video: '/resources/videos/buồn thảm.mp4' },
  gianDu: { label: 'Giận dữ', video: '/resources/videos/giận_dữ.mp4' },
  tuTin: { label: 'Tự tin', video: '/resources/videos/tự_tin.mp4' },
  boiRoi: { label: 'Bối rối', video: '/resources/videos/bối rối.mp4' },
};

const numbersPool: Record<string, QAVideoItem> = {
  so1: { label: 'Số 1', video: '/resources/videos/số 1.mp4' },
  so2: { label: 'Số 2', video: '/resources/videos/số 2.mp4' },
  so3: { label: 'Số 3', video: '/resources/videos/số 3.mp4' },
};

export const SINGLE_CHOICE_QA: Record<string, SingleChoiceQA[]> = {
  greetings: [
    {
      prompt: "Video nào là từ 'Xin Chào'?",
      correct: greetingsPool.chao,
      distractors: [greetingsPool.tamBiet, greetingsPool.xinLoi],
    },
    {
      prompt: "Video nào là từ 'Tạm biệt'?",
      correct: greetingsPool.tamBiet,
      distractors: [greetingsPool.chao, greetingsPool.camOn],
    },
    {
      prompt: "Video nào thể hiện lời cảm ơn?",
      correct: greetingsPool.camOn,
      distractors: [greetingsPool.tamBiet, greetingsPool.xinLoi],
    },
    {
      prompt: "Video nào là từ 'Xin lỗi'?",
      correct: greetingsPool.xinLoi,
      distractors: [greetingsPool.camOn, greetingsPool.xinChao],
    },
    {
      prompt: "Video nào thể hiện lời chào thân mật?",
      correct: greetingsPool.xinChao,
      distractors: [greetingsPool.tamBiet, greetingsPool.camOn],
    },
  ],
  emotions: [
    {
      prompt: "Video nào thể hiện cảm xúc 'Vui mừng'?",
      correct: emotionsPool.vuiMung,
      distractors: [emotionsPool.buonTham, emotionsPool.boiRoi],
    },
    {
      prompt: "Video nào biểu đạt 'Buồn thảm'?",
      correct: emotionsPool.buonTham,
      distractors: [emotionsPool.vuiMung, emotionsPool.tuTin],
    },
    {
      prompt: "Video nào thể hiện cảm xúc 'Giận dữ'?",
      correct: emotionsPool.gianDu,
      distractors: [emotionsPool.tuTin, emotionsPool.vuiMung],
    },
    {
      prompt: "Video nào mô tả sự 'Tự tin'?",
      correct: emotionsPool.tuTin,
      distractors: [emotionsPool.buonTham, emotionsPool.gianDu],
    },
    {
      prompt: "Video nào nói về cảm xúc 'Bối rối'?",
      correct: emotionsPool.boiRoi,
      distractors: [emotionsPool.vuiMung, emotionsPool.tuTin],
    },
  ],
  numbers: [
    {
      prompt: "Video nào là số '1'?",
      correct: numbersPool.so1,
      distractors: [numbersPool.so2, numbersPool.so3],
    },
    {
      prompt: "Video nào là số '2'?",
      correct: numbersPool.so2,
      distractors: [numbersPool.so1, numbersPool.so3],
    },
    {
      prompt: "Video nào là số '3'?",
      correct: numbersPool.so3,
      distractors: [numbersPool.so1, numbersPool.so2],
    },
  ],
};


