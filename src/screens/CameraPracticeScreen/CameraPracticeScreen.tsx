import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button } from '../../shared/ui/button';
import { Progress } from '../../shared/ui/progress';

interface CameraPracticeScreenProps {
  onComplete: (result: CameraPracticeResult) => void;
  onBack: () => void;
}

interface CameraPracticeResult {
  score: number;
  accuracy: number;
  timeSpent: number;
  signsPracticed: string[];
}

const CameraPracticeScreen: React.FC<CameraPracticeScreenProps> = ({
  onComplete,
  onBack
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSign, setCurrentSign] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const cameraRef = useRef<Camera>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const signsToPractice = [
    'XIN CHÀO',
    'CẢM ƠN',
    'LÀM ƠN',
    'XIN LỖI',
    'CÓ',
    'KHÔNG',
    'TỐT',
    'XẤU',
    'VUI',
    'BUỒN'
  ];

  useEffect(() => {
    getCameraPermissions();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const startPractice = () => {
    setIsRecording(true);
    setTimeElapsed(0);
    setProgress(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopPractice = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    analyzeResults();
  };

  const analyzeResults = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate results
    const result: CameraPracticeResult = {
      score: Math.floor(Math.random() * 40) + 60, // 60-100
      accuracy: Math.floor(Math.random() * 30) + 70, // 70-100
      timeSpent: timeElapsed,
      signsPracticed: signsToPractice.slice(0, currentSign + 1)
    };
    
    setIsAnalyzing(false);
    onComplete(result);
  };

  const nextSign = () => {
    if (currentSign < signsToPractice.length - 1) {
      setCurrentSign(prev => prev + 1);
      setProgress(((currentSign + 1) / signsToPractice.length) * 100);
    } else {
      stopPractice();
    }
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thực hành Camera</Text>
        <Text style={styles.message}>
          Thực hành ngôn ngữ ký hiệu chỉ có sẵn trên thiết bị Android.
        </Text>
        <Button onPress={onBack} style={styles.button}>
          Quay lại
        </Button>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đang yêu cầu quyền camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cần quyền truy cập Camera</Text>
        <Text style={styles.message}>
          Vui lòng cho phép truy cập camera để sử dụng tính năng này.
        </Text>
        <Button onPress={getCameraPermissions} style={styles.button}>
          Cấp quyền
        </Button>
        <Button onPress={onBack} style={[styles.button, styles.secondaryButton]}>
          Quay lại
        </Button>
      </View>
    );
  }

  if (isAnalyzing) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đang phân tích buổi thực hành</Text>
        <Text style={styles.message}>
          Vui lòng đợi trong khi chúng tôi phân tích buổi thực hành ngôn ngữ ký hiệu của bạn...
        </Text>
        <View style={styles.loadingContainer}>
          <View style={styles.spinner} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={onBack} variant="ghost" style={styles.backButton}>
          ← Quay lại
        </Button>
        <Text style={styles.title}>Thực hành Camera</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Ký hiệu {currentSign + 1} trong {signsToPractice.length}
        </Text>
        <Progress value={progress} className="w-full" />
      </View>

      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={CameraType.front}
          ref={cameraRef}
        >
          <View style={styles.overlay}>
            <View style={styles.signContainer}>
              <Text style={styles.signText}>
                {signsToPractice[currentSign]}
              </Text>
              <Text style={styles.instructionText}>
                Thực hành ký hiệu này trước camera
              </Text>
            </View>
          </View>
        </Camera>
      </View>

      <View style={styles.controls}>
        {!isRecording ? (
          <Button onPress={startPractice} style={styles.primaryButton}>
            Bắt đầu thực hành
          </Button>
        ) : (
          <View style={styles.recordingControls}>
            <Button onPress={nextSign} style={styles.secondaryButton}>
              Ký hiệu tiếp theo
            </Button>
            <Button onPress={stopPractice} variant="destructive" style={styles.primaryButton}>
              Kết thúc thực hành
            </Button>
          </View>
        )}
      </View>

      {isRecording && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#292F32',
  },
  placeholder: {
    width: 60,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  signContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  signText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  controls: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#EB6837',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 12,
  },
  recordingControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EB6837',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  spinner: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderTopColor: '#EB6837',
    borderRadius: 20,
    animation: 'spin 1s linear infinite',
  },
});

export default CameraPracticeScreen;
