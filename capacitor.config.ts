import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a43515af5a27442fb81d5e4c4b5fe872',
  appName: 'chakra-zen-flow',
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