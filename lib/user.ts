import { API_URL, fetcher } from "@/lib/api";
import { useRouter } from "next/router";
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
  const { data, error, mutate } = useSWR(
    () => (token ? [`${API_URL}/users/me`, token] : null),
    ([url, token]) => fetcher<User>(url, token),
  );
  const router = useRouter();
  console.log(JSON.stringify({ data, error, token, storedUser }));

  useEffect(() => {
    if (error && error.status === 403 && token) {
      setToken(undefined);
      setStoredUser(undefined);
    }
  }, [error, token, setToken]);

  useEffect(() => {
    if (data) {
      setStoredUser((prevData) => {
        console.log(prevData, data);
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
    user: storedUser,
    isLoading: !error && !data,
    isError: error,
    isLoggedIn: !!token && !!storedUser,
    mutate,
  };
}
