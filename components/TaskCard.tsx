import { TaskButton } from "@/components/TaskButton";
import { statusToText, useTask } from "@/lib/task";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";

export default function TaskCard({ taskId }: { taskId?: number }) {
  const { task } = useTask(taskId);

  if (task === undefined || task.status == "draft") return null;

  return (
    <div className="flex w-full flex-col rounded-lg border-2 border-green-600">
      <Link href={`/moperator/tasks/one?id=${task.id}`}>
        <div className="flex h-fit w-full flex-row border-b-2 border-green-600">
          <div className="h-fit w-full p-2 font-medium">{task.title}</div>
          <div className="flex w-fit items-center p-2 text-sm text-gray-600">
            #{task.id}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 p-2">
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--crop-square-outline] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">
                {task.status ? statusToText[task.status] : null}
              </div>
            </div>
          </div>
          {task.starting && (
            <div className="flex flex-row gap-1">
              <span className="icon-[material-symbols--event-outline-rounded] w-6 text-2xl" />
              <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                <div className="text-base">
                  {task.starting
                    ? format(parseISO(task.starting), "d MMMM", {
                        locale: ru,
                      })
                    : null}
                  {task.deadline && task.deadline !== task.starting
                    ? " - " +
                      format(parseISO(task.deadline), "d MMMM", {
                        locale: ru,
                      })
                    : null}
                </div>
              </div>
            </div>
          )}
          {task.location && (
            <div className="flex flex-row gap-1">
              <span className="icon-[material-symbols--pin-drop-outline-rounded] w-6 text-2xl" />
              <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                <div className="text-base">{task.location}</div>
              </div>
            </div>
          )}
          {task.current_machine && (
            <div className="flex flex-row gap-1">
              <span className="icon-[material-symbols--agriculture-outline-rounded] w-6 text-2xl" />
              <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                <div className="text-base">{task.current_machine.name}</div>
              </div>
            </div>
          )}
          {task.current_agregate && (
            <div className="flex flex-row gap-1">
              <span className="icon-[material-symbols--precision-manufacturing-outline-rounded] w-6 text-2xl" />
              <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                <div className="text-base">{task.current_agregate.name}</div>
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="-m-[0.125rem]">
        <TaskButton taskId={task.id} />
      </div>
    </div>
  );
}
