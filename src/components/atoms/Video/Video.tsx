import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface VideoProps {
  source: string;
  onMirrorPress?: () => void;
  label?: string;
  testID?: string;
  accessibilityLabel?: string;
  style?: any;
}

const Video: React.FC<VideoProps> = ({
  source,
  onMirrorPress,
  label,
  testID = 'video',
  accessibilityLabel,
  style
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {/* Video Placeholder */}
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>Video Player</Text>
          <Text style={styles.videoSource}>{source}</Text>
        </View>
        
        {/* Mirror Button */}
        {onMirrorPress && (
          <TouchableOpacity
            style={styles.mirrorButton}
            onPress={onMirrorPress}
            testID="mirror-button"
            accessibilityLabel={accessibilityLabel || 'Open sign mirror'}
            accessibilityRole="button"
          >
            <View style={styles.mirrorIcon}>
              <Text style={styles.mirrorIconText}>🪞</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Video Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  videoContainer: {
    position: 'relative',
    aspectRatio: 16 / 10,
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  videoSource: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  mirrorButton: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mirrorIcon: {
    width: 24,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mirrorIconText: {
    fontSize: 20,
  },
  labelContainer: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292F32',
    textAlign: 'center',
  },
});

export default Video;
