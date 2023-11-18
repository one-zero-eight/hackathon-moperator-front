import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-center text-5xl font-bold">Hello</h1>
      <Link href="/auth/sign-in" className="p-4 text-center">
        Вход
      </Link>
      <Link href="/moperator/tasks" className="p-4 text-center">
        Задачи
      </Link>
    </main>
  );
}
