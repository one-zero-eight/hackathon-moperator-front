import { useCallback, useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

export function useIsOnline() {
  const [isOnline, setIsOnline] = useState(true);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  useEventListener("online", handleOnline);
  useEventListener("offline", handleOffline);

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);

  return isOnline;
}
