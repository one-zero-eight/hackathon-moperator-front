import { API_URL } from "@/lib/api";
import { machineStatusToText, useMachine } from "@/lib/machine";
import Link from "next/link";

export default function MachineCard({ machineId }: { machineId?: number }) {
  const { machine } = useMachine(machineId);

  if (machine === undefined) return null;

  return (
    <div className="flex w-full flex-col rounded-lg border-2 border-green-600">
      <Link href={`/moperator/machines/one?id=${machineId}`}>
        <div className="flex h-fit w-full flex-row border-b-2 border-green-600">
          <div className="h-fit w-full p-2 font-medium">{machine.name}</div>
        </div>
        <div className="flex flex-col justify-center gap-2 p-2">
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--crop-square-outline] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">
                {machine.status ? machineStatusToText[machine.status] : null}
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
        </div>
      </Link>
      {machine.attachments && (
        <div className="-m-[0.125rem] flex flex-row rounded-lg border-2 border-green-600 text-sm font-bold">
          <a
            className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-green-900"
            href={API_URL + "/" + machine.attachments.replace("\\", "/")}
            download={true}
            target="_blank"
          >
            <span className="icon-[material-symbols--file-save-outline-rounded] text-2xl" />
            СКАЧАТЬ ФАЙЛ
          </a>
        </div>
      )}
    </div>
  );
}
