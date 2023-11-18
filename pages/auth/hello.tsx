import { useUser } from "@/lib/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { return_to } = router.query;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        if (typeof return_to === "string") {
          router.replace(return_to);
        } else if (user.role === "agronomist") {
          router.replace("/agronomist/profile");
        } else {
          router.replace("/moperator/tasks");
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [user, router, return_to]);

  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-green-100 to-green-300">
      <h2 className="text-center text-3xl font-medium">Добро пожаловать</h2>
      <div className="p-4 text-center text-2xl font-medium">
        {user?.last_name} {user?.first_name} {user?.middle_name}
      </div>
      <div className="mt-8 flex items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-green-600" />
      </div>
      <div className="mt-4 text-center text-gray-500">Загрузка...</div>
    </main>
  );
}
