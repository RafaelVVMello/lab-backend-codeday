"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function criarProduto(
  estadoAnterior: { erro: string },
  formulario: FormData
): Promise<{ erro: string }> {
  const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

if (!token) {
  redirect("/login");
}

  const descricao = String(formulario.get("descricao") ?? "").trim();
  const precoTexto = String(formulario.get("preco") ?? "").trim();
  const preco = Number(precoTexto.replace(",", "."));

  if (!descricao) {
    return { erro: "Preencha o nome do produto." };
  }

  if (!/^[0-9]+([.,][0-9]{1,2})?$/.test(precoTexto) || !Number.isFinite(preco)) {
    return { erro: "Informe um preço válido, com até duas casas decimais." };
  }

  const produto = {
    descricao,
    preco,
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

    if (resposta.status === 401) {
  cookieStore.delete("token");

  return {
    erro: "Sua sessão expirou ou é inválida. Entre novamente.",
  };
}

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