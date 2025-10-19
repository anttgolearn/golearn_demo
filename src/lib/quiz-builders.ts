import { HARDCODED_QUIZZES } from "./mock-lessons";

// CLOZE question templates
export const CLOZE_TEMPLATES = {
  greetings: [
    {
      sentence: "___ bạn!",
      options: ["Chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
      answer: "Chào",
      context: "Chào hỏi"
    },
    {
      sentence: "Tạm biệt ___!",
      options: ["bạn", "tôi", "anh", "chị"],
      answer: "bạn",
      context: "Chào tạm biệt"
    },
    {
      sentence: "Cảm ơn ___!",
      options: ["bạn", "tôi", "anh", "chị"],
      answer: "bạn",
      context: "Cảm ơn"
    },
    {
      sentence: "Xin lỗi ___!",
      options: ["bạn", "tôi", "anh", "chị"],
      answer: "bạn",
      context: "Xin lỗi"
    }
  ],
  family: [
    {
      sentence: "Đây là ___ của tôi.",
      options: ["gia đình", "bạn bè", "trường học", "công việc"],
      answer: "gia đình",
      context: "Gia đình"
    },
    {
      sentence: "Mẹ tôi tên là ___.",
      options: ["Lan", "Nam", "Hùng", "Mai"],
      answer: "Lan",
      context: "Tên mẹ"
    },
    {
      sentence: "Bố tôi là ___.",
      options: ["bác sĩ", "giáo viên", "kỹ sư", "công nhân"],
      answer: "bác sĩ",
      context: "Nghề nghiệp bố"
    }
  ],
  numbers: [
    {
      sentence: "Tôi có ___ quyển sách.",
      options: ["một", "hai", "ba", "bốn"],
      answer: "một",
      context: "Số đếm"
    },
    {
      sentence: "Trong lớp có ___ học sinh.",
      options: ["mười", "hai mươi", "ba mươi", "bốn mươi"],
      answer: "mười",
      context: "Số lượng"
    }
  ],
  emotions: [
    {
      sentence: "Tôi cảm thấy ___ hôm nay.",
      options: ["vui", "buồn", "mệt", "khỏe"],
      answer: "vui",
      context: "Cảm xúc"
    },
    {
      sentence: "Bạn có ___ không?",
      options: ["khỏe", "mệt", "vui", "buồn"],
      answer: "khỏe",
      context: "Hỏi thăm sức khỏe"
    }
  ],
  general: [
    {
      sentence: "Hôm nay trời ___ và nắng.",
      options: ["đẹp", "xấu", "lạnh", "nóng"],
      answer: "đẹp",
      context: "Thời tiết"
    },
    {
      sentence: "Tôi thích ___ với bạn bè.",
      options: ["chơi", "học", "ăn", "ngủ"],
      answer: "chơi",
      context: "Sở thích"
    },
    {
      sentence: "Tôi cảm thấy ___ về tương lai.",
      options: ["hy vọng", "lo lắng", "thất vọng", "tự tin"],
      answer: "hy vọng",
      context: "Cảm nghĩ"
    },
    {
      sentence: "Tôi đang ___ tiếng Việt.",
      options: ["học", "dạy", "nói", "viết"],
      answer: "học",
      context: "Học tập"
    },
    {
      sentence: "Bạn có ___ không?",
      options: ["thời gian", "tiền", "bạn bè", "gia đình"],
      answer: "thời gian",
      context: "Hỏi thăm"
    }
  ],
  colors: [
    {
      sentence: "Màu ___ là màu tôi thích nhất.",
      options: ["xanh", "đỏ", "vàng", "tím"],
      answer: "xanh",
      context: "Màu sắc"
    },
    {
      sentence: "Áo của tôi màu ___.",
      options: ["trắng", "đen", "xám", "nâu"],
      answer: "trắng",
      context: "Màu áo"
    }
  ],
  time: [
    {
      sentence: "Bây giờ là ___ giờ.",
      options: ["mười", "mười một", "mười hai", "một"],
      answer: "mười",
      context: "Thời gian"
    },
    {
      sentence: "Tôi thức dậy lúc ___ giờ sáng.",
      options: ["sáu", "bảy", "tám", "chín"],
      answer: "sáu",
      context: "Thức dậy"
    }
  ]
};

export function getRandomClozeTemplate(category?: string): typeof CLOZE_TEMPLATES.greetings[0] {
  const templates = category && CLOZE_TEMPLATES[category as keyof typeof CLOZE_TEMPLATES] 
    ? CLOZE_TEMPLATES[category as keyof typeof CLOZE_TEMPLATES]
    : Object.values(CLOZE_TEMPLATES).flat();
  
  return templates[Math.floor(Math.random() * templates.length)];
}

export type BuiltQuestion = {
  id: string;
  type: "CONTENT" | "MULTIPLE_CHOICE" | "SINGLE" | "MULTIPLE" | "CLOZE_ANSWER";
  prompt: string;
  mediaUrl?: string;
  options?: string[];
  answer?: string;
  videoOptions?: Array<{ label: string; videoSrc: string }>;
  // Optional cloze fields if needed later
  isTyping?: boolean;
  gapParts?: string[];
  // Dialog specific fields
  questionParts?: Array<{
    type: 'video' | 'text' | 'image';
    url?: string;
    content?: string;
    caption?: string;
    dialogPerson?: 'a' | 'b';
  }>;
};

function needsMilestoneIntro(quizId: string): boolean {
  return quizId.includes("milestone");
}

function needsUnitIntro(_quizId: string): boolean {
  // Discover usually does not inject special intro; keep intro disabled here
  return false;
}

function injectIntroSlides(quizId: string, questions: BuiltQuestion[]): BuiltQuestion[] {
  const result = questions.slice();
  if (needsMilestoneIntro(quizId)) {
    result.unshift({
      id: `${quizId}-intro-milestone`,
      type: "CONTENT",
      prompt: "Giới thiệu Milestone",
    });
  }
  if (needsUnitIntro(quizId)) {
    result.unshift({
      id: `${quizId}-intro-unit`,
      type: "CONTENT",
      prompt: "Giới thiệu Unit",
    });
  }
  return result;
}

export function buildQuizFromHardcoded(quizId: string): BuiltQuestion[] {
  const hard = HARDCODED_QUIZZES[quizId];
  if (!hard) return [];

  // Preserve order from hardcoded payload; map to UI model
  const mapped: BuiltQuestion[] = hard.questions.map((q: any) => {
    if (q.type === "content") {
      const videoPart = (q.questionParts || []).find((p: any) => p.type === "video");
      return {
        id: String(q.id),
        type: "CONTENT",
        prompt: q.title || q.questionParts?.[0]?.content || "",
        mediaUrl: videoPart?.url,
      };
    }

    // SINGLE/MULTIPLE mapped to MULTIPLE_CHOICE UI for now
    const opts = (q.answerOptions || [])
      .map((a: any) => a.media?.label)
      .filter(Boolean) as string[];
    const correct = (q.answerOptions || []).find((a: any) => a.isCorrect)?.media?.label || "";
    const videoOptions = (q.answerOptions || [])
      .filter((a: any) => a.media?.type === "video")
      .map((a: any) => ({ label: a.media!.label || "", videoSrc: a.media!.url }));
    const base: BuiltQuestion = {
      id: String(q.id),
      type: (q.type === "single" || q.type === "multiple") ? "MULTIPLE_CHOICE" : (q.type === "cloze_answer" ? "CLOZE_ANSWER" : "MULTIPLE_CHOICE"),
      prompt: q.prompt || q.title || "",
      options: opts.length ? opts : undefined,
      answer: correct,
      videoOptions: videoOptions.length ? videoOptions : undefined,
    };
    if (q.type === "cloze_answer") {
      // minimal cloze flags; can be enhanced later
      base.isTyping = Array.isArray(q.hint) ? (q.hint.length <= 1) : false;
      // Pass hints as options for cloze questions
      base.options = q.hint || [];
      // Set correct answer from answerOptions
      const correctOption = (q.answerOptions || []).find((a: any) => a.isCorrect);
      if (correctOption) {
        base.answer = correctOption.answerText || correctOption.label || '';
      }
      
      // Handle dialog questions - preserve questionParts with dialogPerson
      if (q.questionParts && q.questionParts.length > 0) {
        base.questionParts = q.questionParts.map((part: any) => ({
          type: part.type,
          url: part.url,
          content: part.content,
          caption: part.caption,
          dialogPerson: part.dialogPerson
        }));
      }
    }
    return base;
  });

  // For discover lessons with new structure: 2 words -> 3 questions -> 3 words -> 3 questions
  if (quizId.endsWith("-discover")) {
    // Keep the original order from buildDiscoverQuizStructure
    // The structure is already optimized: content slides followed by practice questions
    return injectIntroSlides(quizId, mapped);
  }

  return injectIntroSlides(quizId, mapped);
}


