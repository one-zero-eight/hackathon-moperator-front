import { API_URL, fetcher } from "@/lib/api";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useReadLocalStorage } from "usehooks-ts";

export type TaskStatus =
  | "draft"
  | "assigned"
  | "in_progress"
  | "paused"
  | "completed"
  | "canceled";

export type Task = {
  id: number;
  type?: {
    id: number;
    title: string;
    description: string;
  };
  title?: string;
  description?: string;
  asignee?: {
    user_id: number;
    rfid_id: string;
    email: string;
    employee_id: number;
    last_name: string;
    first_name: string;
    middle_name: string;
    role: "agronomist";
  };
  status?: TaskStatus;
  priority?: string;
  location?: string;
  starting?: string;
  deadline?: string;
  created_at?: string;
  updated_at?: string;
  current_machine?: {
    id: number;
    name: string;
    type: string;
    status: "free";
    current_location: string;
  };
  current_agregate?: {
    id: number;
    name: string;
    type: string;
    status: string;
    current_location: string;
  };
  attachments?: string;
};

export const statusToText: { [key in TaskStatus]: string } = {
  draft: "Черновик",
  assigned: "Открыта",
  in_progress: "В работе",
  paused: "Приостановлена",
  completed: "Завершена",
  canceled: "Отменена",
};

export function useTasks() {
  const token = useReadLocalStorage<string>("token");
  const { data } = useSWR<Task[]>(() => (token ? `/tasks/my` : null), fetcher);

  return {
    tasks: data,
    isLoading: !data,
  };
}

export function useTask(taskId?: number) {
  const { data, error } = useSWR<Task>(
    () => (taskId ? `/tasks/${taskId}` : null),
    fetcher,
  );

  const { mutate } = useSWRConfig();

  const token = useReadLocalStorage<string>("token");
  const { trigger } = useSWRMutation(
    `/tasks/${taskId}`,
    (
      key: string,
      {
        arg: { status, token },
      }: { arg: { status: TaskStatus; token: string } },
    ) =>
      fetch(API_URL + key + "/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }).then((res) => res.json()),
  );

  const setStatus = useCallback(
    async (status: TaskStatus) => {
      await trigger(
        { token: token || "", status },
        {
          optimisticData: (prev) => ({ ...prev, status }),
          onSuccess: () => {
            mutate(`/tasks/my`);
            mutate(`/tasks/${taskId}`);
          },
        },
      );
    },
    [token, trigger, mutate, taskId],
  );

  return {
    task: data as Task | undefined,
    isLoading: !error && !data,
    isError: error,
    setStatus,
  };
}
