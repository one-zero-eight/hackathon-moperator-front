import Offline from "@/components/Offline";
import { useLoginUsingCredentials } from "@/lib/auth";
import { useState } from "react";

export default function Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginUsingCredentials = useLoginUsingCredentials();

  const loginHandler = async () => {
    if (login.trim() === "") {
      window.Android.showToast("Введите логин");
    } else if (password.trim() === "") {
      window.Android.showToast("Введите пароль");
    } else {
      await loginUsingCredentials(login, password);
    }
  };

  return (
    <main className="flex h-[100dvh] flex-col bg-gradient-to-br from-green-50 to-green-300">
      <Offline />
      <div className="flex-grow" />
      <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
        <h1 className="text-2xl font-bold">Войдите в систему</h1>
        <p>Приложите NFC карту</p>
        <p>
          <span className="icon-[mdi--nfc] text-9xl text-green-900" />
        </p>
        <p>или</p>
        <form className="flex flex-col items-center gap-2">
          <input
            className="max-w-[16rem] rounded-full border-2 border-solid border-green-900 px-4 py-2 font-bold text-black outline-green-600"
            placeholder="Логин"
            type="email"
            autoComplete="username"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <input
            className="max-w-[16rem] rounded-full border-2 border-solid border-green-900 px-4 py-2 font-bold text-black outline-green-600"
            placeholder="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="rounded-full bg-green-900 px-4 py-2 font-bold text-white hover:bg-green-600"
            type="button"
            onClick={loginHandler}
          >
            Войти
          </button>
        </form>
      </div>
      <div className="flex-grow" />
      <div className="p-4 text-center italic text-gray-500">
        в случае проблем
        <br />
        свяжитесь с администратором
      </div>
    </main>
  );
}
