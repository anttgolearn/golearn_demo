export type LessonSummary = {
  id: string;
  title: string;
  type: 'learn' | 'trainer' | 'milestone';
  locked?: boolean;
  description?: string;
  estimatedTime?: number;
};

// Comprehensive lesson structure following Unit 1 format: Discover -> Iconic -> Discover (advanced) -> Practice -> Review
// All chapters now follow the same 5-lesson structure for consistency
// Format: Unit_Chapter (e.g., "1_1", "1_2", "2_1", "2_2", etc.)
const CHAPTER_LESSON_STRUCTURE: Record<string, LessonSummary[]> = {
  "1_1": [ // Unit 1: Giao tiếp cơ bản - Chapter 1: Chào hỏi và lịch sự
    { 
      id: "01_01_1-discover", 
      title: "Khám phá chào hỏi", 
      type: 'learn',
      description: "Học các ký hiệu chào hỏi cơ bản: Chào, Tạm biệt, Xin lỗi",
      estimatedTime: 5
    },
    { 
      id: "01_01_2-practice", 
      title: "Luyện tập chào hỏi", 
      type: 'trainer',
      description: "Thực hành các ký hiệu chào hỏi đã học",
      estimatedTime: 8
    },
    { 
      id: "01_01_3-iconic", 
      title: "Ký hiệu biểu tượng chào hỏi", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về chào hỏi",
      estimatedTime: 4
    },
    { 
      id: "01_01_4-practice-advanced", 
      title: "Luyện tập nâng cao chào hỏi", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu chào hỏi",
      estimatedTime: 8
    },
    { 
      id: "01_01_5-review", 
      title: "Ôn tập chào hỏi", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về chào hỏi",
      estimatedTime: 6
    },
  ],
  "1_2": [ // Unit 1: Giao tiếp cơ bản - Chapter 2: Gia đình và mối quan hệ
    { 
      id: "01_02_1-discover", 
      title: "Khám phá gia đình", 
      type: 'learn',
      description: "Học ký hiệu về các thành viên gia đình: Bố, Mẹ, Cha mẹ, Bố mẹ",
      estimatedTime: 5
    },
    { 
      id: "01_02_2-iconic", 
      title: "Ký hiệu biểu tượng gia đình", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về gia đình",
      estimatedTime: 4
    },
    { 
      id: "01_02_3-discover-advanced", 
      title: "Khám phá gia đình nâng cao", 
      type: 'learn',
      description: "Học các ký hiệu gia đình nâng cao và mối quan hệ",
      estimatedTime: 6
    },
    { 
      id: "01_02_4-practice", 
      title: "Luyện tập gia đình", 
      type: 'trainer',
      description: "Thực hành các ký hiệu gia đình đã học",
      estimatedTime: 8
    },
    { 
      id: "01_02_5-review", 
      title: "Ôn tập gia đình", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về gia đình",
      estimatedTime: 6
    },
  ],
  "2_1": [ // Unit 2: Cảm xúc và tâm trạng - Chapter 1: Cảm xúc cơ bản
    { 
      id: "02_01_1-discover", 
      title: "Khám phá cảm xúc cơ bản", 
      type: 'learn',
      description: "Học ký hiệu cảm xúc cơ bản: Vui mừng, Buồn thảm, Giận dữ, Thích thú",
      estimatedTime: 5
    },
    { 
      id: "02_01_2-practice", 
      title: "Luyện tập cảm xúc", 
      type: 'trainer',
      description: "Thực hành biểu đạt cảm xúc qua ký hiệu",
      estimatedTime: 8
    },
    { 
      id: "02_01_3-iconic", 
      title: "Ký hiệu biểu tượng cảm xúc", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về cảm xúc cơ bản",
      estimatedTime: 4
    },
    { 
      id: "02_01_4-practice-advanced", 
      title: "Luyện tập nâng cao cảm xúc", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu cảm xúc",
      estimatedTime: 8
    },
    { 
      id: "02_01_5-review", 
      title: "Ôn tập cảm xúc", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về cảm xúc cơ bản",
      estimatedTime: 6
    },
  ],
  "2_2": [ // Unit 2: Cảm xúc và tâm trạng - Chapter 2: Cảm xúc nâng cao
    { 
      id: "02_02_1-discover", 
      title: "Khám phá cảm xúc nâng cao", 
      type: 'learn',
      description: "Học các cảm xúc phức tạp: Tự tin, Lo sợ, Ghen tị, Tuyệt vọng",
      estimatedTime: 5
    },
    { 
      id: "02_02_2-iconic", 
      title: "Ký hiệu biểu tượng cảm xúc nâng cao", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về cảm xúc nâng cao",
      estimatedTime: 4
    },
    { 
      id: "02_02_3-discover-advanced", 
      title: "Khám phá cảm xúc đặc biệt", 
      type: 'learn',
      description: "Học các cảm xúc đặc biệt và tinh tế",
      estimatedTime: 6
    },
    { 
      id: "02_02_4-practice", 
      title: "Luyện tập cảm xúc nâng cao", 
      type: 'trainer',
      description: "Thực hành các ký hiệu cảm xúc nâng cao đã học",
      estimatedTime: 8
    },
    { 
      id: "02_02_5-review", 
      title: "Ôn tập cảm xúc nâng cao", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về cảm xúc nâng cao",
      estimatedTime: 6
    },
  ],
  "3_1": [ // Unit 3: Thiên nhiên và động vật - Chapter 1: Động vật thường gặp
    { 
      id: "03_01_1-discover", 
      title: "Khám phá động vật", 
      type: 'learn',
      description: "Học ký hiệu động vật: Con chó, Con mèo, Con gà",
      estimatedTime: 5
    },
    { 
      id: "03_01_2-practice", 
      title: "Luyện tập động vật", 
      type: 'trainer',
      description: "Thực hành nhận biết và sử dụng ký hiệu động vật",
      estimatedTime: 8
    },
    { 
      id: "03_01_3-iconic", 
      title: "Ký hiệu biểu tượng động vật", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về động vật",
      estimatedTime: 4
    },
    { 
      id: "03_01_4-practice-advanced", 
      title: "Luyện tập nâng cao động vật", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu động vật",
      estimatedTime: 8
    },
    { 
      id: "03_01_5-review", 
      title: "Ôn tập động vật", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về động vật",
      estimatedTime: 6
    },
  ],
  "3_2": [ // Unit 3: Thiên nhiên và động vật - Chapter 2: Thời tiết và thời gian
    { 
      id: "03_02_1-discover", 
      title: "Khám phá thời tiết", 
      type: 'learn',
      description: "Học ký hiệu thời tiết: Mùa hè, Mùa đông, Mùa thu, Mưa phùn",
      estimatedTime: 5
    },
    { 
      id: "03_02_2-iconic", 
      title: "Ký hiệu biểu tượng thời tiết", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về thời tiết",
      estimatedTime: 4
    },
    { 
      id: "03_02_3-discover-advanced", 
      title: "Khám phá thời gian", 
      type: 'learn',
      description: "Học từ vựng về thời gian: Sáng, Buổi sáng, Buổi chiều",
      estimatedTime: 6
    },
    { 
      id: "03_02_4-practice", 
      title: "Luyện tập thời tiết", 
      type: 'trainer',
      description: "Thực hành ký hiệu thời tiết và thời gian",
      estimatedTime: 8
    },
    { 
      id: "03_02_5-review", 
      title: "Ôn tập thời tiết", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về thời tiết và thời gian",
      estimatedTime: 6
    },
  ],
  "4_1": [ // Unit 4: Số đếm và hình học - Chapter 1: Số đếm cơ bản
    { 
      id: "04_01_1-discover", 
      title: "Khám phá số đếm", 
      type: 'learn',
      description: "Học ký hiệu số đếm cơ bản: Số 1, Số 2, Số 3",
      estimatedTime: 5
    },
    { 
      id: "04_01_2-practice", 
      title: "Luyện tập số đếm", 
      type: 'trainer',
      description: "Thực hành nhận biết và sử dụng ký hiệu số đếm",
      estimatedTime: 8
    },
    { 
      id: "04_01_3-iconic", 
      title: "Ký hiệu biểu tượng số", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về số đếm",
      estimatedTime: 4
    },
    { 
      id: "04_01_4-practice-advanced", 
      title: "Luyện tập nâng cao số đếm", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu số đếm",
      estimatedTime: 8
    },
    { 
      id: "04_01_5-review", 
      title: "Ôn tập số đếm", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về số đếm",
      estimatedTime: 6
    },
  ],
  "4_2": [ // Unit 4: Số đếm và hình học - Chapter 2: Hình dạng và màu sắc
    { 
      id: "04_02_1-discover", 
      title: "Khám phá hình học", 
      type: 'learn',
      description: "Học ký hiệu hình dạng: Hình tam giác, Hình tròn, Hình vuông",
      estimatedTime: 5
    },
    { 
      id: "04_02_2-iconic", 
      title: "Ký hiệu biểu tượng hình học", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về hình dạng",
      estimatedTime: 4
    },
    { 
      id: "04_02_3-discover-advanced", 
      title: "Khám phá màu sắc", 
      type: 'learn',
      description: "Học từ vựng về màu sắc: Màu đỏ và các màu khác",
      estimatedTime: 6
    },
    { 
      id: "04_02_4-practice", 
      title: "Luyện tập hình học", 
      type: 'trainer',
      description: "Thực hành ký hiệu hình dạng và màu sắc",
      estimatedTime: 8
    },
    { 
      id: "04_02_5-review", 
      title: "Ôn tập hình học", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về hình dạng và màu sắc",
      estimatedTime: 6
    },
  ],
  "5_1": [ // Unit 5: Thức ăn và đồ vật - Chapter 1: Thức ăn và bữa ăn
    { 
      id: "05_01_1-discover", 
      title: "Khám phá thức ăn", 
      type: 'learn',
      description: "Học ký hiệu thức ăn: Cơm, Phở, Cái bánh mì, Cái bát",
      estimatedTime: 5
    },
    { 
      id: "05_01_2-practice", 
      title: "Luyện tập thức ăn", 
      type: 'trainer',
      description: "Thực hành ký hiệu thức ăn và bữa ăn",
      estimatedTime: 8
    },
    { 
      id: "05_01_3-iconic", 
      title: "Ký hiệu biểu tượng thức ăn", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về thức ăn",
      estimatedTime: 4
    },
    { 
      id: "05_01_4-practice-advanced", 
      title: "Luyện tập nâng cao thức ăn", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu thức ăn",
      estimatedTime: 8
    },
    { 
      id: "05_01_5-review", 
      title: "Ôn tập thức ăn", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về thức ăn",
      estimatedTime: 6
    },
  ],
  "5_2": [ // Unit 5: Thức ăn và đồ vật - Chapter 2: Đồ vật trong nhà
    { 
      id: "05_02_1-discover", 
      title: "Khám phá đồ vật", 
      type: 'learn',
      description: "Học ký hiệu đồ vật: Cái chảo, Cái nồi, Cửa sổ, Lá cây",
      estimatedTime: 5
    },
    { 
      id: "05_02_2-iconic", 
      title: "Ký hiệu biểu tượng đồ vật", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về đồ vật",
      estimatedTime: 4
    },
    { 
      id: "05_02_3-discover-advanced", 
      title: "Khám phá đồ vật cá nhân", 
      type: 'learn',
      description: "Học từ vựng về đồ vật: Cây bút, Quyển sách, Quần bò, Cái áo",
      estimatedTime: 6
    },
    { 
      id: "05_02_4-practice", 
      title: "Luyện tập đồ vật", 
      type: 'trainer',
      description: "Thực hành ký hiệu đồ vật trong nhà",
      estimatedTime: 8
    },
    { 
      id: "05_02_5-review", 
      title: "Ôn tập đồ vật", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về đồ vật",
      estimatedTime: 6
    },
  ],
  "6_1": [ // Unit 6: Giao thông và hoạt động - Chapter 1: Phương tiện giao thông
    { 
      id: "06_01_1-discover", 
      title: "Khám phá giao thông", 
      type: 'learn',
      description: "Học ký hiệu phương tiện: Ô tô, Xe máy, Tàu hỏa",
      estimatedTime: 5
    },
    { 
      id: "06_01_2-practice", 
      title: "Luyện tập giao thông", 
      type: 'trainer',
      description: "Thực hành ký hiệu phương tiện giao thông",
      estimatedTime: 8
    },
    { 
      id: "06_01_3-iconic", 
      title: "Ký hiệu biểu tượng giao thông", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về giao thông",
      estimatedTime: 4
    },
    { 
      id: "06_01_4-practice-advanced", 
      title: "Luyện tập nâng cao giao thông", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu giao thông",
      estimatedTime: 8
    },
    { 
      id: "06_01_5-review", 
      title: "Ôn tập giao thông", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về giao thông",
      estimatedTime: 6
    },
  ],
  "6_2": [ // Unit 6: Giao thông và hoạt động - Chapter 2: Hoạt động và sở thích
    { 
      id: "06_02_1-discover", 
      title: "Khám phá hoạt động", 
      type: 'learn',
      description: "Học ký hiệu hoạt động: Đá bóng, Đàn ghi ta, Giấc ngủ",
      estimatedTime: 5
    },
    { 
      id: "06_02_2-iconic", 
      title: "Ký hiệu biểu tượng hoạt động", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về hoạt động",
      estimatedTime: 4
    },
    { 
      id: "06_02_3-discover-advanced", 
      title: "Khám phá sở thích", 
      type: 'learn',
      description: "Mở rộng vốn từ về hoạt động và sở thích",
      estimatedTime: 6
    },
    { 
      id: "06_02_4-practice", 
      title: "Luyện tập hoạt động", 
      type: 'trainer',
      description: "Thực hành ký hiệu hoạt động và sở thích",
      estimatedTime: 8
    },
    { 
      id: "06_02_5-review", 
      title: "Ôn tập hoạt động", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về hoạt động",
      estimatedTime: 6
    },
  ],
  "7_1": [ // Unit 7: Trường học và công việc - Chapter 1: Cuộc sống học đường
    { 
      id: "07_01_1-discover", 
      title: "Khám phá trường học", 
      type: 'learn',
      description: "Học ký hiệu trường học: Cô giáo, Bảng học sinh",
      estimatedTime: 5
    },
    { 
      id: "07_01_2-practice", 
      title: "Luyện tập trường học", 
      type: 'trainer',
      description: "Thực hành ký hiệu trường học",
      estimatedTime: 8
    },
    { 
      id: "07_01_3-iconic", 
      title: "Ký hiệu biểu tượng trường học", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về trường học",
      estimatedTime: 4
    },
    { 
      id: "07_01_4-practice-advanced", 
      title: "Luyện tập nâng cao trường học", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu trường học",
      estimatedTime: 8
    },
    { 
      id: "07_01_5-review", 
      title: "Ôn tập trường học", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về trường học",
      estimatedTime: 6
    },
  ],
  "7_2": [ // Unit 7: Trường học và công việc - Chapter 2: Công việc và tiền bạc
    { 
      id: "07_02_1-discover", 
      title: "Khám phá công việc", 
      type: 'learn',
      description: "Học ký hiệu công việc: Cái máy in, Tờ tiền",
      estimatedTime: 5
    },
    { 
      id: "07_02_2-iconic", 
      title: "Ký hiệu biểu tượng công việc", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về công việc",
      estimatedTime: 4
    },
    { 
      id: "07_02_3-discover-advanced", 
      title: "Khám phá tiền bạc", 
      type: 'learn',
      description: "Mở rộng vốn từ về công việc và tiền bạc",
      estimatedTime: 6
    },
    { 
      id: "07_02_4-practice", 
      title: "Luyện tập công việc", 
      type: 'trainer',
      description: "Thực hành ký hiệu công việc và tiền bạc",
      estimatedTime: 8
    },
    { 
      id: "07_02_5-review", 
      title: "Ôn tập công việc", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về công việc",
      estimatedTime: 6
    },
  ],

  // Additional chapters to cover ALL remaining videos
  "8_1": [ // Unit 8: Cảm xúc nâng cao - Chapter 1: Cảm xúc phức tạp
    { 
      id: "08_01_1-discover", 
      title: "Khám phá cảm xúc phức tạp", 
      type: 'learn',
      description: "Học các cảm xúc phức tạp: Nghẹn ngào, Cô đơn, Giận dỗi, Nổi giận",
      estimatedTime: 5
    },
    { 
      id: "08_01_2-practice", 
      title: "Luyện tập cảm xúc phức tạp", 
      type: 'trainer',
      description: "Thực hành biểu đạt cảm xúc phức tạp",
      estimatedTime: 8
    },
    { 
      id: "08_01_3-iconic", 
      title: "Ký hiệu biểu tượng cảm xúc sâu", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về cảm xúc phức tạp",
      estimatedTime: 4
    },
    { 
      id: "08_01_4-practice-advanced", 
      title: "Luyện tập nâng cao cảm xúc phức tạp", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu cảm xúc phức tạp",
      estimatedTime: 8
    },
    { 
      id: "08_01_5-review", 
      title: "Ôn tập cảm xúc phức tạp", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về cảm xúc phức tạp",
      estimatedTime: 6
    },
  ],

  "8_2": [ // Unit 8: Cảm xúc nâng cao - Chapter 2: Cảm xúc đặc biệt
    { 
      id: "08_02_1-discover", 
      title: "Khám phá cảm xúc đặc biệt", 
      type: 'learn',
      description: "Học các cảm xúc đặc biệt: Tự tin, Lo sợ, Ghen tị, Tuyệt vọng",
      estimatedTime: 5
    },
    { 
      id: "08_02_2-iconic", 
      title: "Ký hiệu biểu tượng cảm xúc đặc biệt", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về cảm xúc đặc biệt",
      estimatedTime: 4
    },
    { 
      id: "08_02_3-discover-advanced", 
      title: "Khám phá cảm xúc hiếm gặp", 
      type: 'learn',
      description: "Mở rộng vốn từ về cảm xúc đặc biệt và hiếm gặp",
      estimatedTime: 6
    },
    { 
      id: "08_02_4-practice", 
      title: "Luyện tập cảm xúc đặc biệt", 
      type: 'trainer',
      description: "Thực hành biểu đạt cảm xúc đặc biệt",
      estimatedTime: 8
    },
    { 
      id: "08_02_5-review", 
      title: "Ôn tập cảm xúc đặc biệt", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về cảm xúc đặc biệt",
      estimatedTime: 6
    },
  ],

  "9_1": [ // Unit 9: Đồ vật và dụng cụ - Chapter 1: Đồ vật học tập
    { 
      id: "09_01_1-discover", 
      title: "Khám phá đồ vật học tập", 
      type: 'learn',
      description: "Học ký hiệu đồ vật học tập: Cây bút, Quyển sách",
      estimatedTime: 5
    },
    { 
      id: "09_01_2-practice", 
      title: "Luyện tập đồ vật học tập", 
      type: 'trainer',
      description: "Thực hành ký hiệu đồ vật học tập",
      estimatedTime: 8
    },
    { 
      id: "09_01_3-iconic", 
      title: "Ký hiệu biểu tượng đồ vật học tập", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về đồ vật học tập",
      estimatedTime: 4
    },
    { 
      id: "09_01_4-practice-advanced", 
      title: "Luyện tập nâng cao đồ vật học tập", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu đồ vật học tập",
      estimatedTime: 8
    },
    { 
      id: "09_01_5-review", 
      title: "Ôn tập đồ vật học tập", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về đồ vật học tập",
      estimatedTime: 6
    },
  ],

  "9_2": [ // Unit 9: Đồ vật và dụng cụ - Chapter 2: Đồ vật cá nhân
    { 
      id: "09_02_1-discover", 
      title: "Khám phá đồ vật cá nhân", 
      type: 'learn',
      description: "Học ký hiệu đồ vật cá nhân: Quần bò, Cái áo",
      estimatedTime: 5
    },
    { 
      id: "09_02_2-iconic", 
      title: "Ký hiệu biểu tượng đồ vật cá nhân", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về đồ vật cá nhân",
      estimatedTime: 4
    },
    { 
      id: "09_02_3-discover-advanced", 
      title: "Khám phá thời trang", 
      type: 'learn',
      description: "Mở rộng vốn từ về đồ vật cá nhân và thời trang",
      estimatedTime: 6
    },
    { 
      id: "09_02_4-practice", 
      title: "Luyện tập đồ vật cá nhân", 
      type: 'trainer',
      description: "Thực hành ký hiệu đồ vật cá nhân",
      estimatedTime: 8
    },
    { 
      id: "09_02_5-review", 
      title: "Ôn tập đồ vật cá nhân", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về đồ vật cá nhân",
      estimatedTime: 6
    },
  ],

  "10_1": [ // Unit 10: Thiên nhiên và môi trường - Chapter 1: Thực vật
    { 
      id: "10_01_1-discover", 
      title: "Khám phá thực vật", 
      type: 'learn',
      description: "Học ký hiệu thực vật: Lá cây",
      estimatedTime: 5
    },
    { 
      id: "10_01_2-practice", 
      title: "Luyện tập thực vật", 
      type: 'trainer',
      description: "Thực hành ký hiệu thực vật",
      estimatedTime: 8
    },
    { 
      id: "10_01_3-iconic", 
      title: "Ký hiệu biểu tượng thực vật", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về thực vật",
      estimatedTime: 4
    },
    { 
      id: "10_01_4-practice-advanced", 
      title: "Luyện tập nâng cao thực vật", 
      type: 'trainer',
      description: "Thực hành nâng cao các ký hiệu thực vật",
      estimatedTime: 8
    },
    { 
      id: "10_01_5-review", 
      title: "Ôn tập thực vật", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về thực vật",
      estimatedTime: 6
    },
  ],

  "10_2": [ // Unit 10: Thiên nhiên và môi trường - Chapter 2: Môi trường sống
    { 
      id: "10_02_1-discover", 
      title: "Khám phá môi trường sống", 
      type: 'learn',
      description: "Học ký hiệu môi trường: Cửa sổ (không gian sống)",
      estimatedTime: 5
    },
    { 
      id: "10_02_2-iconic", 
      title: "Ký hiệu biểu tượng môi trường", 
      type: 'learn',
      description: "Học ký hiệu đặc trưng về môi trường",
      estimatedTime: 4
    },
    { 
      id: "10_02_3-discover-advanced", 
      title: "Khám phá không gian sống", 
      type: 'learn',
      description: "Mở rộng vốn từ về môi trường và không gian sống",
      estimatedTime: 6
    },
    { 
      id: "10_02_4-practice", 
      title: "Luyện tập môi trường", 
      type: 'trainer',
      description: "Thực hành ký hiệu môi trường sống",
      estimatedTime: 8
    },
    { 
      id: "10_02_5-review", 
      title: "Ôn tập môi trường", 
      type: 'milestone',
      description: "Tổng hợp kiến thức về môi trường",
      estimatedTime: 6
    },
  ],
};

export async function fetchChapterLessons(chapterId: string): Promise<LessonSummary[]> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 150));
  
  // Return lessons for the specific chapter, or empty array if not found
  return CHAPTER_LESSON_STRUCTURE[chapterId] || [];
}


