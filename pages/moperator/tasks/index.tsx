import BottomNavBar from "@/components/BottomNavBar";
import TaskCard from "@/components/TaskCard";
import TopBar from "@/components/TopBar";
import { useTasks } from "@/lib/task";

export default function Page() {
  const { tasks } = useTasks();

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <h1 className="text-xl font-medium text-white">Мои задания</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          {tasks?.map((task) => <TaskCard key={task.id} taskId={task.id} />)}
        </div>
      </main>
      <BottomNavBar selected="tasks" />
    </div>
  );
}
