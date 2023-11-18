import { defaultAndroid } from "@/lib/androidInterface";
import { useLoginUsingTag } from "@/lib/auth";
import { useUser } from "@/lib/user";
import { Web } from "@/lib/webInterface";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { useEventListener, useReadLocalStorage } from "usehooks-ts";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const { mutate: globalMutate } = useSWRConfig();
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const token = useReadLocalStorage<string>("token");
  const loginUsingTag = useLoginUsingTag();

  useEffect(() => {
    window.Web = Web;
    window.Android = window.Android || defaultAndroid;
  }, []);

  useEffect(() => {
    window.Android.setToken(token || undefined);
  }, [token]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Clear cache
      console.log("Resetting cache");
      globalMutate(() => true, undefined, { revalidate: false });
    }
    if (router.asPath === "/auth/sign-in") {
      return;
    }
    if (!isLoggedIn) {
      router.push("/auth/sign-in");
    }
  }, [isLoggedIn, router, globalMutate]);

  useEventListener("android-tag-scanned", async (e) => {
    const tag = e.detail.tag;
    await loginUsingTag(tag);
  });

  return (
    <div className={`${inter.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
