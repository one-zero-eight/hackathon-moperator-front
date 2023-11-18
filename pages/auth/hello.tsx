import { useUser } from "@/lib/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { return_to } = router.query;
  const [canRedirect, setCanRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setCanRedirect(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (canRedirect && user) {
      if (typeof return_to === "string" && return_to) {
        router.replace(return_to);
      } else if (user.role === "agronomist" || user.role === "admin") {
      } else {
        router.replace("/moperator/tasks");
      }
    }
  }, [canRedirect, user, router, return_to]);

  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-green-100 to-green-300">
      <h2 className="text-center text-3xl font-medium">Добро пожаловать</h2>
      <div className="p-4 text-center text-2xl font-medium">
        {user?.last_name} {user?.first_name} {user?.middle_name}
      </div>
      {!canRedirect ||
      !user ||
      (user.role !== "agronomist" && user.role !== "admin") ? (
        <>
          <div className="mt-8 flex items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-green-600" />
          </div>
          <div className="mt-4 text-center text-gray-500">Загрузка...</div>
        </>
      ) : (
        <>
          <a
            href="https://api.moperator.innohassle.ru/admin"
            className="text-green-900 underline"
          >
            Панель администратора
          </a>
          <p>или</p>
          <a href="/moperator/tasks" className="text-green-900 underline">
            Интерфейс механизатора
          </a>
        </>
      )}
    </main>
  );
}
