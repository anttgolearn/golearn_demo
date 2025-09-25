"use client"

import { useMemo, useState } from "react"
import { Card } from "../../shared/ui/card"
import { Button } from "../../shared/ui/button"
import { Badge } from "../../shared/ui/badge"
import { VideoDebug } from "../../components/VideoDebug"

type AssessmentItem = {
  id: string
  title: string
  prompt: string
  mediaType: "video" | "gif"
  mediaUrl: string
  choices: { id: string; label: string; correct?: boolean }[]
}

export function OnboardingAssessment({ 
  onComplete, 
  onBack, 
  questionCount = 10 
}: { 
  onComplete: (result: { score: number; level: string }) => void; 
  onBack?: () => void;
  questionCount?: number;
}) {
  // Video paths updated to match available files in resources directory
  const allItems: AssessmentItem[] = useMemo(() => [
    {
      id: "greet",
      title: "Chào hỏi",
      prompt: "Ký hiệu nào thể hiện lời chào cơ bản?",
      mediaType: "video",
      mediaUrl: "/resources/videos/Chào.mp4",
      choices: [
        { id: "a", label: "Xin chào", correct: true },
        { id: "b", label: "Cảm ơn" },
        { id: "c", label: "Tạm biệt" },
      ],
    },
    {
      id: "thanks",
      title: "Cảm ơn",
      prompt: "Ký hiệu nào mang nghĩa Cảm ơn?",
      mediaType: "video",
      mediaUrl: "/resources/videos/Chào.mp4",
      choices: [
        { id: "a", label: "Xin chào" },
        { id: "b", label: "Cảm ơn", correct: true },
        { id: "c", label: "Xin lỗi" },
      ],
    },
    {
      id: "number",
      title: "Số đếm",
      prompt: "Ký hiệu cho số 1 là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/1.mp4",
      choices: [
        { id: "a", label: "1", correct: true },
        { id: "b", label: "2" },
        { id: "c", label: "3" },
      ],
    },
    {
      id: "family",
      title: "Gia đình",
      prompt: "Ký hiệu nào chỉ người mẹ?",
      mediaType: "video",
      mediaUrl: "/resources/videos/bố mẹ.mp4",
      choices: [
        { id: "a", label: "Mẹ", correct: true },
        { id: "b", label: "Bố" },
        { id: "c", label: "Anh trai" },
      ],
    },
    {
      id: "colors",
      title: "Màu sắc",
      prompt: "Ký hiệu cho màu đỏ là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Đỏ", correct: true },
        { id: "b", label: "Xanh" },
        { id: "c", label: "Vàng" },
      ],
    },
    {
      id: "emotions",
      title: "Cảm xúc",
      prompt: "Ký hiệu nào thể hiện sự vui mừng?",
      mediaType: "video",
      mediaUrl: "/resources/videos/vui mừng - nam.mp4",
      choices: [
        { id: "a", label: "Vui", correct: true },
        { id: "b", label: "Buồn" },
        { id: "c", label: "Tức giận" },
      ],
    },
    {
      id: "food",
      title: "Thức ăn",
      prompt: "Ký hiệu cho từ 'cơm' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/cơm.mp4",
      choices: [
        { id: "a", label: "Cơm", correct: true },
        { id: "b", label: "Bánh mì" },
        { id: "c", label: "Phở" },
      ],
    },
    {
      id: "time",
      title: "Thời gian",
      prompt: "Ký hiệu nào chỉ buổi sáng?",
      mediaType: "video",
      mediaUrl: "/resources/videos/buổi sáng - bắc.mp4",
      choices: [
        { id: "a", label: "Sáng", correct: true },
        { id: "b", label: "Chiều" },
        { id: "c", label: "Tối" },
      ],
    },
    {
      id: "body",
      title: "Cơ thể",
      prompt: "Ký hiệu cho từ 'mắt' là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Mắt", correct: true },
        { id: "b", label: "Mũi" },
        { id: "c", label: "Miệng" },
      ],
    },
    {
      id: "animals",
      title: "Động vật",
      prompt: "Ký hiệu nào chỉ con chó?",
      mediaType: "video",
      mediaUrl: "/resources/videos/con chó - nam.mp4",
      choices: [
        { id: "a", label: "Chó", correct: true },
        { id: "b", label: "Mèo" },
        { id: "c", label: "Gà" },
      ],
    },
    {
      id: "actions",
      title: "Hành động",
      prompt: "Ký hiệu cho động từ 'ăn' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/cơm.mp4",
      choices: [
        { id: "a", label: "Ăn", correct: true },
        { id: "b", label: "Uống" },
        { id: "c", label: "Ngủ" },
      ],
    },
    {
      id: "directions",
      title: "Phương hướng",
      prompt: "Ký hiệu nào chỉ hướng 'trên'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/sáng.mp4",
      choices: [
        { id: "a", label: "Trên", correct: true },
        { id: "b", label: "Dưới" },
        { id: "c", label: "Trái" },
      ],
    },
    {
      id: "weather",
      title: "Thời tiết",
      prompt: "Ký hiệu cho 'mưa' là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/mưa phùn.mp4",
      choices: [
        { id: "a", label: "Mưa", correct: true },
        { id: "b", label: "Nắng" },
        { id: "c", label: "Tuyết" },
      ],
    },
    {
      id: "clothes",
      title: "Quần áo",
      prompt: "Ký hiệu nào chỉ 'áo sơ mi'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/áo.mp4",
      choices: [
        { id: "a", label: "Áo sơ mi", correct: true },
        { id: "b", label: "Quần jean" },
        { id: "c", label: "Giày" },
      ],
    },
    {
      id: "school",
      title: "Trường học",
      prompt: "Ký hiệu cho 'sách' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/sách.mp4",
      choices: [
        { id: "a", label: "Sách", correct: true },
        { id: "b", label: "Bút" },
        { id: "c", label: "Bảng" },
      ],
    },
    {
      id: "transport",
      title: "Phương tiện",
      prompt: "Ký hiệu nào chỉ 'xe máy'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/xe máy.mp4",
      choices: [
        { id: "a", label: "Xe máy", correct: true },
        { id: "b", label: "Ô tô" },
        { id: "c", label: "Xe đạp" },
      ],
    },
    {
      id: "house",
      title: "Nhà cửa",
      prompt: "Ký hiệu cho 'cửa sổ' là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/cửa sổ.mp4",
      choices: [
        { id: "a", label: "Cửa sổ", correct: true },
        { id: "b", label: "Cửa" },
        { id: "c", label: "Tường" },
      ],
    },
    {
      id: "nature",
      title: "Thiên nhiên",
      prompt: "Ký hiệu nào chỉ 'lá cây'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/lá cây - bắc.mp4",
      choices: [
        { id: "a", label: "Lá cây", correct: true },
        { id: "b", label: "Hoa" },
        { id: "c", label: "Cây" },
      ],
    },
    {
      id: "sports",
      title: "Thể thao",
      prompt: "Ký hiệu cho 'đá bóng' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/đá bóng.mp4",
      choices: [
        { id: "a", label: "Đá bóng", correct: true },
        { id: "b", label: "Bóng rổ" },
        { id: "c", label: "Bóng chuyền" },
      ],
    },
    {
      id: "music",
      title: "Âm nhạc",
      prompt: "Ký hiệu nào chỉ 'đàn guitar'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/đàn ghi ta.mp4",
      choices: [
        { id: "a", label: "Guitar", correct: true },
        { id: "b", label: "Piano" },
        { id: "c", label: "Trống" },
      ],
    },
    {
      id: "shapes",
      title: "Hình dạng",
      prompt: "Ký hiệu cho 'hình tròn' là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/hình tròn.mp4",
      choices: [
        { id: "a", label: "Hình tròn", correct: true },
        { id: "b", label: "Hình vuông" },
        { id: "c", label: "Hình tam giác" },
      ],
    },
    {
      id: "professions",
      title: "Nghề nghiệp",
      prompt: "Ký hiệu nào chỉ 'cô giáo'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/cô giáo - bắc.mp4",
      choices: [
        { id: "a", label: "Cô giáo", correct: true },
        { id: "b", label: "Bác sĩ" },
        { id: "c", label: "Công an" },
      ],
    },
    {
      id: "technology",
      title: "Công nghệ",
      prompt: "Ký hiệu cho 'điện thoại' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Điện thoại", correct: true },
        { id: "b", label: "Máy tính" },
        { id: "c", label: "Tivi" },
      ],
    },
    {
      id: "furniture",
      title: "Đồ nội thất",
      prompt: "Ký hiệu nào chỉ 'ghế'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Ghế", correct: true },
        { id: "b", label: "Bàn" },
        { id: "c", label: "Giường" },
      ],
    },
    {
      id: "kitchen",
      title: "Bếp",
      prompt: "Ký hiệu cho 'nồi' là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/nồi.mp4",
      choices: [
        { id: "a", label: "Nồi", correct: true },
        { id: "b", label: "Chảo" },
        { id: "c", label: "Bát" },
      ],
    },
    {
      id: "bathroom",
      title: "Phòng tắm",
      prompt: "Ký hiệu nào chỉ 'bồn tắm'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Bồn tắm", correct: true },
        { id: "b", label: "Vòi hoa sen" },
        { id: "c", label: "Bồn cầu" },
      ],
    },
    {
      id: "office",
      title: "Văn phòng",
      prompt: "Ký hiệu cho 'máy in' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Máy in", correct: true },
        { id: "b", label: "Máy fax" },
        { id: "c", label: "Máy photocopy" },
      ],
    },
    {
      id: "hospital",
      title: "Bệnh viện",
      prompt: "Ký hiệu nào chỉ 'thuốc'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/màu đỏ.mp4",
      choices: [
        { id: "a", label: "Thuốc", correct: true },
        { id: "b", label: "Kim tiêm" },
        { id: "c", label: "Băng gạc" },
      ],
    },
    {
      id: "shopping",
      title: "Mua sắm",
      prompt: "Ký hiệu cho 'tiền' là gì?",
      mediaType: "video",
      mediaUrl: "/resources/videos/tờ tiền.mp4",
      choices: [
        { id: "a", label: "Tiền", correct: true },
        { id: "b", label: "Thẻ tín dụng" },
        { id: "c", label: "Ví" },
      ],
    },
    {
      id: "travel",
      title: "Du lịch",
      prompt: "Ký hiệu nào chỉ 'tàu hỏa'?",
      mediaType: "video",
      mediaUrl: "/resources/videos/tàu hỏa - bắc.mp4",
      choices: [
        { id: "a", label: "Tàu hỏa", correct: true },
        { id: "b", label: "Máy bay" },
        { id: "c", label: "Tàu thủy" },
      ],
    },
    {
      id: "seasons",
      title: "Mùa",
      prompt: "Ký hiệu cho 'mùa xuân' là lựa chọn nào?",
      mediaType: "video",
      mediaUrl: "/resources/videos/mùa xuân - trung.mp4",
      choices: [
        { id: "a", label: "Mùa xuân", correct: true },
        { id: "b", label: "Mùa hè" },
        { id: "c", label: "Mùa thu" },
      ],
    },
  ], [])

  // Randomly select questions from the question bank
  // This ensures each assessment session shows different questions
  const items: AssessmentItem[] = useMemo(() => {
    const shuffled = [...allItems].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(questionCount, allItems.length))
  }, [allItems, questionCount])

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [videoErrors, setVideoErrors] = useState<Set<string>>(new Set())
  const isLast = step === items.length

  const score = useMemo(() => {
    return items.reduce((acc, item) => {
      const picked = answers[item.id]
      const correctId = item.choices.find((c) => c.correct)?.id
      return acc + (picked && picked === correctId ? 1 : 0)
    }, 0)
  }, [answers, items])

  const level = useMemo(() => {
    const percentage = (score / items.length) * 100
    if (percentage >= 90) return "Nâng cao"
    if (percentage >= 80) return "Khá tốt"
    if (percentage >= 70) return "Trung bình"
    if (percentage >= 60) return "Cơ bản"
    return "Mới bắt đầu"
  }, [score, items.length])

  const handlePick = (itemId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [itemId]: choiceId }))
  }

  const goNext = () => {
    if (isLast) {
      onComplete({ score, level })
    } else {
      setStep((s) => Math.min(s + 1, items.length))
    }
  }

  const goPrev = () => {
    if (step === 0) return
    setStep((s) => Math.max(s - 1, 0))
  }

  if (isLast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-6 pb-24 space-y-6 text-center">
            <h2 className="text-2xl font-bold">Kết quả đánh giá</h2>
            <div className="text-6xl">🎉</div>
            <p className="text-muted-foreground">Điểm: {score}/{items.length}</p>
            <div className="flex items-center justify-center gap-2">
              <span>Cấp độ đề xuất:</span>
              <Badge>{level}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Bạn có thể điều chỉnh mục tiêu sau trong phần cài đặt.</p>
              {(() => {
                const percentage = (score / items.length) * 100
                if (percentage >= 90) return <p className="text-sm text-green-600 font-medium">🎉 Xuất sắc! Bạn đã có kiến thức vững chắc về ngôn ngữ ký hiệu!</p>
                if (percentage >= 80) return <p className="text-sm text-blue-600 font-medium">👏 Tuyệt vời! Bạn đã nắm vững nhiều ký hiệu cơ bản!</p>
                if (percentage >= 70) return <p className="text-sm text-yellow-600 font-medium">👍 Tốt lắm! Hãy tiếp tục luyện tập để cải thiện thêm!</p>
                if (percentage >= 60) return <p className="text-sm text-orange-600 font-medium">💪 Bạn đã có nền tảng tốt! Hãy kiên trì học tập!</p>
                return <p className="text-sm text-red-600 font-medium">🌟 Đừng lo! Mọi người đều bắt đầu từ con số 0. Hãy cùng học nhé!</p>
              })()}
            </div>
          </div>
          <div className="sticky bottom-0 inset-x-0 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
            <div className="flex gap-3">
              <Button variant="outline" className="w-1/3" onClick={() => setStep(items.length - 1)}>Quay lại</Button>
              <Button className="flex-1" onClick={() => onComplete({ score, level })}>Tiếp tục</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const item = items[step]
  const picked = answers[item.id]
  const progressPct = Math.round(((step + 1) / items.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-6 pb-24 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Câu {step + 1}/{items.length}
            </div>
            <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-muted-foreground text-sm">{item.prompt}</p>
            {step === 0 && <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded-md">💡 Mẹo: Hãy quan sát kỹ video/gif và chọn đáp án phù hợp nhất!</p>}
            {step === Math.floor(items.length / 2) && <p className="text-xs text-green-600 bg-green-50 p-2 rounded-md">🎯 Bạn đang làm rất tốt! Hãy tiếp tục nhé!</p>}
            {step === items.length - 1 && <p className="text-xs text-purple-600 bg-purple-50 p-2 rounded-md">🏁 Câu cuối cùng rồi! Bạn sắp hoàn thành rồi!</p>}
            {process.env.NODE_ENV === 'development' && videoErrors.has(item.mediaUrl) && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md">
                ⚠️ Debug: Video không thể tải: {item.mediaUrl}
              </p>
            )}
            {process.env.NODE_ENV === 'development' && (
              <VideoDebug videoUrl={item.mediaUrl} title={item.title} />
            )}
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-md border bg-black/5 flex items-center justify-center relative">
            {item.mediaType === "video" ? (
              <>
                <video 
                  className="w-full h-full object-cover" 
                  src={item.mediaUrl} 
                  muted 
                  playsInline 
                  loop 
                  onError={(e) => {
                    console.error('Video load error:', item.mediaUrl);
                    setVideoErrors(prev => new Set(prev).add(item.mediaUrl));
                    e.currentTarget.style.display = 'none';
                    // Show fallback message
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                  onLoadStart={() => console.log('Loading video:', item.mediaUrl)}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📹</div>
                    <div className="text-sm">Video không thể tải</div>
                    <div className="text-xs mt-1">Câu hỏi: {item.title}</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img 
                  className="w-full h-full object-cover" 
                  src={item.mediaUrl} 
                  alt={item.title}
                  onError={(e) => {
                    console.error('Image load error:', item.mediaUrl);
                    e.currentTarget.style.display = 'none';
                    // Show fallback message
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div className="text-sm">Hình ảnh không thể tải</div>
                    <div className="text-xs mt-1">Câu hỏi: {item.title}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            {item.choices.map((c) => (
              <button key={c.id} onClick={() => handlePick(item.id, c.id)} className={`w-full p-3 rounded-xl border-2 text-left transition ${picked === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 inset-x-0 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
          <div className="flex gap-3">
            <Button variant="outline" className="w-1/3" onClick={onBack ?? goPrev} disabled={step === 0 && !onBack}>Quay lại</Button>
            <Button className="flex-1" onClick={goNext} disabled={!picked}>
              {isLast ? "Xem kết quả" : step === items.length - 1 ? "Hoàn thành" : "Tiếp tục"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}


