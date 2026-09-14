import Link from "next/link";
import type { Produto } from "../lib/produtos";

type ListaProdutosProps = {
  produtos: Produto[];
};

export default function ListaProdutos({ produtos }: ListaProdutosProps) {
  if (produtos.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <ul className="space-y-4">
      {produtos.map((produto) => (
        <li key={produto.id} className="rounded border p-4">
          <h2 className="text-lg font-bold">{produto.descricao}</h2>

          <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
          <p>Categoria: {produto.categoria || "Sem categoria"}</p>
          <p>Estoque: {produto.estoque}</p>

          <Link
            href={`/produtos/${produto.id}/editar`}
            className="text-blue-600 underline"
          >
            Editar
          </Link>
          <Link href={`/produtos/${produto.id}/excluir`} className="ml-4 text-red-600 underline">
            Excluir
          </Link>
        </li>
      ))}
    </ul>
  );
}