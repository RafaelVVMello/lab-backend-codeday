import { notFound } from "next/navigation";
import FormularioEditarProduto from "../../../../components/FormularioEditarProduto";
import { buscarProdutoPorId } from "../../../../lib/produtos";

export default async function EditarProduto({
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
        Editar produto
      </h1>

      <FormularioEditarProduto produto={produto} />
    </main>
  );
}