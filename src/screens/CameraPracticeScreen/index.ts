// Platform-specific imports
const isWeb = typeof window !== 'undefined';

const CameraPracticeScreen = isWeb
  ? require('./CameraPracticeScreen.web').default
  : require('./CameraPracticeScreen').default;

export default CameraPracticeScreen;
