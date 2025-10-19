// Helper functions for cloze questions

export interface Fill {
  id: number;    // ID của hint được chọn (-1 nếu chưa chọn)
  value: string; // Giá trị text được điền vào gap
}

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
