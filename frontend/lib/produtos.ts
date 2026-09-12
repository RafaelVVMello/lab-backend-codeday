export type Produto = {
  id: number;
  descricao: string;
  preco: string;
  categoria: string | null;
  estoque: number;
};

export async function listarProdutos(): Promise<Produto[]> {
  const resposta = await fetch("http://localhost:3000/produtos", {
    cache: "no-store",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return resposta.json();
}