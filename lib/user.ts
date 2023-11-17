import { API_URL, fetcher } from "@/lib/api";
import { useEffect } from "react";
import useSWR from "swr";
import { useLocalStorage } from "usehooks-ts";

export type User = {
  id: number;
  firstName: string;
};

export function useUser() {
  const [token, setToken] = useLocalStorage<string | undefined>(
    "token",
    undefined,
  );
  const [storedUser, setStoredUser] = useLocalStorage<User | undefined>(
    "user",
    undefined,
  );
  const { data, error, mutate } = useSWR<User>(
    () => (token ? `${API_URL}/users/me` : null),
    fetcher,
  );

  useEffect(() => {
    if (error && error.status === 403 && token) {
      setToken(undefined);
    }
  }, [error, token, setToken]);

  useEffect(() => {
    if (data) {
      setStoredUser(data);
    }
  }, [data, setStoredUser]);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    isLoggedIn: !!token && !!storedUser,
    mutate,
  };
}
