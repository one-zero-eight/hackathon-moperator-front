import { API_URL } from "@/lib/api";
import { User } from "@/lib/user";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

async function loginUsingCredentials(
  url: string,
  {
    arg: { login, password },
  }: {
    arg: { login: string; password: string };
  },
) {
  return fetch(API_URL + url, {
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
    `/auth/by-credentials`,
    loginUsingCredentials,
    {},
  );
  const [_, setToken] = useLocalStorage<string | undefined>("token", undefined);

  return useCallback(
    async (login: string, password: string) => {
      trigger({ login, password })
        .then((res) => {
          if (!res.ok) {
            console.log("res.status", res.status);
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
          console.log("data", JSON.stringify(data));
          setToken(data.token);
          router.replace("/auth/hello");
        })
        .catch((err) => {
          console.log(err);
          window.Android.showToast("Ошибка входа: " + err.message);
          setToken(undefined);
        });
    },
    [trigger, setToken, router],
  );
}

async function loginUsingTag(
  url: string,
  { arg: { tag } }: { arg: { tag: string } },
) {
  return fetch(API_URL + url, {
    method: "POST",
    body: JSON.stringify({ tag }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function useLoginUsingTag() {
  const router = useRouter();
  const { trigger } = useSWRMutation(`/auth/by-tag`, loginUsingTag, {});
  const [token, setToken] = useLocalStorage<string | undefined>(
    "token",
    undefined,
  );
  const storedUser = useReadLocalStorage<User>("user") || undefined;

  return useCallback(
    async (tag: string) => {
      if (token && storedUser?.rfid_id === tag) {
        console.log("Already logged in");
        await router.replace(`/auth/hello?return_to=${router.asPath}`);
        return;
      }

      trigger({ tag })
        .then((res) => {
          if (!res.ok) {
            console.log("res.status", res.status);
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
          console.log("data", JSON.stringify(data));
          setToken(data.token);
          router.replace("/auth/hello");
        })
        .catch((err) => {
          console.log(err);
          window.Android.showToast("Ошибка входа: " + err.message);
          setToken(undefined);
        });
    },
    [trigger, setToken, router, storedUser, token],
  );
}

export function useLogout() {
  const [_, setToken] = useLocalStorage<string | undefined>("token", undefined);

  return useCallback(() => {
    setToken(undefined);
  }, [setToken]);
}
