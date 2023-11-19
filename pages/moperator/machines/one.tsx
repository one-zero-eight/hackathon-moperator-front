import BottomNavBar from "@/components/BottomNavBar";
import TopBar from "@/components/TopBar";
import { API_URL } from "@/lib/api";
import { machineStatusToText, useMachine } from "@/lib/machine";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const machineId =
    typeof router.query.id === "string" ? Number(router.query.id) : undefined;
  const { machine } = useMachine(machineId);

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar>
        <div className="-ml-2 flex items-center justify-center overflow-clip rounded-full text-white">
          <Link
            href="/moperator/machines"
            className="flex items-center justify-center p-2"
          >
            <span className="icon-[material-symbols--arrow-back-rounded] text-3xl" />
          </Link>
        </div>
        <h1 className="text-xl font-medium text-white">{machine?.name}</h1>
      </TopBar>
      <main className="flex flex-grow flex-col overflow-y-auto p-4">
        {machine ? (
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col justify-center gap-2 p-2">
              <div className="flex flex-row gap-1">
                <span className="icon-[material-symbols--crop-square-outline] w-6 text-2xl" />
                <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                  <div className="text-base">
                    {machine.status
                      ? machineStatusToText[machine.status]
                      : null}
                  </div>
                </div>
              </div>
              {machine.current_location && (
                <div className="flex flex-row gap-1">
                  <span className="icon-[material-symbols--pin-drop-outline-rounded] w-6 text-2xl" />
                  <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
                    <div className="text-base">{machine.current_location}</div>
                  </div>
                </div>
              )}
              {machine.description && (
                <div className="flex flex-row gap-1">
                  <span className="icon-[material-symbols--notes-rounded] w-6 min-w-[24px] text-2xl" />
                  <div className="flex max-w-full flex-col justify-center overflow-auto whitespace-pre-wrap text-base [overflow-wrap:anywhere]">
                    {machine.description}
                  </div>
                </div>
              )}
              {machine.attachments && (
                <div className="-m-[0.125rem] flex flex-row rounded-lg border-2 border-green-600 text-sm font-bold">
                  <a
                    className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-green-900"
                    href={
                      API_URL + "/" + machine.attachments.replace("\\", "/")
                    }
                    download={true}
                    target="_blank"
                  >
                    <span className="icon-[material-symbols--file-save-outline-rounded] text-2xl" />
                    СКАЧАТЬ ФАЙЛ
                  </a>
                </div>
              )}
            </div>
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
