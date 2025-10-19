// Iconic vocabulary data for all chapters
export const iconicVocabularyByChapter = {
  "1_1": [ // Chào hỏi và lịch sự
    {
      id: 1,
      word: "Chào hỏi",
      video: "/resources/videos/Chào.mp4",
      instruction: "Học ký hiệu chào hỏi - ký hiệu giao tiếp cơ bản",
      difficulty: "easy",
      points: 10,
      timeLimit: 15,
      questionType: "picture_choice",
      description: "Ký hiệu chào hỏi thể hiện sự thân thiện và lịch sự",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=1",
          text: "Bắt tay chào hỏi",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=2",
          text: "Vẫy tay tạm biệt",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    {
      id: 2,
      word: "Tạm biệt",
      video: "/resources/videos/tạm biệt.mp4",
      instruction: "Học ký hiệu tạm biệt - kết thúc cuộc trò chuyện",
      difficulty: "easy",
      points: 10,
      timeLimit: 15,
      questionType: "picture_choice",
      description: "Ký hiệu tạm biệt để kết thúc giao tiếp lịch sự",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=3",
          text: "Vẫy tay tạm biệt",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=4",
          text: "Bắt tay chào hỏi",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    {
      id: 3,
      word: "Xin lỗi",
      video: "/resources/videos/xin lỗi.mp4",
      instruction: "Học ký hiệu xin lỗi - thể hiện sự hối hận",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "picture_choice",
      description: "Ký hiệu xin lỗi thể hiện sự hối hận và lịch sự",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=5",
          text: "Xin lỗi một cách chân thành",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=6",
          text: "Cảm ơn",
          isCorrect: false,
          type: "image" as const
        }
      ]
    }
  ],
  "2_1": [ // Cảm xúc nâng cao - 2 kiểu câu hỏi mỗi từ (5 từ)
    // Hoảng sợ - Kiểu 1: Nhìn video chọn ảnh giống nghĩa
    {
      id: 1,
      word: "Hoảng sợ",
      video: "/resources/videos/hoảng_sợ.mp4",
      instruction: "Xem video và chọn ảnh đúng cho ký hiệu hoảng sợ",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "video_choice",
      description: "Ký hiệu hoảng sợ thể hiện sự sợ hãi dữ dội",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=17",
          text: "Khuôn mặt hoảng sợ",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=18",
          text: "Khuôn mặt lo lắng",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    // Hoảng sợ - Kiểu 2: Hiển thị ảnh, chọn 1 trong 2 video
    {
      id: 2,
      word: "Hoảng sợ",
      video: "/resources/videos/hoảng_sợ.mp4",
      instruction: "Nhìn ảnh và chọn video đúng cho ký hiệu hoảng sợ",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "picture_choice",
      description: "Ký hiệu hoảng sợ thể hiện sự sợ hãi dữ dội",
      options: [
        {
          id: 1,
          video: "/resources/videos/hoảng_sợ.mp4",
          text: "Video hoảng sợ",
          isCorrect: true,
          type: "video" as const
        },
        {
          id: 2,
          video: "/resources/videos/vui mừng - nam.mp4",
          text: "Video vui mừng",
          isCorrect: false,
          type: "video" as const
        }
      ]
    },
    // Lo sợ - Kiểu 1: Nhìn video chọn ảnh giống nghĩa
    {
      id: 3,
      word: "Lo sợ",
      video: "/resources/videos/lo_sợ.mp4",
      instruction: "Xem video và chọn ảnh đúng cho ký hiệu lo sợ",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "video_choice",
      description: "Ký hiệu lo sợ thể hiện sự lo lắng và bất an",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=21",
          text: "Khuôn mặt lo sợ",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=22",
          text: "Khuôn mặt hoảng sợ",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    // Lo sợ - Kiểu 2: Hiển thị ảnh, chọn 1 trong 2 video
    {
      id: 4,
      word: "Lo sợ",
      video: "/resources/videos/lo_sợ.mp4",
      instruction: "Nhìn ảnh và chọn video đúng cho ký hiệu lo sợ",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "picture_choice",
      description: "Ký hiệu lo sợ thể hiện sự lo lắng và bất an",
      options: [
        {
          id: 1,
          video: "/resources/videos/lo_sợ.mp4",
          text: "Video lo sợ",
          isCorrect: true,
          type: "video" as const
        },
        {
          id: 2,
          video: "/resources/videos/thích_thú.mp4",
          text: "Video thích thú",
          isCorrect: false,
          type: "video" as const
        }
      ]
    },
    // Tuyệt vọng - Kiểu 1: Nhìn video chọn ảnh giống nghĩa
    {
      id: 5,
      word: "Tuyệt vọng",
      video: "/resources/videos/tuyệt_vọng.mp4",
      instruction: "Xem video và chọn ảnh đúng cho ký hiệu tuyệt vọng",
      difficulty: "hard",
      points: 20,
      timeLimit: 25,
      questionType: "video_choice",
      description: "Ký hiệu tuyệt vọng thể hiện sự thất vọng và mất hy vọng",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=25",
          text: "Khuôn mặt tuyệt vọng",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=26",
          text: "Khuôn mặt buồn",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    // Tuyệt vọng - Kiểu 2: Hiển thị ảnh, chọn 1 trong 2 video
    {
      id: 6,
      word: "Tuyệt vọng",
      video: "/resources/videos/tuyệt_vọng.mp4",
      instruction: "Nhìn ảnh và chọn video đúng cho ký hiệu tuyệt vọng",
      difficulty: "hard",
      points: 20,
      timeLimit: 25,
      questionType: "picture_choice",
      description: "Ký hiệu tuyệt vọng thể hiện sự thất vọng và mất hy vọng",
      options: [
        {
          id: 1,
          video: "/resources/videos/tuyệt_vọng.mp4",
          text: "Video tuyệt vọng",
          isCorrect: true,
          type: "video" as const
        },
        {
          id: 2,
          video: "/resources/videos/giận_dữ.mp4",
          text: "Video giận dữ",
          isCorrect: false,
          type: "video" as const
        }
      ]
    },
    // Hồi hộp - Kiểu 1: Nhìn video chọn ảnh giống nghĩa
    {
      id: 7,
      word: "Hồi hộp",
      video: "/resources/videos/hồi_hộp.mp4",
      instruction: "Xem video và chọn ảnh đúng cho ký hiệu hồi hộp",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "video_choice",
      description: "Ký hiệu hồi hộp thể hiện sự phấn khích và lo lắng",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=29",
          text: "Khuôn mặt hồi hộp",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=30",
          text: "Khuôn mặt bình thường",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    // Hồi hộp - Kiểu 2: Hiển thị ảnh, chọn 1 trong 2 video
    {
      id: 8,
      word: "Hồi hộp",
      video: "/resources/videos/hồi_hộp.mp4",
      instruction: "Nhìn ảnh và chọn video đúng cho ký hiệu hồi hộp",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "picture_choice",
      description: "Ký hiệu hồi hộp thể hiện sự phấn khích và lo lắng",
      options: [
        {
          id: 1,
          video: "/resources/videos/hồi_hộp.mp4",
          text: "Video hồi hộp",
          isCorrect: true,
          type: "video" as const
        },
        {
          id: 2,
          video: "/resources/videos/Ngạc_nhiên.mp4",
          text: "Video ngạc nhiên",
          isCorrect: false,
          type: "video" as const
        }
      ]
    },
    // Bối rối - Kiểu 1: Nhìn video chọn ảnh giống nghĩa
    {
      id: 9,
      word: "Bối rối",
      video: "/resources/videos/bối_rối.mp4",
      instruction: "Xem video và chọn ảnh đúng cho ký hiệu bối rối",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "video_choice",
      description: "Ký hiệu bối rối thể hiện sự không hiểu rõ và lúng túng",
      options: [
        {
          id: 1,
          image: "https://picsum.photos/300/300?random=33",
          text: "Khuôn mặt bối rối",
          isCorrect: true,
          type: "image" as const
        },
        {
          id: 2,
          image: "https://picsum.photos/300/300?random=34",
          text: "Khuôn mặt ngạc nhiên",
          isCorrect: false,
          type: "image" as const
        }
      ]
    },
    // Bối rối - Kiểu 2: Hiển thị ảnh, chọn 1 trong 2 video
    {
      id: 10,
      word: "Bối rối",
      video: "/resources/videos/bối_rối.mp4",
      instruction: "Nhìn ảnh và chọn video đúng cho ký hiệu bối rối",
      difficulty: "medium",
      points: 15,
      timeLimit: 20,
      questionType: "picture_choice",
      description: "Ký hiệu bối rối thể hiện sự không hiểu rõ và lúng túng",
      options: [
        {
          id: 1,
          video: "/resources/videos/bối_rối.mp4",
          text: "Video bối rối",
          isCorrect: true,
          type: "video" as const
        },
        {
          id: 2,
          video: "/resources/videos/tự_tin.mp4",
          text: "Video tự tin",
          isCorrect: false,
          type: "video" as const
        }
      ]
    }
  ]
};