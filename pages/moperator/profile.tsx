import BottomNavBar from "@/components/BottomNavBar";
import TaskCard from "@/components/TaskCard";
import TopBar from "@/components/TopBar";
import { useLogout } from "@/lib/auth";
import { useUser } from "@/lib/user";

export default function Page() {
  const { user } = useUser();
  const logout = useLogout();

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <h1 className="flex-grow text-xl font-medium text-white">
          Мой профиль
        </h1>
        <div className="-mr-2 flex items-center justify-center overflow-clip rounded-full text-white">
          <button
            className="flex items-center justify-center p-2"
            onClick={() => logout()}
          >
            <span className="icon-[material-symbols--logout-rounded] text-3xl" />
          </button>
        </div>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex min-h-[12em] max-w-full flex-row items-center overflow-x-hidden bg-gradient-to-tr from-green-100 to-green-300 pb-4">
          <div className="p-4 text-right text-2xl font-medium">
            {user?.last_name} {user?.first_name} {user?.middle_name}
          </div>
          <div className="-mr-16 -mt-16 h-60 w-60 min-w-[15em] rounded-full border-2 border-green-600 bg-green-400" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-medium">Данные</h2>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <h3 className="text-lg">Почта</h3>
              <div className="text-lg font-bold">{user?.email}</div>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <h3 className="text-lg">Роль</h3>
              <div className="text-lg font-bold">{user?.role}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-medium">Статистика</h2>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <h3 className="text-lg">Задач выполнено</h3>
              <div className="text-2xl font-bold">15</div>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <h3 className="text-lg">Часов отработано</h3>
              <div className="text-2xl font-bold">36</div>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <h3 className="text-lg">Заработано</h3>
              <div className="text-2xl font-bold">11 500</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-medium">Текущие задачи</h2>
            <div>
              <TaskCard />
            </div>
          </div>
        </div>
      </main>
      <BottomNavBar selected="profile" />
    </div>
  );
}
