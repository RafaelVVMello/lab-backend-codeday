"use client";

import { useActionState } from "react";
import { login } from "../lib/login";

export default function FormularioLogin() {
  const [estado, enviarLogin, enviando] = useActionState(
    login,
    { erro: "" }
  );

  return (
    <form action={enviarLogin} className="flex max-w-md flex-col gap-4">
      <div>
        <label htmlFor="email" className="block">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="senha" className="block">
          Senha
        </label>

        <input
          id="senha"
          name="senha"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded border p-2"
        />
      </div>

      {estado.erro && (
        <p role="alert" className="text-red-600">
          {estado.erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {enviando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}