import { machineStatusToText, useMachine } from "@/lib/machine";

export default function MachineCard({ machineId }: { machineId?: number }) {
  const { machine } = useMachine(machineId);

  if (machine === undefined) return null;

  return (
    <div className="flex w-full flex-col rounded-lg border-2 border-green-600">
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
        {/*{task.starting && (*/}
        {/*  <div className="flex flex-row gap-1">*/}
        {/*    <span className="icon-[material-symbols--event-outline-rounded] w-6 text-2xl" />*/}
        {/*    <div className="flex max-w-full flex-col justify-center overflow-auto break-words">*/}
        {/*      <div className="text-base">*/}
        {/*        {task.starting*/}
        {/*          ? format(parseISO(task.starting), "d MMMM", {*/}
        {/*              locale: ru,*/}
        {/*            })*/}
        {/*          : null}*/}
        {/*        {task.deadline && task.deadline !== task.starting*/}
        {/*          ? " - " +*/}
        {/*            format(parseISO(task.deadline), "d MMMM", {*/}
        {/*              locale: ru,*/}
        {/*            })*/}
        {/*          : null}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
        {machine.current_location && (
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--pin-drop-outline-rounded] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">{machine.current_location}</div>
            </div>
          </div>
        )}
        {/*{task.current_machine && (*/}
        {/*  <div className="flex flex-row gap-1">*/}
        {/*    <span className="icon-[material-symbols--agriculture-outline-rounded] w-6 text-2xl" />*/}
        {/*    <div className="flex max-w-full flex-col justify-center overflow-auto break-words">*/}
        {/*      <div className="text-base">{task.current_machine.name}</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*{task.current_agregate && (*/}
        {/*  <div className="flex flex-row gap-1">*/}
        {/*    <span className="icon-[material-symbols--precision-manufacturing-outline-rounded] w-6 text-2xl" />*/}
        {/*    <div className="flex max-w-full flex-col justify-center overflow-auto break-words">*/}
        {/*      <div className="text-base">{task.current_agregate.name}</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
}
