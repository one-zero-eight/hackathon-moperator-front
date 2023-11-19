import { fetcher } from "@/lib/api";
import { Task } from "@/lib/task";
import useSWR from "swr";

export type Machine = {
  id: number;
  name: string;
  type: string;
  description: string;
  status: MachineStatus;
  current_location: string;
  suitable_tasks: Task[];
  current_task: Task;
  suitable_agregates: Agregate[];
  attachments?: string;
};

export type MachineStatus = "free" | "busy" | "broken";

export type Agregate = {
  id: number;
  name: string;
  type: string;
  description: string;
  status: string;
  current_location: string;
  suitable_tasks: Task[];
  current_task: Task;
};

export const machineStatusToText: { [key in MachineStatus]: string } = {
  free: "Свободна",
  busy: "Занята",
  broken: "Сломана",
};

export function useMachines() {
  const { data, error } = useSWR<Machine[]>("/machines", fetcher);

  return {
    machines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useMachine(id?: number) {
  const { data, error } = useSWR<Machine>(
    () => (id ? `/machines/${id}` : null),
    fetcher,
  );

  return {
    machine: data,
    isLoading: !error && !data,
    isError: error,
  };
}
