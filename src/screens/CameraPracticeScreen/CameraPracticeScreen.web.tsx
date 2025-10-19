import React from 'react';

interface CameraPracticeScreenProps {
  onComplete: (result: any) => void;
  onBack: () => void;
}

const CameraPracticeScreen: React.FC<CameraPracticeScreenProps> = ({
  onBack
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>📱</span>
        </div>
        
        <h1 style={styles.title}>Thực hành Camera</h1>
        
        <p style={styles.message}>
          Thực hành ngôn ngữ ký hiệu chỉ có sẵn trên thiết bị Android.
        </p>
        
        <p style={styles.subMessage}>
          Để sử dụng tính năng này, vui lòng truy cập ứng dụng từ thiết bị Android.
        </p>
        
        <button onClick={onBack} style={styles.button}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFF8F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '400px',
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
  },
  icon: {
    fontSize: '40px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#292F32',
    marginBottom: '16px',
    textAlign: 'center' as const,
    margin: 0,
  },
  message: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center' as const,
    marginBottom: '12px',
    lineHeight: '24px',
    margin: 0,
  },
  subMessage: {
    fontSize: '16px',
    color: '#888',
    textAlign: 'center' as const,
    marginBottom: '32px',
    lineHeight: '22px',
    margin: 0,
  },
  button: {
    backgroundColor: '#EB6837',
    padding: '14px 32px',
    borderRadius: '8px',
    minWidth: '120px',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default CameraPracticeScreen;
