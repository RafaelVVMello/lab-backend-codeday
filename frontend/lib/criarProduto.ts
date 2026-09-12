"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function criarProduto(
  estadoAnterior: { erro: string },
  formulario: FormData
): Promise<{ erro: string }> {
  const token = String(formulario.get("token") ?? "").trim();

  if (!token) {
    return { erro: "Informe o token de login." };
  }

  const produto = {
    descricao: String(formulario.get("descricao") ?? ""),
    preco: Number(formulario.get("preco")),
    categoria: String(formulario.get("categoria") ?? ""),
    estoque: Number(formulario.get("estoque") || 0),
  };

  try {
    const resposta = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(produto),
    });

    if (!resposta.ok) {
      const dados = await resposta.json();

      return {
        erro: dados.erro || "Não foi possível cadastrar o produto.",
      };
    }
  } catch {
    return { erro: "Não foi possível comunicar com a API." };
  }

  revalidatePath("/");
  redirect("/");
}