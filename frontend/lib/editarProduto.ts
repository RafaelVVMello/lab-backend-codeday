"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editarProduto(
  _estadoAnterior: { erro: string },
  formulario: FormData
): Promise<{ erro: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const id = Number(formulario.get("id"));
  const descricao = String(formulario.get("descricao") ?? "").trim();
  const categoria = String(formulario.get("categoria") ?? "").trim();

  const precoTexto = String(formulario.get("preco") ?? "").trim();
  const estoqueTexto = String(formulario.get("estoque") ?? "").trim();

  const preco = Number(precoTexto.replace(",", "."));
  const estoque = Number(estoqueTexto);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return { erro: "ID do produto inválido." };
  }

  if (!descricao) {
    return { erro: "Preencha a descrição." };
  }

  if (!/^[0-9]+([.,][0-9]{1,2})?$/.test(precoTexto) || !Number.isFinite(preco)) {
    return { erro: "Informe um preço válido, com até duas casas decimais." };
  }

  if (
    !estoqueTexto ||
    !Number.isSafeInteger(estoque) ||
    estoque < 0
  ) {
    return { erro: "O estoque deve ser um número inteiro não negativo." };
  }

  try {
    const resposta = await fetch(
      `http://localhost:3000/produtos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao,
          preco,
          categoria: categoria || null,
          estoque,
        }),
      }
    );

    if (resposta.status === 401) {
      cookieStore.delete("token");

      return {
        erro: "Sua sessão expirou ou é inválida. Entre novamente.",
      };
    }

    if (!resposta.ok) {
      const dados = await resposta.json();

      return {
        erro: dados.erro || "Não foi possível atualizar o produto.",
      };
    }
  } catch {
    return {
      erro: "Não foi possível comunicar com a API.",
    };
  }

  revalidatePath("/");
  revalidatePath(`/produtos/${id}`);
  revalidatePath(`/produtos/${id}/editar`);

  redirect("/");
}