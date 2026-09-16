"use client";

import Link from "next/link";
import { useActionState } from "react";
import { excluirProduto } from "../lib/excluirProduto";

type FormularioExcluirProdutoProps = {
  id: string;
  nome: string;
};

export default function FormularioExcluirProduto({
  id,
  nome,
}: FormularioExcluirProdutoProps) {
  const [estado, enviarFormulario, enviando] = useActionState(
    excluirProduto,
    { erro: "" }
  );

  return (
    <form action={enviarFormulario} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="id" value={id} />

     <p>
      Deseja realmente excluir <strong>{nome}</strong> (ID: {id})?
      {" "}Essa ação não pode ser desfeita.
      </p>
      {estado.erro && (
        <p role="alert" className="text-red-600">
          {estado.erro}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={enviando}
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {enviando ? "Excluindo..." : "Confirmar exclusão"}
        </button>

        <Link href="/" className="text-blue-600 underline">
          Cancelar
        </Link>
      </div>

      {estado.erro && (
        <Link href="/login" className="text-blue-600 underline">
          Ir para o login
        </Link>
      )}
    </form>
  );
}