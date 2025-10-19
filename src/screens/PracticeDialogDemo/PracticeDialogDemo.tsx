import React, { useState } from "react";
import PracticeLessonScreen from "../PracticeLessonScreen/PracticeLessonScreen";
import DialogLessonScreen from "../DialogLessonScreen/DialogLessonScreen";
import QuestionTypeRenderer from "../../components/QuestionTypeRenderer/QuestionTypeRenderer";

// Demo component to showcase all practice and dialog lesson types
export const PracticeDialogDemo: React.FC = () => {
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  // Mock questions for different types
  const practiceQuestions = [
    {
      id: 1,
      category: '2a',
      title: 'Chọn ký hiệu đúng cho "Chào"',
      type: 'single' as const,
      questionParts: [
        {
          type: 'html' as const,
          content: '<p>Chọn video đúng cho từ "Chào"</p>'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Vẫy tay',
          isCorrect: true,
          media: {
            type: 'video' as const,
            url: '/resources/videos/hello-wave.mp4',
            label: 'Vẫy tay',
            caption: 'Cử chỉ vẫy tay chào'
          }
        },
        {
          id: 2,
          answerText: 'Nhảy',
          isCorrect: false,
          media: {
            type: 'video' as const,
            url: '/resources/videos/jump.mp4',
            label: 'Nhảy',
            caption: 'Cử chỉ nhảy'
          }
        }
      ]
    }
  ];

  const dialogQuestions = [
    {
      id: 1,
      category: 'dialog',
      title: 'Hội thoại chào hỏi',
      type: 'dialog' as const,
      questionParts: [
        {
          type: 'video' as const,
          url: '/resources/videos/dialog-hello-a.mp4',
          content: 'Xin chào!',
          caption: 'Person A: Xin chào!',
          dialogPerson: 'a' as const,
          order: 1
        },
        {
          type: 'video' as const,
          url: '/resources/videos/dialog-hello-b.mp4',
          content: 'Chào bạn!',
          caption: 'Person B: Chào bạn!',
          dialogPerson: 'b' as const,
          order: 2
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Xin chào!',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'Tạm biệt!',
          isCorrect: false
        }
      ]
    }
  ];

  const contentQuestions = [
    {
      id: 1,
      category: '1a',
      title: 'Học ký hiệu chào hỏi',
      type: 'content' as const,
      questionParts: [
        {
          type: 'video' as const,
          url: '/resources/videos/hello-sign-demo.mp4',
          content: 'Chào',
          caption: 'Cách chào hỏi cơ bản'
        }
      ],
      answerOptions: []
    }
  ];

  const singleChoiceQuestions = [
    {
      id: 1,
      category: '2a',
      title: 'Chọn ký hiệu đúng',
      type: 'single' as const,
      questionParts: [
        {
          type: 'html' as const,
          content: '<p>Chọn video đúng cho từ "Chào"</p>'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Vẫy tay',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'Nhảy',
          isCorrect: false
        }
      ]
    }
  ];

  const multipleChoiceQuestions = [
    {
      id: 1,
      category: '3a',
      title: 'Chọn tất cả ký hiệu về gia đình',
      type: 'multiple' as const,
      questionParts: [
        {
          type: 'html' as const,
          content: '<p>Chọn tất cả ký hiệu liên quan đến gia đình</p>'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'Bố',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'Mẹ',
          isCorrect: true
        },
        {
          id: 3,
          answerText: 'Bạn',
          isCorrect: false
        },
        {
          id: 4,
          answerText: 'Anh',
          isCorrect: true
        }
      ]
    }
  ];

  const clozeQuestions = [
    {
      id: 1,
      category: '4a',
      title: 'Điền từ vào chỗ trống',
      type: 'cloze_answer' as const,
      questionParts: [
        {
          type: 'video' as const,
          url: '/resources/videos/hello-sign-demo.mp4',
          content: 'Chào',
          caption: 'Ký hiệu này có nghĩa là gì?'
        }
      ],
      answerOptions: [
        {
          id: 1,
          answerText: 'chào',
          isCorrect: true
        },
        {
          id: 2,
          answerText: 'tạm biệt',
          isCorrect: false
        }
      ]
    }
  ];

  const demos = [
    {
      id: 'practice',
      title: 'Practice Lesson',
      description: 'Luyện tập với các câu hỏi đa dạng',
      component: 'PracticeLessonScreen',
      color: 'blue'
    },
    {
      id: 'dialog',
      title: 'Dialog Lesson',
      description: 'Học hội thoại với video hai người',
      component: 'DialogLessonScreen',
      color: 'purple'
    },
    {
      id: 'content',
      title: 'Content Question',
      description: 'Học nội dung với video và text',
      component: 'ContentQuestion',
      color: 'green'
    },
    {
      id: 'single',
      title: 'Single Choice',
      description: 'Chọn một đáp án đúng',
      component: 'SingleChoiceQuestion',
      color: 'orange'
    },
    {
      id: 'multiple',
      title: 'Multiple Choice',
      description: 'Chọn nhiều đáp án đúng',
      component: 'MultipleChoiceQuestion',
      color: 'indigo'
    },
    {
      id: 'cloze',
      title: 'Cloze Answer',
      description: 'Điền từ vào chỗ trống',
      component: 'ClozeAnswerQuestion',
      color: 'pink'
    }
  ];

  const handleAnswerSelect = (optionId: number) => {
    if (currentDemo === 'multiple') {
      setSelectedAnswers(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedAnswers([optionId]);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswers.length === 0) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const isCorrect = selectedAnswers.every(answerId => {
      const option = currentQuestion.answerOptions.find(opt => opt.id === answerId);
      return option?.isCorrect;
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
    setTimeSpent(0);
  };

  const handleComplete = (finalScore: number, totalQuestions: number) => {
    console.log(`Completed with score: ${finalScore}/${totalQuestions}`);
    setCurrentDemo(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
    setTimeSpent(0);
  };

  const getCurrentQuestion = () => {
    switch (currentDemo) {
      case 'practice': return practiceQuestions[currentQuestionIndex];
      case 'dialog': return dialogQuestions[currentQuestionIndex];
      case 'content': return contentQuestions[currentQuestionIndex];
      case 'single': return singleChoiceQuestions[currentQuestionIndex];
      case 'multiple': return multipleChoiceQuestions[currentQuestionIndex];
      case 'cloze': return clozeQuestions[currentQuestionIndex];
      default: return null;
    }
  };

  const getTotalQuestions = () => {
    switch (currentDemo) {
      case 'practice': return practiceQuestions.length;
      case 'dialog': return dialogQuestions.length;
      case 'content': return contentQuestions.length;
      case 'single': return singleChoiceQuestions.length;
      case 'multiple': return multipleChoiceQuestions.length;
      case 'cloze': return clozeQuestions.length;
      default: return 1;
    }
  };

  if (currentDemo) {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    if (currentDemo === 'practice') {
      return (
        <PracticeLessonScreen
          lessonId="demo-practice"
          onComplete={handleComplete}
          onBack={() => setCurrentDemo(null)}
        />
      );
    }

    if (currentDemo === 'dialog') {
      return (
        <DialogLessonScreen
          lessonId="demo-dialog"
          onComplete={handleComplete}
          onBack={() => setCurrentDemo(null)}
        />
      );
    }

    return (
      <QuestionTypeRenderer
        question={currentQuestion}
        selectedAnswers={selectedAnswers}
        showResult={showResult}
        onAnswerSelect={handleAnswerSelect}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentQuestionIndex >= getTotalQuestions() - 1}
        score={score}
        totalQuestions={getTotalQuestions()}
        timeSpent={timeSpent}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Practice & Dialog Lesson Demo
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá các loại lesson và câu hỏi khác nhau
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setCurrentDemo(demo.id)}
              className={`p-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl text-left ${
                demo.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                demo.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                demo.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                demo.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
                demo.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                'bg-pink-500 hover:bg-pink-600'
              } text-white`}
            >
              <div className="text-2xl mb-3">
                {demo.id === 'practice' ? '🏋️' :
                 demo.id === 'dialog' ? '💬' :
                 demo.id === 'content' ? '📚' :
                 demo.id === 'single' ? '☑️' :
                 demo.id === 'multiple' ? '☑️☑️' :
                 '✏️'}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {demo.title}
              </h3>
              <p className="text-sm opacity-90">
                {demo.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tính năng chính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🎯 Question Types
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Content - Học nội dung</li>
                <li>• Single Choice - Lựa chọn đơn</li>
                <li>• Multiple Choice - Lựa chọn nhiều</li>
                <li>• Cloze Answer - Điền từ</li>
                <li>• Dialog - Hội thoại</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🎨 UI Features
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive Design</li>
                <li>• Video Support</li>
                <li>• Image Support</li>
                <li>• Animations</li>
                <li>• Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDialogDemo;
