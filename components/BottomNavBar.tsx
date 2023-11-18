import Link from "next/link";

export default function BottomNavBar({
  selected,
}: {
  selected: "tasks" | "machines" | "notifications" | "profile";
}) {
  return (
    <div className="flex h-12 min-h-[3rem] items-center justify-between bg-green-900 px-4 text-white">
      <div className="flex items-center justify-center overflow-clip rounded-full">
        <Link
          href="/moperator/tasks"
          className="flex items-center justify-center p-2"
        >
          <span
            className={`${
              selected === "tasks"
                ? "icon-[material-symbols--fact-check-rounded] text-3xl text-white"
                : "icon-[material-symbols--fact-check-outline-rounded] text-3xl text-gray-200"
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center overflow-clip rounded-full">
        <Link
          href="/moperator/machines"
          className="flex items-center justify-center p-2"
        >
          <span
            className={`${
              selected === "machines"
                ? "icon-[material-symbols--agriculture-rounded] text-3xl text-white"
                : "icon-[material-symbols--agriculture-outline-rounded] text-3xl text-gray-200"
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center overflow-clip rounded-full">
        <Link
          href="/moperator/notifications"
          className="flex items-center justify-center p-2"
        >
          <span
            className={`${
              selected === "notifications"
                ? "icon-[material-symbols--notifications-rounded] text-3xl text-white"
                : "icon-[material-symbols--notifications-outline-rounded] text-3xl text-gray-200"
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center overflow-clip rounded-full">
        <Link
          href="/moperator/profile"
          className="flex items-center justify-center p-2"
        >
          <span
            className={`${
              selected === "profile"
                ? "icon-[material-symbols--person-rounded] text-3xl text-white"
                : "icon-[material-symbols--person-outline-rounded] text-3xl text-gray-200"
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
