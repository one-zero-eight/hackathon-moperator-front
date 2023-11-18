import BottomNavBar from "@/components/BottomNavBar";
import TaskCard from "@/components/TaskCard";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <div className="-ml-2 flex items-center justify-center overflow-clip rounded-full text-white">
          <Link
            href="/moperator/tasks"
            className="flex items-center justify-center p-2"
          >
            <span className="icon-[material-symbols--arrow-back-rounded] text-3xl" />
          </Link>
        </div>
        <h1 className="text-xl font-medium text-white">Задание #{id}</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <TaskCard />
        </div>
      </main>
      <BottomNavBar selected="tasks" />
    </div>
  );
}
