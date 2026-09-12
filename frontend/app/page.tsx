import Link from "next/link";
import { listarProdutos } from "../lib/produtos";
import ListaProdutos from "../components/ListaProdutos";

export default async function Home() {
  const produtos = await listarProdutos();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Link
          href="/produtos/novo"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Novo produto
        </Link>
      </div>

      <ListaProdutos produtos={produtos} />

      
    </main>
  );
}