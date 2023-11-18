declare global {
  interface Window {
    Web: typeof Web;
  }
}

declare global {
  interface WindowEventMap {
    "android-tag-scanned": CustomEvent<{ tag: string }>;
  }
}

export const Web = {
  onLocationChanged: (location: string) => {
    console.log("Web.onLocationChanged: " + location);
  },
  onTagScanned: (tag: string) => {
    console.log("Web.onTagScanned: " + tag);
    window.dispatchEvent(
      new CustomEvent("android-tag-scanned", { detail: { tag } }),
    );
  },
};
