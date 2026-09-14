import Link from "next/link";
import FormularioProduto from "../../../components/FormularioProduto";

export default function NovoProduto() {
  return (
    <main className="mx-auto max-w-4xl p-6">
    

      <h1 className="my-6 text-2xl font-bold">
        Cadastrar produto
      </h1>

      <FormularioProduto />
    </main>
  );
}