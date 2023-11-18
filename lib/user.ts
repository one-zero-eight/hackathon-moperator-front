import { API_URL, fetcher } from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { useIsClient, useLocalStorage } from "usehooks-ts";

export type User = {
  id: number;
  rfid_id: string;
  email: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  role: string;
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
  const isClient = useIsClient();
  const { data, error, mutate } = useSWR(
    () => (token ? [`${API_URL}/users/me`, token] : null),
    ([url, token]) => fetcher<User>(url, token),
  );
  const router = useRouter();

  useEffect(() => {
    if (error && error.status === 403 && token) {
      setToken(undefined);
      setStoredUser(undefined);
    }
  }, [error, token, setToken, setStoredUser]);

  useEffect(() => {
    if (data) {
      setStoredUser((prevData) => {
        if (
          !prevData ||
          prevData.id !== data.id ||
          router.asPath === "/auth/sign-in"
        ) {
          router.replace("/moperator/tasks");
        }
        return data;
      });
    }
  }, [data, setStoredUser, router]);

  return {
    user: isClient ? storedUser : undefined,
    isLoading: !error && !data,
    isError: error,
    isLoggedIn: !!token && !!storedUser,
    mutate,
  };
}
