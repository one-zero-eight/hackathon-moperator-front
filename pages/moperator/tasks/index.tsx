import BottomNavBar from "@/components/BottomNavBar";
import TaskCard from "@/components/TaskCard";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <h1 className="text-xl font-medium text-white">Мои задания</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </main>
      <BottomNavBar selected="tasks" />
    </div>
  );
}
