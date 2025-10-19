import { useCallback, useMemo, useState } from "react";
import type { QuizModel, QuizQuestion } from "./quiz";

export type QuizState = {
  loading: boolean;
  quiz: QuizModel | null;
  currentIndex: number;
  answers: Record<string, string | null>;
  finished: boolean;
  // Align with flow: timestamps and flags
  startedAt: number;
  completedAt: number;
  hideMilestoneIntro: boolean;
};

export function useQuizStore() {
  const [state, setState] = useState<QuizState>({
    loading: false,
    quiz: null,
    currentIndex: 0,
    answers: {},
    finished: false,
    startedAt: 0,
    completedAt: 0,
    hideMilestoneIntro: false,
  });

  const fetchQuiz = useCallback(async (lessonId: string) => {
    setState((s) => ({ ...s, loading: true }));
    // NOTE: In real app we would call API and trust server questions order.
    // Here we simulate API data but preserve order and only prepend FE intro slides when needed.
    const serverQuestions: QuizQuestion[] = [
      { id: "q1", type: "MULTIPLE_CHOICE", prompt: "Xin chào là?", options: ["Vẫy tay", "Nhảy"], correctAnswer: "Vẫy tay" },
    ];

    const introSlides: QuizQuestion[] = [];

    // Milestone intro insertion (heuristic based on lessonId contains 'milestone')
    if (!state.hideMilestoneIntro && /milestone/i.test(lessonId) && serverQuestions.length > 1) {
      introSlides.push({ id: "intro-milestone", type: "CONTENT", prompt: "Collect stars!" });
    }

    // Unit intro insertion for specific id pattern: contains '_01_1-' but not '01_01_1-' (aligning logic)
    if (lessonId.includes("_01_1-") && !lessonId.includes("01_01_1-")) {
      // unit number is char at index 1 in ids like 'x...'; safe-guard parse
      const maybeUnit = parseInt(String(lessonId).substring(1, 2), 10);
      if (!Number.isNaN(maybeUnit) && maybeUnit > 1 && maybeUnit < 9 && serverQuestions.length > 1) {
        introSlides.push({ id: "intro-unit", type: "CONTENT", prompt: `Progress update for Unit ${maybeUnit}` });
      }
    }

    const questions: QuizQuestion[] = introSlides.concat(serverQuestions);
    const quiz: QuizModel = { id: lessonId, title: `Lesson ${lessonId}`, questions };
    await new Promise((r) => setTimeout(r, 150));
    setState({ loading: false, quiz, currentIndex: 0, answers: {}, finished: false, startedAt: Date.now(), completedAt: 0, hideMilestoneIntro: false });
  }, []);

  const selectAnswer = useCallback((questionId: string, answer: string | null) => {
    setState((s) => ({ ...s, answers: { ...s.answers, [questionId]: answer } }));
  }, []);

  const next = useCallback(() => {
    setState((s) => {
      if (!s.quiz) return s;
      if (s.currentIndex < s.quiz.questions.length - 1) {
        return { ...s, currentIndex: s.currentIndex + 1 };
        
      }
      return { ...s, finished: true, completedAt: Date.now() };
    });
  }, []);

  const endQuiz = useCallback(() => {
    setState((s) => ({ ...s, finished: true, completedAt: Date.now() }));
  }, []);

  const result = useMemo(() => {
    if (!state.quiz) return { correct: 0, total: 0 };
    let correct = 0;
    for (const q of state.quiz.questions) {
      if (q.type === "MULTIPLE_CHOICE" && q.correctAnswer && state.answers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    }
    const total = state.quiz.questions.filter((q) => q.type === "MULTIPLE_CHOICE").length;
    return { correct, total };
  }, [state.quiz, state.answers]);

  return { state, fetchQuiz, selectAnswer, next, endQuiz, result };
}


