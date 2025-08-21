import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zenflow.app',
  appName: 'ZenFlow',
  webDir: 'dist',
  server: {
    url: 'https://a43515af-5a27-442f-b81d-5e4c4b5fe872.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Haptics: {
      // Enable haptic feedback for meditation sessions
    }
  }
};

export default config;