export type AnswerOptionBase = {
  id: number;
  isCorrect: boolean;
};

export function getAnswerStatus(
  option: { id: number; isCorrect?: boolean },
  selectedAnswerIds: number[],
  showResult: boolean
): string {
  if (!showResult) return '';
  if (option.isCorrect) return 'Chính xác';
  if (selectedAnswerIds.includes(option.id)) return 'Không chính xác';
  return '';
}

export function getCorrectAnswersCount(options: Array<{ isCorrect?: boolean }>): number {
  return options.filter(opt => !!opt.isCorrect).length;
}

export function getSelectedCorrectCount(
  selectedAnswerIds: number[],
  options: Array<{ id: number; isCorrect?: boolean }>
): number {
  return selectedAnswerIds.filter(answerId => {
    const option = options.find(opt => opt.id === answerId);
    return !!option?.isCorrect;
  }).length;
}

export function isOverallSelectionCorrect(
  selectedAnswerIds: number[],
  options: Array<{ id: number; isCorrect?: boolean }>
): boolean {
  const correctIds = options.filter(o => o.isCorrect).map(o => o.id).sort();
  const selectedSorted = [...selectedAnswerIds].sort();
  if (correctIds.length !== selectedSorted.length) return false;
  for (let i = 0; i < correctIds.length; i++) {
    if (correctIds[i] !== selectedSorted[i]) return false;
  }
  return true;
}


