import React, { useEffect, useState } from "react";
import { MirrorModal } from "../../components/molecules/MirrorModal";
import ContentPage from "../../components/organisms/ContentPage/ContentPage";
import { AnswerFeedbackPanel } from "../../components/molecules/AnswerFeedbackPanel";
import { QuizHeader } from "../../components/molecules/QuizHeader/QuizHeader";
import Question from "./children/question";
import { getLessonById } from "../../lib/lesson-structure";
import { HARDCODED_QUIZZES } from "../../lib/mock-lessons";
import { generateLessonContent } from "../../lib/lesson-content-generator";
import { buildQuizFromHardcoded, getRandomClozeTemplate } from "../../lib/quiz-builders";
import { IconicLearningWrapper } from "../../features/learning";
import { getCurrentChapterInfo } from "../../lib/lesson-navigation";

type Question = {
  id: string;
  type: "CONTENT" | "MULTIPLE_CHOICE" | "CLOZE_ANSWER";
  prompt: string;
  mediaUrl?: string;
  options?: string[];
  answer?: string;
  videoOptions?: Array<{
    label: string;
    videoSrc: string;
  }>;
};

type QuizScreenProps = {
  lessonId: string;
  onFinish?: (result: { correct: number; total: number }) => void;
};

export const QuizScreen: React.FC<QuizScreenProps> = ({ lessonId, onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | string[] | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [showMirror, setShowMirror] = useState(false);
  const [quizCategory, setQuizCategory] = useState<string>('Lesson');
  const total = questions.length || 1;

  // Detect if this is an iconic quiz
  const isIconicQuiz = lessonId.includes('-iconic');

  // Preload all potential video URLs to reduce playback latency between slides
  useEffect(() => {
    if (!questions.length) return;
    try {
      const urls: string[] = [];
      questions.forEach((q) => {
        if (q.mediaUrl) urls.push(q.mediaUrl);
        q.videoOptions?.forEach((vo) => {
          if (vo.videoSrc) urls.push(vo.videoSrc);
        });
      });
      // Deduplicate
      Array.from(new Set(urls)).forEach((src) => {
        const v = document.createElement('video');
        v.preload = 'auto';
        v.src = src;
      });
    } catch {
      // ignore preloading errors in non-browser environments
    }
  }, [questions]);

  useEffect(() => {
    // Guest allowance for discover & vocab
    if (["01_01_1-discover", "01_01_1-vokabel"].includes(lessonId)) {
      // allowed for guests; nothing to do here in this mock
    }
    
    let mock: Question[] = [];
    
    // Try to get lesson from structure first (to enable randomized generator)
    const lesson = getLessonById(lessonId);
    if (lesson) {
      // Generate content using the structured system without reordering
      const structuredQuestions = generateLessonContent(lessonId, lesson.type);
      mock = structuredQuestions.map(q => {
          // Normalize lowercase taxonomy to rendering types
          const qt = (q.type || '').toString();
          let renderType: "CONTENT" | "MULTIPLE_CHOICE" | "CLOZE_ANSWER" = "MULTIPLE_CHOICE";
          if (qt === 'CONTENT') renderType = 'CONTENT';
          else if (qt === 'single' || qt === 'SINGLE' || qt === 'MULTIPLE' || qt === 'multiple') renderType = 'MULTIPLE_CHOICE';
          else if (qt === 'CLOZE_ANSWER' || qt === 'cloze_answer') renderType = 'CLOZE_ANSWER';

          const hasAnyMedia = Array.isArray(q.answerOptions) && q.answerOptions.some(a => !!(a as any)?.media?.url);
          return ({
            id: q.id,
            type: renderType,
            prompt: q.prompt,
            mediaUrl: q.questionParts.find(p => p.type === 'video')?.url,
            options: q.answerOptions.map(a => a.label),
            answer: typeof q.correctAnswer === 'string' ? q.correctAnswer : '',
            videoOptions: hasAnyMedia
              ? q.answerOptions.map(a => ({
                  label: a.label,
                  videoSrc: a.media?.url || ''
                }))
              : undefined
          });
      });
    } else {
      // Allow overriding to force hardcoded via hash flag #use=hardcoded
      // Also force hardcoded for dialog practice
      const useHardcoded = (() => {
        try {
          const hash = window.location.hash || '';
          return /use=hardcoded/i.test(hash) || lessonId.includes('practice-dialog');
        } catch { return false; }
      })();
      const hard = HARDCODED_QUIZZES[lessonId];
      if (hard && useHardcoded) {
        mock = buildQuizFromHardcoded(lessonId) as any;
        setQuizCategory(hard.category || 'Lesson');
      } else {
      // Fallback to legacy mock data for compatibility
    if (lessonId.endsWith("-discover")) {
      // Greetings and Basic Communication
      const greetingQuestions: Array<Question> = [
        { 
          id: "d1", 
          type: "CONTENT", 
          prompt: "Học cách chào hỏi trong ngôn ngữ ký hiệu!" 
        },
        { 
          id: "d2", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu đúng cho 'Chào'!", 
          videoOptions: [
            { label: "Chào", videoSrc: "/resources/videos/Chào.mp4" },
            { label: "Tạm biệt", videoSrc: "/resources/videos/tạm biệt.mp4" }
          ],
          answer: "Chào" 
        },
        { 
          id: "d3", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu nào có nghĩa là 'Xin lỗi'?", 
          videoOptions: [
            { label: "Xin lỗi", videoSrc: "/resources/videos/xin lỗi.mp4" },
            { label: "Cảm ơn", videoSrc: "/resources/videos/cảm ơn.mp4" }
          ],
          answer: "Xin lỗi" 
        },
        { 
          id: "d4", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu 'Tạm biệt'!", 
          videoOptions: [
            { label: "Chào", videoSrc: "/resources/videos/Chào.mp4" },
            { label: "Tạm biệt", videoSrc: "/resources/videos/tạm biệt.mp4" }
          ],
          answer: "Tạm biệt" 
        },
      ];
      
      // Family and Relationships
      const familyQuestions: Array<Question> = [
        { 
          id: "f1", 
          type: "CONTENT", 
          prompt: "Học về các thành viên trong gia đình!" 
        },
        { 
          id: "f2", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu nào có nghĩa là 'Bố'?", 
          videoOptions: [
            { label: "Bố", videoSrc: "/resources/videos/bố.mp4" },
            { label: "Mẹ", videoSrc: "/resources/videos/mẹ.mp4" }
          ],
          answer: "Bố" 
        },
        { 
          id: "f3", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu 'Mẹ'!", 
          videoOptions: [
            { label: "Bố", videoSrc: "/resources/videos/bố.mp4" },
            { label: "Mẹ", videoSrc: "/resources/videos/mẹ.mp4" }
          ],
          answer: "Mẹ" 
        },
        { 
          id: "f4", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu 'Cha mẹ' là gì?", 
          videoOptions: [
            { label: "Cha mẹ", videoSrc: "/resources/videos/cha mẹ.mp4" },
            { label: "Bố mẹ", videoSrc: "/resources/videos/bố mẹ.mp4" }
          ],
          answer: "Cha mẹ" 
        },
      ];
      
      // Emotions and Feelings
      const emotionQuestions: Array<Question> = [
        { 
          id: "e1", 
          type: "CONTENT", 
          prompt: "Học cách biểu đạt cảm xúc!" 
        },
        { 
          id: "e2", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu nào thể hiện 'Vui mừng'?", 
          videoOptions: [
            { label: "Vui mừng", videoSrc: "/resources/videos/vui_mừng.mp4" },
            { label: "Buồn thảm", videoSrc: "/resources/videos/buồn thảm.mp4" }
          ],
          answer: "Vui mừng" 
        },
        { 
          id: "e3", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu 'Giận dữ'!", 
          videoOptions: [
            { label: "Giận dữ", videoSrc: "/resources/videos/giận_dữ.mp4" },
            { label: "Thích thú", videoSrc: "/resources/videos/thích_thú.mp4" }
          ],
          answer: "Giận dữ" 
        },
        { 
          id: "e4", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu 'Ngạc nhiên' là gì?", 
          videoOptions: [
            { label: "Ngạc nhiên", videoSrc: "/resources/videos/Ngạc_nhiên.mp4" },
            { label: "Hoảng sợ", videoSrc: "/resources/videos/hoảng_sợ.mp4" }
          ],
          answer: "Ngạc nhiên" 
        },
      ];
      
      // Animals
      const animalQuestions: Array<Question> = [
        { 
          id: "a1", 
          type: "CONTENT", 
          prompt: "Học về các loài động vật!" 
        },
        { 
          id: "a2", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu nào có nghĩa là 'Con chó'?", 
          videoOptions: [
            { label: "Con chó", videoSrc: "/resources/videos/con chó.mp4" },
            { label: "Con mèo", videoSrc: "/resources/videos/con mèo.mp4" }
          ],
          answer: "Con chó" 
        },
        { 
          id: "a3", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu 'Con mèo'!", 
          videoOptions: [
            { label: "Con chó", videoSrc: "/resources/videos/con chó.mp4" },
            { label: "Con mèo", videoSrc: "/resources/videos/con mèo.mp4" }
          ],
          answer: "Con mèo" 
        },
        { 
          id: "a4", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu 'Con gà' là gì?", 
          videoOptions: [
            { label: "Con gà", videoSrc: "/resources/videos/con gà.mp4" },
            { label: "Con chó", videoSrc: "/resources/videos/con chó.mp4" }
          ],
          answer: "Con gà" 
        },
      ];
      
      // Numbers
      const numberQuestions: Array<Question> = [
        { 
          id: "n1", 
          type: "CONTENT", 
          prompt: "Học về các con số!" 
        },
        { 
          id: "n2", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu nào có nghĩa là 'Số 1'?", 
          videoOptions: [
            { label: "Số 1", videoSrc: "/resources/videos/số 1.mp4" },
            { label: "Số 2", videoSrc: "/resources/videos/số 2.mp4" }
          ],
          answer: "Số 1" 
        },
        { 
          id: "n3", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu 'Số 2'!", 
          videoOptions: [
            { label: "Số 1", videoSrc: "/resources/videos/số 1.mp4" },
            { label: "Số 2", videoSrc: "/resources/videos/số 2.mp4" }
          ],
          answer: "Số 2" 
        },
        { 
          id: "n4", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu 'Số 3' là gì?", 
          videoOptions: [
            { label: "Số 3", videoSrc: "/resources/videos/số 3.mp4" },
            { label: "Số 1", videoSrc: "/resources/videos/số 1.mp4" }
          ],
          answer: "Số 3" 
        },
      ];
      
      // Food and Objects
      const foodObjectQuestions: Array<Question> = [
        { 
          id: "fo1", 
          type: "CONTENT", 
          prompt: "Học về thức ăn và đồ vật hàng ngày!" 
        },
        { 
          id: "fo2", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu nào có nghĩa là 'Cơm'?", 
          videoOptions: [
            { label: "Cơm", videoSrc: "/resources/videos/cơm.mp4" },
            { label: "Phở", videoSrc: "/resources/videos/Phở.mp4" }
          ],
          answer: "Cơm" 
        },
        { 
          id: "fo3", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Chọn ký hiệu 'Phở'!", 
          videoOptions: [
            { label: "Cơm", videoSrc: "/resources/videos/cơm.mp4" },
            { label: "Phở", videoSrc: "/resources/videos/Phở.mp4" }
          ],
          answer: "Phở" 
        },
        { 
          id: "fo4", 
          type: "MULTIPLE_CHOICE", 
          prompt: "Ký hiệu 'Quyển sách' là gì?", 
          videoOptions: [
            { label: "Quyển sách", videoSrc: "/resources/videos/Quyển sách.mp4" },
            { label: "Cây bút", videoSrc: "/resources/videos/cây bút.mp4" }
          ],
          answer: "Quyển sách" 
        },
      ];
      
      // Create questions following the pattern: 2 CONTENT → 2 MULTIPLE_CHOICE → 3 CONTENT → 3 MULTIPLE_CHOICE + 1 CLOZE
      const createPatternQuestions = () => {
        const arr: Question[] = [];
        
        // Collect all available templates by type
        const contentTemplates = [
          ...greetingQuestions.filter(q => q.type === "CONTENT"),
          ...familyQuestions.filter(q => q.type === "CONTENT"),
          ...emotionQuestions.filter(q => q.type === "CONTENT"),
          ...animalQuestions.filter(q => q.type === "CONTENT"),
          ...numberQuestions.filter(q => q.type === "CONTENT"),
          ...foodObjectQuestions.filter(q => q.type === "CONTENT")
        ];
        
        const multipleChoiceTemplates = [
          ...greetingQuestions.filter(q => q.type === "MULTIPLE_CHOICE"),
          ...familyQuestions.filter(q => q.type === "MULTIPLE_CHOICE"),
          ...emotionQuestions.filter(q => q.type === "MULTIPLE_CHOICE"),
          ...animalQuestions.filter(q => q.type === "MULTIPLE_CHOICE"),
          ...numberQuestions.filter(q => q.type === "MULTIPLE_CHOICE"),
          ...foodObjectQuestions.filter(q => q.type === "MULTIPLE_CHOICE")
        ];
        
        let questionId = 1;
        
        // 2 CONTENT
        for (let i = 0; i < 2; i++) {
          const template = contentTemplates[i % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `content-${questionId}`,
            prompt: template.prompt || "Học nội dung mới!"
          });
          questionId++;
        }
        
        // 2 MULTIPLE_CHOICE
        for (let i = 0; i < 2; i++) {
          const template = multipleChoiceTemplates[i % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `multiple-${questionId}`,
            prompt: template.prompt || "Chọn đáp án đúng!"
          });
          questionId++;
        }
        
        // 3 CONTENT
        for (let i = 0; i < 3; i++) {
          const template = contentTemplates[(i + 2) % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `content-${questionId}`,
            prompt: template.prompt || "Học nội dung mới!"
          });
          questionId++;
        }
        
        // 3 MULTIPLE_CHOICE
        for (let i = 0; i < 3; i++) {
          const template = multipleChoiceTemplates[(i + 2) % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `multiple-${questionId}`,
            prompt: template.prompt || "Chọn đáp án đúng!"
          });
          questionId++;
        }
        
        // 1 CLOZE
        const clozeTemplate = getRandomClozeTemplate("greetings");
        arr.push({
          id: `cloze-${questionId}`,
          type: "CLOZE_ANSWER",
          prompt: `Điền từ còn thiếu: ${clozeTemplate.sentence}`,
          options: clozeTemplate.options,
          answer: clozeTemplate.answer
        });
        
        return arr;
      };
      
      mock = createPatternQuestions();
    } else if (lessonId.endsWith("-vokabel")) {
      // Vocabulary learning following the pattern: 2 CONTENT → 2 MULTIPLE_CHOICE → 3 CONTENT → 3 MULTIPLE_CHOICE + 1 CLOZE
      const createVocabPatternQuestions = () => {
        const arr: Question[] = [];
        
        // Content templates for vocabulary
        const contentTemplates: Question[] = [
          { 
            id: "vc1", 
            type: "CONTENT", 
            prompt: "Học từ vựng về thời tiết và mùa trong năm!" 
          },
          { 
            id: "vc2", 
            type: "CONTENT", 
            prompt: "Học về các mùa trong năm!" 
          },
          { 
            id: "vc3", 
            type: "CONTENT", 
            prompt: "Học từ vựng về thời tiết!" 
          }
        ];
        
        // Multiple choice templates for vocabulary
        const multipleChoiceTemplates: Question[] = [
          { 
            id: "vm1", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu nào có nghĩa là 'Mùa hè'?", 
            videoOptions: [
              { label: "Mùa hè", videoSrc: "/resources/videos/Mùa hè.mp4" },
              { label: "Mùa đông", videoSrc: "/resources/videos/Mùa đông.mp4" }
            ],
            answer: "Mùa hè" 
          },
          { 
            id: "vm2", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Chọn ký hiệu 'Mùa đông'!", 
            videoOptions: [
              { label: "Mùa hè", videoSrc: "/resources/videos/Mùa hè.mp4" },
              { label: "Mùa đông", videoSrc: "/resources/videos/Mùa đông.mp4" }
            ],
            answer: "Mùa đông" 
          },
          { 
            id: "vm3", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu 'Mùa thu' là gì?", 
            videoOptions: [
              { label: "Mùa thu", videoSrc: "/resources/videos/mùa thu.mp4" },
              { label: "Mùa hè", videoSrc: "/resources/videos/Mùa hè.mp4" }
            ],
            answer: "Mùa thu" 
          },
          { 
            id: "vm4", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu 'Mưa phùn' là gì?", 
            videoOptions: [
              { label: "Mưa phùn", videoSrc: "/resources/videos/mưa phùn.mp4" },
              { label: "Sáng", videoSrc: "/resources/videos/sáng.mp4" }
            ],
            answer: "Mưa phùn" 
          },
          { 
            id: "vm5", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Chọn ký hiệu 'Mùa xuân'!", 
            videoOptions: [
              { label: "Mùa xuân", videoSrc: "/resources/videos/mùa xuân.mp4" },
              { label: "Mùa đông", videoSrc: "/resources/videos/Mùa đông.mp4" }
            ],
            answer: "Mùa xuân" 
          }
        ];
        
        let questionId = 1;
        
        // 2 CONTENT
        for (let i = 0; i < 2; i++) {
          const template = contentTemplates[i % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `vocab-content-${questionId}`,
            prompt: template.prompt
          });
          questionId++;
        }
        
        // 2 MULTIPLE_CHOICE
        for (let i = 0; i < 2; i++) {
          const template = multipleChoiceTemplates[i % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `vocab-multiple-${questionId}`,
            prompt: template.prompt,
            videoOptions: template.videoOptions,
            answer: template.answer
          });
          questionId++;
        }
        
        // 3 CONTENT
        for (let i = 0; i < 3; i++) {
          const template = contentTemplates[(i + 2) % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `vocab-content-${questionId}`,
            prompt: template.prompt
          });
          questionId++;
        }
        
        // 3 MULTIPLE_CHOICE
        for (let i = 0; i < 3; i++) {
          const template = multipleChoiceTemplates[(i + 2) % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `vocab-multiple-${questionId}`,
            prompt: template.prompt,
            videoOptions: template.videoOptions,
            answer: template.answer
          });
          questionId++;
        }
        
        // 1 CLOZE
        const vocabClozeTemplate = getRandomClozeTemplate("general");
        arr.push({
          id: `vocab-cloze-${questionId}`,
          type: "CLOZE_ANSWER",
          prompt: `Điền từ còn thiếu: ${vocabClozeTemplate.sentence}`,
          options: vocabClozeTemplate.options,
          answer: vocabClozeTemplate.answer
        });
        
        return arr;
      };
      
      mock = createVocabPatternQuestions();
    } else if (lessonId.includes("practice")) {
      // Practice questions following the pattern: 2 CONTENT → 2 MULTIPLE_CHOICE → 3 CONTENT → 3 MULTIPLE_CHOICE + 1 CLOZE
      const createPracticePatternQuestions = () => {
        const arr: Question[] = [];
        
        // Content templates for practice
        const contentTemplates: Question[] = [
          { 
            id: "pc1", 
            type: "CONTENT", 
            prompt: "Ôn tập các ký hiệu đã học!" 
          },
          { 
            id: "pc2", 
            type: "CONTENT", 
            prompt: "Luyện tập kỹ năng ký hiệu!" 
          },
          { 
            id: "pc3", 
            type: "CONTENT", 
            prompt: "Củng cố kiến thức đã học!" 
          }
        ];
        
        // Multiple choice templates for practice
        const multipleChoiceTemplates: Question[] = [
          { 
            id: "pm1", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu nào có nghĩa là 'Cô giáo'?", 
            videoOptions: [
              { label: "Cô giáo", videoSrc: "/resources/videos/cô giáo.mp4" },
              { label: "Bảng học sinh", videoSrc: "/resources/videos/bảng học sinh.mp4" }
            ],
            answer: "Cô giáo" 
          },
          { 
            id: "pm2", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Chọn ký hiệu 'Đàn ghi ta'!", 
            videoOptions: [
              { label: "Đàn ghi ta", videoSrc: "/resources/videos/đàn ghi ta.mp4" },
              { label: "Ô tô", videoSrc: "/resources/videos/ô tô.mp4" }
            ],
            answer: "Đàn ghi ta" 
          },
          { 
            id: "pm3", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu 'Xe máy' là gì?", 
            videoOptions: [
              { label: "Xe máy", videoSrc: "/resources/videos/xe máy.mp4" },
              { label: "Tàu hỏa", videoSrc: "/resources/videos/tàu hỏa.mp4" }
            ],
            answer: "Xe máy" 
          },
          { 
            id: "pm4", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu 'Đá bóng' là gì?", 
            videoOptions: [
              { label: "Đá bóng", videoSrc: "/resources/videos/đá bóng.mp4" },
              { label: "Giấc ngủ", videoSrc: "/resources/videos/giấc ngủ.mp4" }
            ],
            answer: "Đá bóng" 
          },
          { 
            id: "pm5", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Chọn ký hiệu 'Học tập'!", 
            videoOptions: [
              { label: "Học tập", videoSrc: "/resources/videos/học tập.mp4" },
              { label: "Vui chơi", videoSrc: "/resources/videos/vui chơi.mp4" }
            ],
            answer: "Học tập" 
          }
        ];
        
        let questionId = 1;
        
        // 2 CONTENT
        for (let i = 0; i < 2; i++) {
          const template = contentTemplates[i % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `practice-content-${questionId}`,
            prompt: template.prompt
          });
          questionId++;
        }
        
        // 2 MULTIPLE_CHOICE
        for (let i = 0; i < 2; i++) {
          const template = multipleChoiceTemplates[i % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `practice-multiple-${questionId}`,
            prompt: template.prompt,
            videoOptions: template.videoOptions,
            answer: template.answer
          });
          questionId++;
        }
        
        // 3 CONTENT
        for (let i = 0; i < 3; i++) {
          const template = contentTemplates[(i + 2) % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `practice-content-${questionId}`,
            prompt: template.prompt
          });
          questionId++;
        }
        
        // 3 MULTIPLE_CHOICE
        for (let i = 0; i < 3; i++) {
          const template = multipleChoiceTemplates[(i + 2) % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `practice-multiple-${questionId}`,
            prompt: template.prompt,
            videoOptions: template.videoOptions,
            answer: template.answer
          });
          questionId++;
        }
        
        // 1 CLOZE
        const practiceClozeTemplate = getRandomClozeTemplate("general");
        arr.push({
          id: `practice-cloze-${questionId}`,
          type: "CLOZE_ANSWER",
          prompt: `Điền từ còn thiếu: ${practiceClozeTemplate.sentence}`,
          options: practiceClozeTemplate.options,
          answer: practiceClozeTemplate.answer
        });
        
        return arr;
      };
      
      mock = createPracticePatternQuestions();
    } else if (lessonId.includes("milestone")) {
      // Milestone questions following the pattern: 2 CONTENT → 2 MULTIPLE_CHOICE → 3 CONTENT → 3 MULTIPLE_CHOICE + 1 CLOZE
      const createMilestonePatternQuestions = () => {
        const arr: Question[] = [];
        
        // Content templates for milestone
        const contentTemplates: Question[] = [
          { 
            id: "mc1", 
            type: "CONTENT", 
            prompt: "Kiểm tra kiến thức tổng hợp! (Milestone Test)" 
          },
          { 
            id: "mc2", 
            type: "CONTENT", 
            prompt: "Đánh giá khả năng ký hiệu của bạn!" 
          },
          { 
            id: "mc3", 
            type: "CONTENT", 
            prompt: "Thử thách cuối cùng!" 
          }
        ];
        
        // Multiple choice templates for milestone
        const multipleChoiceTemplates: Question[] = [
          { 
            id: "mm1", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu nào có nghĩa là 'Tự tin'?", 
            videoOptions: [
              { label: "Tự tin", videoSrc: "/resources/videos/tự_tin.mp4" },
              { label: "Lo sợ", videoSrc: "/resources/videos/lo_sợ.mp4" }
            ],
            answer: "Tự tin" 
          },
          { 
            id: "mm2", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Chọn ký hiệu 'Hồi hộp'!", 
            videoOptions: [
              { label: "Hồi hộp", videoSrc: "/resources/videos/hồi_hộp.mp4" },
              { label: "Bối rối", videoSrc: "/resources/videos/bối rối.mp4" }
            ],
            answer: "Hồi hộp" 
          },
          { 
            id: "mm3", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu 'Ghen tị' là gì?", 
            videoOptions: [
              { label: "Ghen tị", videoSrc: "/resources/videos/ghen_tị.mp4" },
              { label: "Thích thú", videoSrc: "/resources/videos/thích_thú.mp4" }
            ],
            answer: "Ghen tị" 
          },
          { 
            id: "mm4", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Ký hiệu 'Tuyệt vọng' là gì?", 
            videoOptions: [
              { label: "Tuyệt vọng", videoSrc: "/resources/videos/tuyệt_vọng.mp4" },
              { label: "Nghẹn ngào", videoSrc: "/resources/videos/nghẹn_ngào.mp4" }
            ],
            answer: "Tuyệt vọng" 
          },
          { 
            id: "mm5", 
            type: "MULTIPLE_CHOICE", 
            prompt: "Chọn ký hiệu 'Hy vọng'!", 
            videoOptions: [
              { label: "Hy vọng", videoSrc: "/resources/videos/hy_vọng.mp4" },
              { label: "Thất vọng", videoSrc: "/resources/videos/thất_vọng.mp4" }
            ],
            answer: "Hy vọng" 
          }
        ];
        
        let questionId = 1;
        
        // 2 CONTENT
        for (let i = 0; i < 2; i++) {
          const template = contentTemplates[i % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `milestone-content-${questionId}`,
            prompt: template.prompt
          });
          questionId++;
        }
        
        // 2 MULTIPLE_CHOICE
        for (let i = 0; i < 2; i++) {
          const template = multipleChoiceTemplates[i % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `milestone-multiple-${questionId}`,
            prompt: template.prompt,
            videoOptions: template.videoOptions,
            answer: template.answer
          });
          questionId++;
        }
        
        // 3 CONTENT
        for (let i = 0; i < 3; i++) {
          const template = contentTemplates[(i + 2) % contentTemplates.length];
          arr.push({ 
            ...template, 
            id: `milestone-content-${questionId}`,
            prompt: template.prompt
          });
          questionId++;
        }
        
        // 3 MULTIPLE_CHOICE
        for (let i = 0; i < 3; i++) {
          const template = multipleChoiceTemplates[(i + 2) % multipleChoiceTemplates.length];
          arr.push({ 
            ...template, 
            id: `milestone-multiple-${questionId}`,
            prompt: template.prompt,
            videoOptions: template.videoOptions,
            answer: template.answer
          });
          questionId++;
        }
        
        // 1 CLOZE
        const milestoneClozeTemplate = getRandomClozeTemplate("emotions");
        arr.push({
          id: `milestone-cloze-${questionId}`,
          type: "CLOZE_ANSWER",
          prompt: `Điền từ còn thiếu: ${milestoneClozeTemplate.sentence}`,
          options: milestoneClozeTemplate.options,
          answer: milestoneClozeTemplate.answer
        });
        
        return arr;
      };
      
      mock = createMilestonePatternQuestions();
    } else {
      mock = [ { id: "c1", type: "CONTENT", prompt: "Slide nội dung" } ];
      }
    }
    }
    
    // Ensure at least 10 slides by padding with repeated or fallback CONTENT slides
    const MIN_SLIDES = 10;
    let finalized: Question[] = mock.slice();
    if (finalized.length === 0) {
      finalized = Array.from({ length: MIN_SLIDES }).map((_, i) => ({
        id: `c-fallback-${i + 1}`,
        type: "CONTENT",
        prompt: "Slide nội dung",
      }));
    } else if (finalized.length < MIN_SLIDES) {
      const needed = MIN_SLIDES - finalized.length;
      for (let i = 0; i < needed; i++) {
        const template = finalized[i % finalized.length];
        // Create a safe duplicate with unique id; keep content
        finalized.push({
          ...template,
          id: `${template.id}-x${i + 1}`,
        });
      }
    }
    setQuestions(finalized);
    // Support direct navigation to a specific question: /quiz/<id>/questions/<n>
    try {
      const hash = window.location.hash || '';
      const match = hash.match(/#\/quiz\/([^/]+)\/questions\/(\d+)/);
      if (match && match[1] && match[2]) {
        const targetId = decodeURIComponent(match[1]);
        const qIndex = Math.max(0, Math.min(Number(match[2]) - 1, mock.length - 1));
        if (targetId === lessonId) {
          setIndex(qIndex);
        }
      }
    } catch {
      // ignore malformed hash
    }
  }, [lessonId]);

  useEffect(() => {
    setSelected(null);
  }, [index]);

  const current = questions[index];

  const confirm = () => {
    if (!current) return;
    
    // For CONTENT type, just advance to next slide without scoring
    if (current.type === "CONTENT") {
      if (index < total - 1) {
        setIndex((i) => i + 1);
      } else {
        setFinished(true);
        onFinish?.({ correct: correctCount, total });
      }
      return;
    }
    
    // For MULTIPLE_CHOICE inside discover flow, first click acts as Check, second as Next
    if (current.type === "MULTIPLE_CHOICE") {
      if (!showResult) {
        if (!selected) return;
        let ok = false;
        const safeNormalize = (s: any) => (typeof s === 'string'
          ? s.toLowerCase().trim()
          : '');
        if (Array.isArray(current.answer)) {
          const toSet = (arr: any[]) => new Set((arr || []).map(safeNormalize));
          const ans = toSet(current.answer as any);
          const sel = Array.isArray(selected) ? toSet(selected as any) : toSet([selected as any]);
          ok = ans.size === sel.size && [...ans].every(a => sel.has(a));
        } else {
          ok = safeNormalize(selected) === safeNormalize(current.answer);
        }
        setIsCorrect(ok);
        setShowResult(true);
        if (ok) setCorrectCount((c) => c + 1);
        return;
      }
    }
    // For CLOZE_ANSWER, compare normalized input
    if (current.type === "CLOZE_ANSWER") {
      if (!showResult) {
        if (!selected) return;
        const safeNormalize = (s: any) => (typeof s === 'string'
          ? s.toLowerCase().trim()
          : '');
        const normalizedSelected = safeNormalize(selected);
        const normalizedAnswer = safeNormalize(current.answer || '');
        const ok = normalizedSelected === normalizedAnswer;
        setIsCorrect(ok);
        setShowResult(true);
        if (ok) setCorrectCount((c) => c + 1);
        return;
      }
    }
    // Advance to next or finish
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
      setIsCorrect(null);
    } else {
      const add = current.type === "MULTIPLE_CHOICE" && !showResult
        ? (selected && selected === current.answer ? 1 : 0)
        : 0;
      setFinished(true);
      onFinish?.({ correct: correctCount + add, total });
    }
  };

  if (!current) return <div className="p-4">Đang tải...</div>;

  {
    if (finished) {
      const percent = Math.round((correctCount / total) * 100);
      return (
        <div className="min-h-screen bg-gray-100">
          <div className="w-full max-w-5xl mx-auto px-4 py-8" data-testid="result-screen-container">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold mb-2">{percent}%</div>
              <div className="text-lg text-gray-700 mb-6">{percent >= 80 ? 'Tuyệt vời!' : 'Bạn gần đạt rồi!'}</div>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-base text-gray-700">
                  {percent >= 80 ? 'Bạn đã hoàn thành bài học.' : 'Hãy thử lại để đạt trên 80% và hoàn thành bài học.'}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  aria-label="Làm lại bài học"
                  className="px-6 py-3 rounded-lg border bg-white hover:bg-gray-50 text-gray-900 shadow-sm"
                  data-testid="button-panel-primary-action"
                  onClick={() => {
                    setFinished(false);
                    setIndex(0);
                    setSelected(null);
                    setShowResult(false);
                    setIsCorrect(null);
                    setCorrectCount(0);
                  }}
                >
                  Làm lại bài
                </button>
                <button
                  aria-label="Tiếp tục"
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
                  data-testid="button-panel-tertiary-action"
                  onClick={() => {
                    setFinished(false);
                    setIndex(0);
                    setSelected(null);
                    setShowResult(false);
                    setIsCorrect(null);
                    setCorrectCount(0);
                  }}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Render iconic quiz with special UI
    if (isIconicQuiz) {
      return (
        <IconicLearningWrapper
          lessonId={lessonId}
          onComplete={(score, timeSpent) => {
            console.log(`Iconic quiz completed with score: ${score}, time: ${timeSpent}s`);
            onFinish?.({ correct: score, total: 5 }); // Assuming 5 questions for iconic quiz
          }}
          onClose={() => {
            onFinish?.({ correct: 0, total: 1 }); // Exit without completion
          }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="w-full max-w-5xl mx-auto px-4 py-4" data-testid="quiz-screen-container">
          {/* Quiz Header */}
          <QuizHeader
            currentIndex={index}
            totalQuestions={total}
            onMenuClick={() => {}}
            onSpeedClick={() => {}}
            onExitLesson={() => {
              try {
                const info = getCurrentChapterInfo(lessonId);
                if (info && typeof info.unitId === 'number' && typeof info.chapterId === 'number') {
                  // Convert (unitId, chapterId) to global chapter index used by ChapterOverviewScreen
                  // ChapterOverviewScreen maps: 1_1 -> 1, 1_2 -> 2, 2_1 -> 3, 2_2 -> 4, ...
                  const globalChapterIndex = (info.unitId - 1) * 2 + info.chapterId;
                  window.location.hash = `#/chapter/${globalChapterIndex}`;
                } else {
                  window.location.hash = "#/chapter/1";
                }
              } catch {
                window.location.hash = "#/chapter/1";
              }
            }}
          />

          {/* Content area */}
          <div className="mt-6">
            {/* CONTENT slides */}
            {current.type === "CONTENT" && (
              <ContentPage
                prompt={current.prompt || 'Học ký hiệu mới!'}
                isLast={index === total - 1}
                onContinue={confirm}
                mediaUrl={current.mediaUrl}
                onMirrorClick={() => setShowMirror(true)}
              />
            )}

            {/* NON-CONTENT slides (Question) */}
            {current.type !== "CONTENT" && current.type !== "CLOZE_ANSWER" && (
              <Question
                prompt={current.prompt}
                type={current.type}
                mediaUrl={current.mediaUrl}
                options={current.options}
                videoOptions={current.videoOptions}
                selected={Array.isArray(selected) ? selected : selected}
                onSelect={(label) => setSelected(label)}
                showResult={showResult}
                correctAnswer={current.answer}
                multiSelect={Array.isArray(current.answer)}
                correctAnswers={Array.isArray(current.answer) ? (current.answer as any) : undefined}
                onSelectMulti={(labels) => setSelected(labels as any)}
                buttonText={current.type === 'MULTIPLE_CHOICE' ? (showResult ? (index === total - 1 ? 'Hoàn thành' : 'Tiếp theo') : 'Kiểm tra') : (index === total - 1 ? 'Hoàn thành' : 'Tiếp theo')}
                onButtonClick={confirm}
                buttonDisabled={
                  current.type === 'MULTIPLE_CHOICE' && !showResult && (
                    Array.isArray(current.answer)
                      ? !(Array.isArray(selected) && (selected as string[]).length === (current.answer as any[]).length)
                      : !selected
                  )
                }
                onMirrorClick={() => setShowMirror(true)}
              />
            )}

            {/* Dialog Quiz - Hội thoại + Cloze Question */}
            {quizCategory === 'Dialog' && current.type === "CLOZE_ANSWER" && (
              <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
                <div className="w-full max-w-6xl mx-auto p-4">
                  {/* Dialog Header */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
                      💬 Hội thoại
                    </h2>
                    <div className="text-center text-gray-600 mb-6 text-lg">
                      {current.prompt}
                    </div>
                    
                    {/* Dialog Videos Section */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                          Xem hội thoại
                        </h3>
                        <div className="text-sm text-gray-500">
                          Person A ↔ Person B
                        </div>
                      </div>

                      {/* Video Container */}
                      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-6">
                        <div className="p-8 text-center">
                          <div className="text-6xl mb-4">🎬</div>
                          <div className="text-lg text-gray-600 mb-2">
                            Video hội thoại sẽ được phát ở đây
                          </div>
                          <div className="text-sm text-gray-500">
                            Person A: "Chào bạn!" → Person B: "Chào! Rất vui được gặp bạn." → Person A: "Cảm ơn bạn!"
                          </div>
                        </div>
                      </div>

                      {/* Dialog Participants */}
                      <div className="flex justify-center gap-8 mb-6">
                        <div className="text-center p-4 rounded-lg bg-purple-100 border-2 border-purple-300">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                            A
                          </div>
                          <div className="text-sm font-medium text-gray-700">Person A</div>
                        </div>
                        
                        <div className="text-center p-4 rounded-lg bg-indigo-100 border-2 border-indigo-300">
                          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                            B
                          </div>
                          <div className="text-sm font-medium text-gray-700">Person B</div>
                        </div>
                      </div>
                    </div>

                    {/* Cloze Question Section */}
                    <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4 text-center">
                        📝 Điền từ còn thiếu
                      </h3>
                      <div className="text-center text-gray-700 mb-6">
                        Sau khi xem hội thoại, hãy điền từ còn thiếu:
                      </div>
                      
                      {/* Cloze Question */}
                      <div className="bg-white rounded-lg p-4 border border-purple-300">
                        <div className="text-center text-xl font-medium text-gray-800 mb-4">
                          {current.prompt || "Chào ___!"}
                        </div>
                        <div className="text-center text-sm text-gray-500 mb-6">
                          Chọn từ đúng để điền vào chỗ trống
                        </div>
                        
                        {/* Answer Options */}
                        <div className="space-y-3">
                          {current.options?.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelected(option)}
                              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                selected === option
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                  selected === option
                                    ? 'border-purple-500 bg-purple-500'
                                    : 'border-gray-300'
                                }`}>
                                  {selected === option && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1 font-medium text-gray-800">
                                  {option}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setIndex(Math.max(0, index - 1))}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      ← Quay lại
                    </button>

                    <div className="flex gap-4">
                      <button
                        onClick={confirm}
                        disabled={!selected}
                        className="px-8 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {showResult ? (index === total - 1 ? 'Hoàn thành' : 'Tiếp theo') : 'Kiểm tra'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CLOZE ANSWER slides - Non-Dialog */}
            {current.type === "CLOZE_ANSWER" && quizCategory !== 'Dialog' && (
              <Question
                prompt={current.prompt}
                type={current.type}
                mediaUrl={current.mediaUrl}
                options={current.options}
                selected={selected}
                onSelect={(value) => {
                  setSelected(value);
                }}
                showResult={showResult}
                correctAnswer={current.answer}
                buttonText={showResult ? (index === total - 1 ? 'Hoàn thành' : 'Tiếp theo') : 'Kiểm tra'}
                onButtonClick={confirm}
                buttonDisabled={!selected || showResult}
              />
            )}
          </div>


          {/* Answer Feedback Panel */}
          {showResult && (current.type === 'MULTIPLE_CHOICE' || current.type === 'CLOZE_ANSWER') && (
            <AnswerFeedbackPanel
              isCorrect={isCorrect || false}
              onNext={confirm}
            />
          )}
        </div>

        {/* Mirror Modal */}
        <MirrorModal
          isOpen={showMirror}
          onClose={() => setShowMirror(false)}
          signText={current.type === "CONTENT" ? "HELLO" : (current.options?.[0] || "SIGN")}
          videoSrc={current.mediaUrl}
        />
      </div>
    );
  }
};

export default QuizScreen;


