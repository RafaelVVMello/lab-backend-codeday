"use client";

import { useActionState, useState } from "react";
import { criarProduto } from "../lib/criarProduto";

export default function FormularioProduto() {
  const [preco, setPreco] = useState("");
const [estado, enviarFormulario, enviando] = useActionState(  criarProduto,
{ erro: "" }
);
  return (
    <form className="flex max-w-md flex-col gap-4"
      action={enviarFormulario}>
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
          defaultValue="0"
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
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {enviando ? "Salvando..." : "Cadastrar"}
      </button>
      
    </form>
  );
}