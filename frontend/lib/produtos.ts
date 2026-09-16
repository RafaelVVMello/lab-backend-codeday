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

export async function buscarProdutoPorId(
  id: string
): Promise<Produto | null> {
  const numeroId = Number(id);

  if (!Number.isSafeInteger(numeroId) || numeroId <= 0) {
    return null;
  }

  const resposta = await fetch(
    `http://localhost:3000/produtos/${numeroId}`,
    {
      cache: "no-store",
    }
  );

  if (resposta.status === 404) {
    return null;
  }

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar o produto.");
  }

  return resposta.json();
}