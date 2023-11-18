"use client";
import { useEffect } from "react";

export function PWALifeCycle() {
  useEffect(() => {
    console.log("Registering service worker");
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      window.workbox === undefined
    ) {
      return;
    }
    const wb = window.workbox as any;

    wb.addEventListener("installed", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    wb.addEventListener("waiting", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);

      // Send a message to the waiting service worker, instructing it to activate.
      wb.messageSkipWaiting();
      wb.addEventListener("controlling", () => {
        window.location.reload();
      });
    });

    wb.addEventListener("controlling", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    wb.addEventListener("activated", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    wb.register();
  }, []);
  return <></>;
}
