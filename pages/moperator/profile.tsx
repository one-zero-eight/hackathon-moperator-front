import BottomNavBar from "@/components/BottomNavBar";
import TaskCard from "@/components/TaskCard";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <h1 className="text-xl font-medium text-white">Мой профиль</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex min-h-[12em] max-w-full flex-row items-center overflow-x-hidden border-b-2 border-green-600 pb-4">
          <div className="p-4 text-right text-2xl font-medium">
            Булгаков Артём Сергеевич
          </div>
          <div className="-mr-16 -mt-16 h-60 w-60 min-w-[15em] rounded-full border-2 border-green-600 bg-green-400" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-4">
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
