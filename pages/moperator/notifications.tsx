import BottomNavBar from "@/components/BottomNavBar";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <h1 className="text-xl font-medium text-white">Уведомления</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <h1 className="p-4 text-center font-bold">[Список уведомлений]</h1>
      </main>
      <BottomNavBar selected="notifications" />
    </div>
  );
}
