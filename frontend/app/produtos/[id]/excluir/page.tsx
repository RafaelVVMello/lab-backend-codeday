import FormularioExcluirProduto from "../../../../components/FormularioExcluirProduto";

export default async function ExcluirProduto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Excluir produto
      </h1>

      <FormularioExcluirProduto id={id} />
    </main>
  );
}