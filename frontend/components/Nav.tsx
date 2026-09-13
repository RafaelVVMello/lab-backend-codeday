import Link from "next/link";
import { verificarSessao } from "../lib/sessao";
import { logout } from "../lib/logout";

export default async function Nav() {
  const sessao = await verificarSessao();

  return (
    <nav
      aria-label="Navegação principal"
      className="flex items-center justify-between border-b px-6 py-4"
    >
      <Link href="/" className="text-xl font-bold">
        Produtos
      </Link>

      <div className="flex items-center gap-4">
        {sessao.status === "conectado" && (
          <Link href="/produtos/novo">
            Novo produto
          </Link>
        )}

        {sessao.status === "desconectado" ? (
          <Link
            href="/login"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Entrar
          </Link>
        ) : (
          <>
            {sessao.status === "indisponivel" && (
              <span role="status">
                Não foi possível verificar a sessão.
              </span>
            )}

            <form action={logout}>
              <button
                type="submit"
                className="rounded bg-gray-700 px-4 py-2 text-white"
              >
                Sair
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}