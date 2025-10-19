import React from 'react';
import { Button } from '../../shared/ui/button';

interface CameraPracticeThankYouScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const CameraPracticeThankYouScreen: React.FC<CameraPracticeThankYouScreenProps> = ({
  onComplete,
  onBack
}) => {
  return (
    <div className="flex-1 bg-orange-50 p-5 justify-between">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-30 h-30 rounded-full bg-orange-500 flex justify-center items-center mb-8">
          <span className="text-6xl">🎉</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">Cảm ơn bạn!</h1>
        
        <p className="text-lg text-gray-600 text-center leading-relaxed mb-10 px-5">
          Cảm ơn bạn đã hoàn thành buổi thực hành camera. Phản hồi của bạn giúp chúng tôi cải thiện trải nghiệm học tập cho mọi người.
        </p>
        
        <div className="w-full mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Bước tiếp theo?</h2>
          
          <div className="flex flex-row items-start mb-4 px-5">
            <span className="text-2xl mr-4 mt-0.5">📚</span>
            <p className="text-base text-gray-600 leading-relaxed flex-1">
              Tiếp tục với các bài học thường xuyên để xây dựng thêm từ vựng
            </p>
          </div>
          
          <div className="flex flex-row items-start mb-4 px-5">
            <span className="text-2xl mr-4 mt-0.5">🔄</span>
            <p className="text-base text-gray-600 leading-relaxed flex-1">
              Thực hành lại bất cứ lúc nào để cải thiện độ chính xác
            </p>
          </div>
          
          <div className="flex flex-row items-start mb-4 px-5">
            <span className="text-2xl mr-4 mt-0.5">🌟</span>
            <p className="text-base text-gray-600 leading-relaxed flex-1">
              Chia sẻ tiến độ của bạn với bạn bè và gia đình
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-500 mx-5">
          <p className="text-base italic text-gray-800 leading-relaxed mb-2">
            "Mọi chuyên gia đều từng là người mới bắt đầu. Mọi chuyên nghiệp đều từng là nghiệp dư. Mọi biểu tượng đều từng là vô danh."
          </p>
          <p className="text-sm text-gray-600 text-right">- Robin Sharma</p>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={onComplete} className="bg-orange-500 py-4 px-8 rounded-lg">
          Tiếp tục học
        </Button>
        
        <Button onClick={onBack} variant="ghost" className="py-3 px-6">
          Quay lại thực hành
        </Button>
      </div>
    </div>
  );
};


export default CameraPracticeThankYouScreen;
