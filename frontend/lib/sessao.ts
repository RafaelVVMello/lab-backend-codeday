import { cookies } from "next/headers";

export async function verificarSessao() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { status: "desconectado" as const };
  }

  try {
    const resposta = await fetch("http://localhost:3000/auth/validar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (resposta.status === 401) {
      return { status: "desconectado" as const };
    }

    if (!resposta.ok) {
      return { status: "indisponivel" as const };
    }

    return { status: "conectado" as const };
  } catch {
    return { status: "indisponivel" as const };
  }
}