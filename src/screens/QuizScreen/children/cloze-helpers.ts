// Helper functions for cloze questions

export interface Fill {
  value: string;     // Giá trị text của từ (ví dụ: "Cảm")
  index: number;     // Vị trí của từ trong câu (0, 1, 2,...)
  key: string;       // Chữ cái đầu tiên để định danh (ví dụ: "c" cho "Cảm")
}

// Parse word into Fill with index and key
// Ví dụ: "Cảm" tại vị trí 0 → { value: "Cảm", index: 0, key: "c" }
export const createFill = (word: string, index: number): Fill => {
  const key = word.charAt(0).toLowerCase();
  return { value: word, index, key };
};

// Parse correct phrase into array of Fills
// Ví dụ: "Cảm ơn" → [{ value: "Cảm", index: 0, key: "c" }, { value: "ơn", index: 1, key: "ơ" }]
export const parsePhrase = (phrase: string): Fill[] => {
  const words = phrase.trim().split(/\s+/);
  return words.map((word, index) => createFill(word, index));
};

// Parse correct fills from format like "{NICE} MEET-you" or "{[CROSS][CROSSING]} -1-2-3 RIGHT"
export const getCorrectFills = (fills: string): Array<Array<string>> => {
  const correctFills = fills.match(/\{(.*?)}/g);
  if (!correctFills) return [];
  
  return correctFills.map(fill => {
    const content = fill.slice(1, -1); // Remove { and }
    if (content.startsWith('[') && content.endsWith(']')) {
      // Multiple answers format: [CROSS][CROSSING]
      const matches = content.match(/\[(.*?)\]/g);
      return matches ? matches.map(m => m.slice(1, -1)) : [content];
    } else {
      // Single answer format: NICE
      return [content];
    }
  });
};

// Clean string for fuzzy matching
const _getCleanString = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ');   // Normalize whitespace
};

// Fuzzy matching for typing mode
export const isAnswerCorrect = (answer: string, solutions: string | string[]): boolean => {
  if (!answer || !solutions) return false;
  
  const solutionsArray = Array.isArray(solutions) ? solutions : [solutions];
  if (!solutionsArray.length) return false;
  
  const cleanAnswer = _getCleanString(answer);
  const cleanSolutions = solutionsArray.map(_getCleanString);
  
  // Simple fuzzy matching - check if any solution contains the answer or vice versa
  return cleanSolutions.some(solution => 
    solution.includes(cleanAnswer) || cleanAnswer.includes(solution)
  );
};

// Check if question is in typing mode
export const isTypingMode = (hints: string[]): boolean => {
  return hints.length <= 1;
};

// Validate cloze answers
export const validateClozeAnswers = (answers: Array<string>): boolean => {
  return answers.length > 0 && answers.every(a => a && a.trim().length > 0);
};
