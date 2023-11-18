import { API_URL } from "@/lib/api";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { useLocalStorage } from "usehooks-ts";

async function loginUsingCredentials(
  url: string,
  {
    arg: { login, password },
  }: {
    arg: {
      login: string;
      password: string;
    };
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
  const { trigger } = useSWRMutation(
    `${API_URL}/auth/by-credentials`,
    loginUsingCredentials,
    {},
  );
  const [token, setToken] = useLocalStorage<string | undefined>(
    "token",
    undefined,
  );

  return useCallback(
    async (login: string, password: string) => {
      return trigger({ login, password })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Ошибка входа");
          }
          return res.json() as Promise<{
            token: string;
          }>;
        })
        .then((data) => {
          setToken(data.token);
          window.Android.showToast("Вход выполнен");
          return true;
        })
        .catch((err) => {
          window.Android.showToast("Ошибка входа: " + err.message);
          console.log(err);
          return false;
        });
    },
    [trigger, setToken],
  );
}

async function loginUsingTag(
  url: string,
  {
    arg: { tag },
  }: {
    arg: {
      tag: string;
    };
  },
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
  const { trigger } = useSWRMutation(
    `${API_URL}/auth/by-tag`,
    loginUsingTag,
    {},
  );
  const [token, setToken] = useLocalStorage<string | undefined>(
    "token",
    undefined,
  );

  return useCallback(
    async (tag: string) => {
      return trigger({ tag })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Ошибка входа");
          }
          return res.json() as Promise<{
            token: string;
          }>;
        })
        .then((data) => {
          setToken(data.token);
          window.Android.showToast("Вход выполнен");
          return true;
        })
        .catch((err) => {
          window.Android.showToast("Ошибка входа: " + err.message);
          console.log(err);
          return false;
        });
    },
    [trigger, setToken],
  );
}
