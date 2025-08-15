import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.smartcalc.plus',
  appName: 'SmartCalc+',
  webDir: 'dist',
  server: {
    url: 'https://057eb1ae-c5d5-47ee-ba49-2f7836bd9509.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_INSIDE",
      showSpinner: false,
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "DEFAULT",
      backgroundColor: "#222222"
    }
  }
};

export default config;