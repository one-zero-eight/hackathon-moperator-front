import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/hello");
  }, [router]);
  return (
    <main className="flex flex-col">
      <h1 className="text-center text-5xl font-bold">404</h1>
    </main>
  );
}
