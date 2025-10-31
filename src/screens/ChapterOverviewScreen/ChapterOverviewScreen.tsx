import React, { useEffect, useMemo, useState } from "react";
import HandIcon from "../../components/icons/HandIcon";
import { Users, Hash, Smile, BookOpen } from "lucide-react";
import ChapterIllustration from "../../components/illustrations/ChapterIllustration";
import { fetchChapterLessons, type LessonSummary } from "../../models/chapter-overview-store/chapter-overview-store";
import { HARDCODED_CHAPTERS } from "../../lib/mock-lessons";
import { LessonItem } from "../../components/molecules/LessonItem/LessonItem";

type ChapterOverviewScreenProps = {
  onOpenLesson?: (lessonId: string) => void;
};

export const ChapterOverviewScreen: React.FC<ChapterOverviewScreenProps> = ({ onOpenLesson }) => {
  const chapterId = useMemo(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const match = hash.match(/^\/chapter\/(\d+)/);
    if (match) {
      const chapterNum = parseInt(match[1]);
      // Convert chapter number to unit_chapter format
      if (chapterNum <= 2) return `1_${chapterNum}`;
      if (chapterNum <= 4) return `2_${chapterNum - 2}`;
      if (chapterNum <= 6) return `3_${chapterNum - 4}`;
      if (chapterNum <= 8) return `4_${chapterNum - 6}`;
      if (chapterNum <= 10) return `5_${chapterNum - 8}`;
      if (chapterNum <= 12) return `6_${chapterNum - 10}`;
      if (chapterNum <= 14) return `7_${chapterNum - 12}`;
      if (chapterNum <= 16) return `8_${chapterNum - 14}`;
      if (chapterNum <= 18) return `9_${chapterNum - 16}`;
      if (chapterNum <= 20) return `10_${chapterNum - 18}`;
    }
    return "1_1";
  }, []);

  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      // Prefer hardcoded chapter payload if exists
      const hard = HARDCODED_CHAPTERS[chapterId as keyof typeof HARDCODED_CHAPTERS as any];
      if (hard) {
        if (!mounted) return;
        // Map to LessonSummary minimal fields
        const mapped: LessonSummary[] = hard.lessons.map((l, idx) => ({
          id: l.id,
          title: `Lesson ${idx + 1}`, // Will be overridden in LessonItem component
          // Map lesson type to existing trio used in UI
          type:
            l.type.toLowerCase() === 'discover' || l.type.toLowerCase() === 'info' || l.type.toLowerCase() === 'explore' || l.type.toLowerCase() === 'iconic'
              ? 'learn'
              : l.type.toLowerCase() === 'develop' || l.type.toLowerCase() === 'practice' || l.type.toLowerCase() === 'dialog' || l.type.toLowerCase() === 'training'
              ? 'trainer'
              : 'milestone',
          locked: l.locked,
          description: undefined,
          estimatedTime: 5,
        }));
        setLessons(mapped);
        setLocked(hard.locked);
        setLoading(false);
        document.title = `${hard.title} - Chapter ${hard.chapterNumber}`;
        return;
      }
      const data = await fetchChapterLessons(chapterId);
      if (!mounted) return;
      setLessons(data);
      setLocked(false);
      setLoading(false);
      document.title = `Chapter ${chapterId} - Tổng quan`;
    })();
    return () => { mounted = false; };
  }, [chapterId]);

  const getChapterInfo = (chapterId: string) => {
    const chapterInfo: Record<string, { title: string; description: string; icon: string; color: string; unit: string }> = {
      "1_1": { title: "Chào hỏi và lịch sự", description: "Học các ký hiệu chào hỏi cơ bản: Chào, Tạm biệt, Xin lỗi", icon: "👋", color: "bg-blue-50", unit: "Unit 1: Giao tiếp cơ bản" },
      "1_2": { title: "Gia đình và mối quan hệ", description: "Học ký hiệu về các thành viên gia đình: Bố, Mẹ, Cha mẹ, Bố mẹ", icon: "👨‍👩‍👧‍👦", color: "bg-green-50", unit: "Unit 1: Giao tiếp cơ bản" },
      "2_1": { title: "Cảm xúc cơ bản", description: "Học ký hiệu cảm xúc cơ bản: Vui mừng, Buồn tảm, Giận dữ, Thích thú, Ngạc nhiên, Hoảng sợ, Lo sợ, Tuyệt vọng, Hồi hộp, Bối rối", icon: "😊", color: "bg-blue-50", unit: "Unit 2: Cảm xúc và tâm trạng" },
      "2_2": { title: "Cảm xúc nâng cao", description: "Học các cảm xúc phức tạp: Tự tin, Lo sợ, Ghen tị, Tuyệt vọng, Ngẹn ngàoi, Cô đơn, Giận dỗi, Nổi giận", icon: "🤔", color: "bg-orange-50", unit: "Unit 2: Cảm xúc và tâm trạng" },
      "3_1": { title: "Động vật thường gặp", description: "Học ký hiệu động vật: Con chó, Con mèo, Con gà", icon: "🐕", color: "bg-purple-50", unit: "Unit 3: Thiên nhiên và động vật" },
      "3_2": { title: "Thời tiết và thời gian", description: "Học ký hiệu thời tiết: Mùa hè, Mùa đông, Mùa thu, Mưa phùn", icon: "🌤️", color: "bg-cyan-50", unit: "Unit 3: Thiên nhiên và động vật" },
      "4_1": { title: "Số đếm cơ bản", description: "Học ký hiệu số đếm cơ bản: Số 1, Số 2, Số 3", icon: "🔢", color: "bg-indigo-50", unit: "Unit 4: Số đếm và hình học" },
      "4_2": { title: "Hình dạng và màu sắc", description: "Học ký hiệu hình dạng: Hình tam giác, Hình tròn, Hình vuông", icon: "🔺", color: "bg-pink-50", unit: "Unit 4: Số đếm và hình học" },
      "5_1": { title: "Thức ăn và bữa ăn", description: "Học ký hiệu thức ăn: Cơm, Phở, Cái bánh mì, Cái bát", icon: "🍚", color: "bg-red-50", unit: "Unit 5: Thức ăn và đồ vật" },
      "5_2": { title: "Đồ vật trong nhà", description: "Học ký hiệu đồ vật: Cái chảo, Cái nồi, Cửa sổ, Lá cây", icon: "🏠", color: "bg-teal-50", unit: "Unit 5: Thức ăn và đồ vật" },
      "6_1": { title: "Phương tiện giao thông", description: "Học ký hiệu phương tiện: Ô tô, Xe máy, Tàu hỏa", icon: "🚗", color: "bg-lime-50", unit: "Unit 6: Giao thông và hoạt động" },
      "6_2": { title: "Hoạt động và sở thích", description: "Học ký hiệu hoạt động: Đá bóng, Đàn ghi ta, Giấc ngủ", icon: "⚽", color: "bg-emerald-50", unit: "Unit 6: Giao thông và hoạt động" },
      "7_1": { title: "Cuộc sống học đường", description: "Học ký hiệu trường học: Cô giáo, Bảng học sinh", icon: "🎓", color: "bg-violet-50", unit: "Unit 7: Trường học và công việc" },
      "7_2": { title: "Công việc và tiền bạc", description: "Học ký hiệu công việc: Cái máy in, Tờ tiền", icon: "💼", color: "bg-amber-50", unit: "Unit 7: Trường học và công việc" },
      "8_1": { title: "Cảm xúc phức tạp", description: "Học các cảm xúc phức tạp: Nghẹn ngào, Cô đơn, Giận dỗi, Nổi giận", icon: "😰", color: "bg-red-100", unit: "Unit 8: Cảm xúc nâng cao" },
      "8_2": { title: "Cảm xúc đặc biệt", description: "Học các cảm xúc đặc biệt: Tự tin, Lo sợ, Ghen tị, Tuyệt vọng", icon: "🤯", color: "bg-purple-100", unit: "Unit 8: Cảm xúc nâng cao" },
      "9_1": { title: "Đồ vật học tập", description: "Học ký hiệu đồ vật học tập: Cây bút, Quyển sách", icon: "✏️", color: "bg-indigo-100", unit: "Unit 9: Đồ vật và dụng cụ" },
      "9_2": { title: "Đồ vật cá nhân", description: "Học ký hiệu đồ vật cá nhân: Quần bò, Cái áo", icon: "👕", color: "bg-pink-100", unit: "Unit 9: Đồ vật và dụng cụ" },
      "10_1": { title: "Thực vật", description: "Học ký hiệu thực vật: Lá cây", icon: "🌿", color: "bg-green-100", unit: "Unit 10: Thiên nhiên và môi trường" },
      "10_2": { title: "Môi trường sống", description: "Học ký hiệu môi trường: Cửa sổ (không gian sống)", icon: "🏡", color: "bg-teal-100", unit: "Unit 10: Thiên nhiên và môi trường" },
    };
    return chapterInfo[chapterId] || { title: "Chương học", description: "Học ký hiệu ngôn ngữ", icon: "📚", color: "bg-blue-50", unit: "Unit" };
  };

  const getVariantForChapter = (id: string, icon: string) => {
    if (icon === '👋') return 'greetings';
    if (icon.includes('👨')) return 'family';
    if (icon === '🔢') return 'numbers';
    if (icon === '😊') return 'emotions';
    if (id.startsWith('1_')) return 'greetings';
    if (id.startsWith('2_')) return 'emotions';
    if (id.startsWith('3_') || id.startsWith('4_')) return 'numbers';
    return 'default';
  };

  const renderHeader = () => {
    const chapterInfo = getChapterInfo(chapterId);
    const totalTime = lessons.reduce((sum, lesson) => sum + (lesson.estimatedTime || 0), 0);
    
    return (
      <div
        className={`rounded-xl p-8 text-center ${locked ? "bg-gray-100" : chapterInfo.color}`}
        data-testid="chapter-overview-header"
      >
        <div className="relative">
          <div className="absolute left-0 top-1">
            <button
              className="border rounded-full w-12 h-12 flex items-center justify-center bg-white text-lg hover:bg-gray-50 transition-colors shadow-sm"
              data-testid="chapter-overview-back"
              aria-label="Back"
              onClick={() => window.location.href = '/dashboard#/dashboard'}
            >
              ←
            </button>
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-gray-700 shadow-sm">
            Chapter {chapterId.replace('_', '.')}
          </div>
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-500 mb-2"></div>
            <div className="mb-4 flex items-center justify-center">
              <ChapterIllustration width={180} height={140} variant={getVariantForChapter(chapterId, chapterInfo.icon)} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{chapterInfo.title}</h1>
            <p className="text-base text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">
              {chapterInfo.description}
            </p>
            {totalTime > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {totalTime} phút • {lessons.length} bài học
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSoftPaywall = () => (
    <div className="mt-6">
      <div className="rounded-lg border p-5 bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-lg font-semibold text-center">Nâng cấp để mở khóa toàn bộ chương</h2>
        <p className="text-sm text-muted-foreground text-center mt-1">Trải nghiệm không giới hạn và phần thưởng hấp dẫn</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {["Lộ trình đầy đủ", "Theo dõi tiến độ", "Huy hiệu & thành tích"].map((b) => (
            <div key={b} className="rounded border p-3 text-center bg-white">{b}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const _renderLessonsList = () => {
    const activeLessonIndex = 1; // Second lesson is active for demo
    const isHybridLockedChapter = locked;
    
    return (
      <div className="grid grid-cols-1 gap-4 mt-6">
        {lessons.map((lesson, index) => {
          const _isActiveLesson = index === activeLessonIndex && !isHybridLockedChapter;
          
          return (
            <LessonItem
              key={`lesson-list-item-${index}`}
              lesson={lesson}  // Contains lesson.type = 'Iconic'
              index={index}
              isActiveLesson={_isActiveLesson}
              unitId={1} // Default unit ID
              chapterId={parseInt(chapterId)}
              chapterLessonsLength={lessons.length}
              onPress={() => onOpenLesson?.(String(lesson.id))}
            />
          );
        })}
      </div>
    );
  };


  return (
    <div className="container mx-auto p-4 max-w-3xl" data-testid="chapter-overview-screen">
      {renderHeader()}
      {loading ? (
        <div className="mt-6">Đang tải...</div>
      ) : (
        <>
          {locked ? renderSoftPaywall() : null}
          {_renderLessonsList()}
          <div className="h-28" />
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 border-t">
            <div className="container mx-auto max-w-3xl px-4 py-4 flex justify-center">
              <button
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow text-lg font-semibold"
                onClick={() => {
                  const next = lessons.find(() => true);
                  if (next) onOpenLesson?.(String(next.id));
                }}
                data-testid="chapter-continue-cta"
                aria-label="Continue learning"
              >
                Tiếp tục học
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterOverviewScreen;


