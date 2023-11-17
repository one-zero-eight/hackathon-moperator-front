import { defaultAndroid } from "@/lib/androidInterface";
import { useLoginUsingTag } from "@/lib/auth";
import { useUser } from "@/lib/user";
import { Web } from "@/lib/webInterface";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useEventListener } from "usehooks-ts";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, isLoading: isUserLoading, isLoggedIn } = useUser();
  const loginUsingTag = useLoginUsingTag();

  useEffect(() => {
    window.Web = Web;
    window.Android = window.Android || defaultAndroid;
  }, []);

  useEffect(() => {
    if (router.asPath === "/auth/sign-in") {
      return;
    }
    if (!isLoggedIn) {
      router.push("/auth/sign-in");
    }
  }, [isLoggedIn, router]);

  useEventListener("android-tag-scanned", (e) => {
    if (router.route === "/auth/sign-in") {
      return; // Event will be handled by /auth/sign-in.tsx
    }
    const tag = e.detail.tag;
    loginUsingTag(tag).then((res) => {});
  });

  return (
    <div className={`${inter.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
