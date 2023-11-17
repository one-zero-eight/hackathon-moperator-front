declare global {
  interface Window {
    Android: Android;
  }
}

export type Android = {
  showToast: (message: string) => void;
};
