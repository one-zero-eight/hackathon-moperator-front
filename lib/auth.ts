import { API_URL } from "@/lib/api";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { useLocalStorage } from "usehooks-ts";

async function loginUsingCredentials(
  url: string,
  {
    arg: { login, password },
  }: {
    arg: { login: string; password: string };
  },
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ login, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function useLoginUsingCredentials() {
  const router = useRouter();
  const { trigger } = useSWRMutation(
    `${API_URL}/auth/by-credentials`,
    loginUsingCredentials,
    {},
  );
  const [_, setToken] = useLocalStorage<string | undefined>("token", undefined);

  return useCallback(
    async (login: string, password: string) => {
      return trigger({ login, password })
        .then((res) => {
          if (!res.ok) {
            if (res.status == 401 || res.status == 403) {
              throw new Error("Неверный логин или пароль");
            } else {
              throw new Error(`Ответ сервера ${res.status}`);
            }
          }
          return res.json() as Promise<{
            token: string;
          }>;
        })
        .then((data) => {
          setToken(data.token);
          router.replace("/auth/hello");
        })
        .catch((err) => {
          console.log(err);
          window.Android.showToast("Ошибка входа: " + err.message);
          router.push("/auth/sign-in");
        });
    },
    [trigger, setToken, router],
  );
}

async function loginUsingTag(
  url: string,
  { arg: { tag } }: { arg: { tag: string } },
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ tag }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function useLoginUsingTag() {
  const router = useRouter();
  const { trigger } = useSWRMutation(
    `${API_URL}/auth/by-tag`,
    loginUsingTag,
    {},
  );
  const [_, setToken] = useLocalStorage<string | undefined>("token", undefined);

  return useCallback(
    async (tag: string) => {
      return trigger({ tag })
        .then((res) => {
          if (!res.ok) {
            if (res.status == 401 || res.status == 403) {
              throw new Error("Неверная NFC метка");
            } else {
              throw new Error(`Ответ сервера ${res.status}`);
            }
          }
          return res.json() as Promise<{
            token: string;
          }>;
        })
        .then((data) => {
          setToken(data.token);
          router.replace("/auth/hello");
        })
        .catch((err) => {
          console.log(err);
          window.Android.showToast("Ошибка входа: " + err.message);
          router.push("/auth/sign-in");
        });
    },
    [trigger, setToken, router],
  );
}
