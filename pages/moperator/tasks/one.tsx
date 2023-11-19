import BottomNavBar from "@/components/BottomNavBar";
import { TaskButton } from "@/components/TaskButton";
import TopBar from "@/components/TopBar";
import { API_URL } from "@/lib/api";
import { statusToText, useTask } from "@/lib/task";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const taskId =
    typeof router.query.id === "string" ? Number(router.query.id) : undefined;
  const { task } = useTask(taskId);

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
        <h1 className="text-xl font-medium text-white">Задание #{taskId}</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto p-4">
        {task ? (
          <div className="flex w-full flex-col gap-2">
            <div className="flex h-fit w-full flex-row border-b-2 border-green-600 pb-2 font-medium">
              {task.title}
            </div>
            <div className="flex flex-col justify-center gap-2">
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
                    <div className="text-base">
                      {task.current_agregate.name}
                    </div>
                  </div>
                </div>
              )}
              {task.description && (
                <div className="flex flex-row gap-1">
                  <span className="icon-[material-symbols--notes-rounded] w-6 text-2xl" />
                  <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                    <div className="text-base">{task.description}</div>
                  </div>
                </div>
              )}
            </div>
            {task.attachments && (
              <div className="-m-[0.125rem] flex flex-row rounded-lg border-2 border-green-600 text-sm font-bold">
                <a
                  className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-green-900"
                  href={API_URL + "/" + task.attachments.replace("\\", "/")}
                  download={true}
                  target="_blank"
                >
                  <span className="icon-[material-symbols--file-save-outline-rounded] text-2xl" />
                  СКАЧАТЬ ФАЙЛ
                </a>
              </div>
            )}
            <TaskButton taskId={task.id} />
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <span className="text-2xl text-gray-400">Загрузка...</span>
          </div>
        )}
      </main>
      <BottomNavBar selected="tasks" />
    </div>
  );
}
