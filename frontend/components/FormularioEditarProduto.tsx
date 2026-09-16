"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { editarProduto } from "../lib/editarProduto";
import type { Produto } from "../lib/produtos";

type FormularioEditarProdutoProps = {
  produto: Produto;
};

export default function FormularioEditarProduto({
  produto,
}: FormularioEditarProdutoProps) {
  const [preco, setPreco] = useState(String(produto.preco));
  const [estado, enviarFormulario, enviando] = useActionState(
    editarProduto,
    { erro: "" }
  );

  return (
    <form
      action={enviarFormulario}
      className="flex max-w-md flex-col gap-4"
    >
      <input type="hidden" name="id" value={produto.id} />

      <div>
        <label htmlFor="descricao" className="block">
          Descrição
        </label>

        <input
          id="descricao"
          name="descricao"
          type="text"
          pattern={".*\\S.*"}
          title="Preencha o nome do produto; ele não pode conter apenas espaços."
          defaultValue={produto.descricao}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="preco" className="block">
          Preço
        </label>

        <input
          id="preco"
          name="preco"
          type="text"
          inputMode="decimal"
          pattern="[0-9]+([.,][0-9]{1,2})?"
          title="Informe um preço válido, com até duas casas decimais."
          value={preco}
          onChange={(event) => {
            const valor = event.target.value;
            if (/^[0-9]*([.,][0-9]{0,2})?$/.test(valor)) {
              setPreco(valor);
            }
          }}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="categoria" className="block">
          Categoria
        </label>

        <input
          id="categoria"
          name="categoria"
          type="text"
          defaultValue={produto.categoria ?? ""}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="estoque" className="block">
          Estoque
        </label>

        <input
          id="estoque"
          name="estoque"
          type="number"
          min="0"
          step="1"
          defaultValue={produto.estoque}
          required
          className="w-full rounded border p-2"
        />
      </div>

      {estado.erro && (
        <p role="alert" className="text-red-600">
          {estado.erro}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={enviando}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {enviando ? "Salvando..." : "Salvar alterações"}
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