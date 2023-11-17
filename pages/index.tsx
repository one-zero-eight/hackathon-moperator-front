export default function Home() {
  return (
    <main className="flex flex-col">
      <h1 className="text-center text-5xl font-bold">Hello operator</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          window.Android.showToast("Hello from Android");
        }}
      >
        Button
      </button>
    </main>
  );
}
