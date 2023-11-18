import { useIsOnline } from "@/lib/useIsOnline";

export default function Offline() {
  const isOnline = useIsOnline();

  if (isOnline) return null;

  return (
    <div className="flex h-6 min-h-[1.5rem] w-full flex-row items-center justify-center gap-2 bg-gray-600 px-4 text-sm text-white">
      <span className="icon-[material-symbols--cloud-off-outline-rounded] text-lg" />
      Офлайн режим
    </div>
  );
}
