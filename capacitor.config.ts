import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zenflow.app',
  appName: 'ZenFlow',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    versionCode: 1,
    versionName: '1.0.0'
  },
  ios: {
    scheme: 'ZenFlow'
  },
  plugins: {
    Haptics: {
      enabled: true
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a0d26',
      showSpinner: false
    }
  }
};

export default config;