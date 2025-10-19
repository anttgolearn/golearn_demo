import { UNIT_STRUCTURE, Lesson } from './lesson-structure';

/**
 * Get the next lesson in the current chapter
 * @param currentLessonId - Current lesson ID (e.g., '01_01_1-discover')
 * @returns Next lesson object or null if no next lesson
 */
export function getNextLessonInChapter(currentLessonId: string): Lesson | null {
  // Parse lesson ID to extract unit, chapter, and lesson info
  // Format: {unit}_{chapter}_{lesson}-{type}
  // Example: '01_01_1-discover' -> unit: 01, chapter: 01, lesson: 1, type: discover
  
  const parts = currentLessonId.split('-');
  if (parts.length < 2) return null;
  
  const idParts = parts[0].split('_');
  if (idParts.length < 3) return null;
  
  const unitId = parseInt(idParts[0]);
  const chapterId = parseInt(idParts[1]);
  const lessonNumber = parseInt(idParts[2]);
  const lessonType = parts[1];
  
  // Find the current unit
  const unit = UNIT_STRUCTURE.find(u => u.id === `unit-${unitId}`);
  if (!unit) return null;
  
  // Find the current chapter
  const chapter = unit.chapters.find(c => c.id === `unit-${unitId}-chapter-${chapterId}`);
  if (!chapter) return null;
  
  // Find current lesson index
  const currentLessonIndex = chapter.lessons.findIndex(l => l.id === currentLessonId);
  if (currentLessonIndex === -1) return null;
  
  // Get next lesson in the same chapter
  const nextLessonIndex = currentLessonIndex + 1;
  if (nextLessonIndex >= chapter.lessons.length) {
    return null; // No more lessons in this chapter
  }
  
  return chapter.lessons[nextLessonIndex];
}

/**
 * Get the next lesson in the current chapter with fallback to first lesson of next chapter
 * @param currentLessonId - Current lesson ID
 * @returns Next lesson object or null if no next lesson
 */
export function getNextLessonWithChapterFallback(currentLessonId: string): Lesson | null {
  const nextLesson = getNextLessonInChapter(currentLessonId);
  if (nextLesson) return nextLesson;
  
  // If no next lesson in current chapter, try first lesson of next chapter
  return getFirstLessonOfNextChapter(currentLessonId);
}

/**
 * Get the first lesson of the next chapter
 * @param currentLessonId - Current lesson ID
 * @returns First lesson of next chapter or null if no next chapter
 */
export function getFirstLessonOfNextChapter(currentLessonId: string): Lesson | null {
  const parts = currentLessonId.split('-');
  if (parts.length < 2) return null;
  
  const idParts = parts[0].split('_');
  if (idParts.length < 3) return null;
  
  const unitId = parseInt(idParts[0]);
  const chapterId = parseInt(idParts[1]);
  
  // Find the current unit
  const unit = UNIT_STRUCTURE.find(u => u.id === `unit-${unitId}`);
  if (!unit) return null;
  
  // Find the current chapter index
  const currentChapterIndex = unit.chapters.findIndex(c => c.id === `unit-${unitId}-chapter-${chapterId}`);
  if (currentChapterIndex === -1) return null;
  
  // Get next chapter
  const nextChapterIndex = currentChapterIndex + 1;
  if (nextChapterIndex >= unit.chapters.length) {
    return null; // No more chapters in this unit
  }
  
  const nextChapter = unit.chapters[nextChapterIndex];
  return nextChapter.lessons[0] || null;
}

/**
 * Get lesson navigation info
 * @param currentLessonId - Current lesson ID
 * @returns Navigation info object
 */
export function getLessonNavigationInfo(currentLessonId: string) {
  const nextLesson = getNextLessonInChapter(currentLessonId);
  const nextChapterLesson = getFirstLessonOfNextChapter(currentLessonId);
  
  return {
    currentLessonId,
    nextLessonInChapter: nextLesson,
    nextChapterLesson: nextChapterLesson,
    hasNextInChapter: !!nextLesson,
    hasNextChapter: !!nextChapterLesson,
    nextLessonId: nextLesson?.id || nextChapterLesson?.id || null,
    nextLessonTitle: nextLesson?.title || nextChapterLesson?.title || null,
    nextLessonType: nextLesson?.type || nextChapterLesson?.type || null,
  };
}

/**
 * Get all lessons in current chapter
 * @param currentLessonId - Current lesson ID
 * @returns Array of lessons in current chapter
 */
export function getLessonsInCurrentChapter(currentLessonId: string): Lesson[] {
  const parts = currentLessonId.split('-');
  if (parts.length < 2) return [];
  
  const idParts = parts[0].split('_');
  if (idParts.length < 3) return [];
  
  const unitId = parseInt(idParts[0]);
  const chapterId = parseInt(idParts[1]);
  
  // Find the current unit
  const unit = UNIT_STRUCTURE.find(u => u.id === `unit-${unitId}`);
  if (!unit) return [];
  
  // Find the current chapter
  const chapter = unit.chapters.find(c => c.id === `unit-${unitId}-chapter-${chapterId}`);
  if (!chapter) return [];
  
  return chapter.lessons;
}

/**
 * Get chapter info for current lesson
 * @param currentLessonId - Current lesson ID
 * @returns Chapter info object
 */
export function getCurrentChapterInfo(currentLessonId: string) {
  const parts = currentLessonId.split('-');
  if (parts.length < 2) return null;
  
  const idParts = parts[0].split('_');
  if (idParts.length < 3) return null;
  
  const unitId = parseInt(idParts[0]);
  const chapterId = parseInt(idParts[1]);
  
  // Find the current unit
  const unit = UNIT_STRUCTURE.find(u => u.id === `unit-${unitId}`);
  if (!unit) return null;
  
  // Find the current chapter
  const chapter = unit.chapters.find(c => c.id === `unit-${unitId}-chapter-${chapterId}`);
  if (!chapter) return null;
  
  return {
    unit,
    chapter,
    unitId,
    chapterId,
    totalLessons: chapter.lessons.length,
    currentLessonIndex: chapter.lessons.findIndex(l => l.id === currentLessonId),
  };
}
