declare global {
  interface Window {
    Android: Android;
  }
}

export type Android = {
  showToast: (message: string) => void;
  setToken: (token?: string) => void;
};

export const defaultAndroid: Android = {
  showToast: (message: string) => {
    console.log("Android.showToast: " + message);
  },
  setToken: (token?: string) => {
    console.log("Android.setToken: " + token);
  },
};
