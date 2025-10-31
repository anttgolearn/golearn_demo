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
  // Normalize selected ids to numbers to avoid string/number mismatch
  const selected = (selectedAnswerIds || []).map((v: any) => Number(v));
  const optionId = Number(option.id);
  if (option.isCorrect) return 'Chính xác';
  if (selected.includes(optionId)) return 'Không chính xác';
  return '';
}

export function getCorrectAnswersCount(options: Array<{ isCorrect?: boolean }>): number {
  return options.filter(opt => !!opt.isCorrect).length;
}

export function getSelectedCorrectCount(
  selectedAnswerIds: number[],
  options: Array<{ id: number; isCorrect?: boolean }>
): number {
  const selected = (selectedAnswerIds || []).map((v: any) => Number(v));
  return selected.filter(answerId => {
    const option = options.find(opt => Number(opt.id) === Number(answerId));
    return !!option?.isCorrect;
  }).length;
}

export function isOverallSelectionCorrect(
  selectedAnswerIds: number[],
  options: Array<{ id: number; isCorrect?: boolean }>
): boolean {
  const correctIds = options.filter(o => o.isCorrect).map(o => Number(o.id)).sort((a,b)=>a-b);
  const selectedSorted = (selectedAnswerIds || []).map((v:any)=>Number(v)).sort((a,b)=>a-b);
  if (correctIds.length !== selectedSorted.length) return false;
  for (let i = 0; i < correctIds.length; i++) {
    if (correctIds[i] !== selectedSorted[i]) return false;
  }
  return true;
}


