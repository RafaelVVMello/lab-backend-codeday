"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  _estadoAnterior: { erro: string },
  formulario: FormData
): Promise<{ erro: string }> {
  const email = String(formulario.get("email") ?? "").trim();
  const senha = String(formulario.get("senha") ?? "");

  if (!email || !senha) {
    return { erro: "Preencha o email e a senha." };
  }

  let token: string;

  try {
    const resposta = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
      cache: "no-store",
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      return { erro: dados.erro || "Não foi possível fazer login." };
    }

    if (typeof dados.token !== "string" || !dados.token) {
      return { erro: "A API não retornou um token válido." };
    }

    token = dados.token;
  } catch {
    return { erro: "Não foi possível comunicar com a API." };
  }

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  redirect("/produtos/novo");
}