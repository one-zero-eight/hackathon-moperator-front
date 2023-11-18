import Link from "next/link";

export default function TaskCard() {
  const taskId = 1;
  return (
    <div className="flex w-full flex-col justify-between rounded-lg border-2 border-solid border-green-600">
      <Link href={`/moperator/tasks/${taskId}`}>
        <div className="flex h-fit w-full flex-row border-b-2 border-green-600">
          <div className="h-fit w-full p-2 font-medium">Посев</div>
          <div className="flex w-fit items-center p-2 text-sm text-gray-600">
            #{taskId}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 p-2">
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--crop-square-outline] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">Открытая</div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--event-outline-rounded] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">18 ноября - 19 ноября</div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--pin-drop-outline-rounded] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">А-121-АБ</div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--agriculture-outline-rounded] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">RSM 3535 #7089</div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <span className="icon-[material-symbols--precision-manufacturing-outline-rounded] w-6 text-2xl" />
            <div className="flex max-w-full flex-col justify-center overflow-auto break-words">
              <div className="text-base">Horsh Pronto NT12 #1</div>
            </div>
          </div>
        </div>
      </Link>
      <button className="flex h-fit w-full flex-row items-center justify-center gap-1 border-t-2 border-green-600 p-2 text-sm font-bold text-green-900">
        <span className="icon-[material-symbols--play-circle-outline] text-2xl" />
        ПРИНЯТЬ
      </button>
      {/*<div className="flex flex-row border-t-2 border-green-600">*/}
      {/*  <button className="flex h-fit w-full flex-row items-center justify-center gap-1 border-r-2 border-green-600 p-2 text-sm font-bold text-yellow-600">*/}
      {/*    <span className="icon-[material-symbols--stop-circle-outline] text-2xl" />*/}
      {/*    ПАУЗА*/}
      {/*  </button>*/}
      {/*  <button className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-sm font-bold text-red-600">*/}
      {/*    <span className="icon-[material-symbols--cancel-outline] text-2xl" />*/}
      {/*    ОТМЕНА*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*<div className="flex flex-row border-t-2 border-green-600">*/}
      {/*  <button className="flex h-fit w-full flex-row items-center justify-center gap-1 border-r-2 border-green-600 p-2 text-sm font-bold text-green-900">*/}
      {/*    <span className="icon-[material-symbols--play-circle-outline] text-2xl" />*/}
      {/*    ПРОДОЛЖИТЬ*/}
      {/*  </button>*/}
      {/*  <button className="flex h-fit w-full flex-row items-center justify-center gap-1 p-2 text-sm font-bold text-red-600">*/}
      {/*    <span className="icon-[material-symbols--cancel-outline] text-2xl" />*/}
      {/*    ОТМЕНА*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
}
