declare global {
  interface Window {
    Web: typeof Web;
  }
}

export const Web = {
  onLocationChanged: (location: string) => {
    console.log("Web.onLocationChanged: " + location);
  },
};
