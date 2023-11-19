import BottomNavBar from "@/components/BottomNavBar";
import MachineCard from "@/components/MachineCard";
import TopBar from "@/components/TopBar";
import { useMachines } from "@/lib/machine";

export default function Page() {
  const { machines } = useMachines();

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <h1 className="text-xl font-medium text-white">Техника</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          {machines?.map((machine) => (
            <MachineCard key={machine.id} machineId={machine.id} />
          ))}
        </div>
      </main>
      <BottomNavBar selected="machines" />
    </div>
  );
}
