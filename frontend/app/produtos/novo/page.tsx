import Link from "next/link";
import FormularioProduto from "../../../components/FormularioProduto";

export default function NovoProduto() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/" className="inline-block rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
        Voltar para produtos
      </Link>

      <h1 className="my-6 text-2xl font-bold">
        Cadastrar produto
      </h1>

      <FormularioProduto />
    </main>
  );
}