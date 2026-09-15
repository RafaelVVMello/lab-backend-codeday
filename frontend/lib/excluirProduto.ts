"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function excluirProduto(
  _estadoAnterior: { erro: string },
  formulario: FormData
): Promise<{ erro: string }> {
  const id = Number(formulario.get("id"));

  if (!Number.isSafeInteger(id) || id <= 0) {
    return { erro: "ID do produto inválido." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const resposta = await fetch(
      `http://localhost:3000/produtos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        erro: dados.erro || "Não foi possível excluir o produto.",
      };
    }
  } catch {
    return {
      erro: "Não foi possível comunicar com a API.",
    };
  }

  revalidatePath("/");
  redirect("/");
}