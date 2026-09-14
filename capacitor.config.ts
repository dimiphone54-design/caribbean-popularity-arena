import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.caribbeanfreedom.arena',
  appName: 'Caribbean Freedom Arena',
  webDir: 'public',
  server: {
    url: 'https://caribbean-freedom-arena.vercel.app',
    cleartext: false
  }
};

export default config;
