import Offline from "@/components/Offline";

export default function TopBar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Offline />
      <div className="flex h-16 min-h-[4rem] w-full flex-row items-center bg-green-600 px-4">
        {children}
      </div>
    </>
  );
}
