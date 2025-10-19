import { useMemo } from "react";

type Word = { id: string; term: string; videoUrl?: string; correctRate?: number };

export function useReviewWords(words: Word[], limit = 10) {
  return useMemo(() => {
    const sorted = [...words].sort((a, b) => (a.correctRate ?? 0) - (b.correctRate ?? 0));
    return sorted.slice(0, limit);
  }, [words, limit]);
}

export default useReviewWords;


