import FormularioExcluirProduto from "../../../../components/FormularioExcluirProduto";
import { notFound } from "next/navigation";
import { buscarProdutoPorId } from "../../../../lib/produtos";


export default async function ExcluirProduto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const produto = await buscarProdutoPorId(id);

  if (!produto) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Excluir produto
      </h1>

      <FormularioExcluirProduto
        id={id}
        nome={produto.descricao}
      />
    </main>
  );
}