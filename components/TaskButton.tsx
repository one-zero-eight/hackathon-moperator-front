import { useTask } from "@/lib/task";

export function TaskButton({ taskId }: { taskId: number }) {
  const { setStatus, task } = useTask(taskId);

  if (!task) return null;

  return (
    <div className="flex flex-row rounded-lg border-2 border-green-600 text-sm font-bold">
      {task.status == "assigned" ? (
        <button
          className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-green-900"
          onClick={() => setStatus("in_progress")}
        >
          <span className="icon-[material-symbols--play-circle-outline] text-2xl" />
          ПРИНЯТЬ
        </button>
      ) : task.status == "in_progress" ? (
        <>
          <button
            className="flex h-fit w-full flex-row items-center justify-center gap-1 border-r-2 border-green-600 p-2 text-yellow-600"
            onClick={() => setStatus("paused")}
          >
            <span className="icon-[material-symbols--stop-circle-outline] text-2xl" />
            ПАУЗА
          </button>
          <button
            className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-sm font-bold text-red-600"
            onClick={() => setStatus("canceled")}
          >
            <span className="icon-[material-symbols--cancel-outline] text-2xl" />
            ОТМЕНА
          </button>
        </>
      ) : task.status == "paused" ? (
        <>
          <button
            className="flex h-fit w-full flex-row items-center justify-center gap-1 border-r-2 border-green-600 p-2 text-green-900"
            onClick={() => setStatus("in_progress")}
          >
            <span className="icon-[material-symbols--play-circle-outline] text-2xl" />
            ПРОДОЛЖИТЬ
          </button>
          <button
            className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-red-600"
            onClick={() => setStatus("canceled")}
          >
            <span className="icon-[material-symbols--cancel-outline] text-2xl" />
            ОТМЕНА
          </button>
        </>
      ) : null}
    </div>
  );
}
