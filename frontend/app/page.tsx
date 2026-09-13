import Link from "next/link";
import { listarProdutos } from "../lib/produtos";
import ListaProdutos from "../components/ListaProdutos";

export default async function Home() {
  const produtos = await listarProdutos();

  return (
    <main className="mx-auto max-w-4xl p-6">
      

      <ListaProdutos produtos={produtos} />

      
    </main>
  );
}