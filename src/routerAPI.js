const express = require ('express')
const routerAPI = express.Router()


const dados = {
  "produtos": [
    {
      "id": 1,
      "nome": "Smartphone Galaxy X50",
      "descricao": "Smartphone com tela de 6.5 polegadas, 128GB de armazenamento e câmera tripla.",
      "categoria": "Eletrônicos",
      "preco": 2499.90,
      "moeda": "BRL",
      "estoque": 45,
      "tags": ["celular", "smartphone", "galaxy"],
      "avaliacao": 4.7
    },
    {
      "id": 2,
      "nome": "Notebook UltraSlim 14",
      "descricao": "Notebook leve e rápido com processador Intel i5, 8GB RAM e SSD de 256GB.",
      "categoria": "Informática",
      "preco": 3899.00,
      "moeda": "BRL",
      "estoque": 12,
      "tags": ["notebook", "laptop", "computador"],
      "avaliacao": 4.5
    },
    {
      "id": 3,
      "nome": "Fone de Ouvido Bluetooth Noise Cancelling",
      "descricao": "Fone de ouvido headphone com cancelamento de ruído ativo e bateria de até 30 horas.",
      "categoria": "Áudio",
      "preco": 599.90,
      "moeda": "BRL",
      "estoque": 85,
      "tags": ["fone", "bluetooth", "audio"],
      "avaliacao": 4.8
    },
    {
      "id": 4,
      "nome": "Teclado Mecânico Gamer RGB",
      "descricao": "Teclado mecânico com switches azuis, iluminação RGB customizável e anti-ghosting.",
      "categoria": "Informática",
      "preco": 349.90,
      "moeda": "BRL",
      "estoque": 28,
      "tags": ["teclado", "gamer", "rgb"],
      "avaliacao": 4.4
    },
    {
      "id": 5,
      "nome": "Smartwatch Sport Fit",
      "descricao": "Relógio inteligente com monitor cardíaco, GPS integrado e resistência à água.",
      "categoria": "Eletrônicos",
      "preco": 799.00,
      "moeda": "BRL",
      "estoque": 60,
      "tags": ["relogio", "smartwatch", "fitness"],
      "avaliacao": 4.2
    },
    {
      "id": 6,
      "nome": "Monitor Gamer 24\" 144Hz",
      "descricao": "Monitor Full HD com tempo de resposta de 1ms e tecnologia FreeSync.",
      "categoria": "Informática",
      "preco": 1249.00,
      "moeda": "BRL",
      "estoque": 15,
      "tags": ["monitor", "gamer", "144hz"],
      "avaliacao": 4.6
    },
    {
      "id": 7,
      "nome": "Caixa de Som Portátil Waterproof",
      "descricao": "Caixa de som Bluetooth à prova d'água com 20W de potência.",
      "categoria": "Áudio",
      "preco": 299.90,
      "moeda": "BRL",
      "estoque": 110,
      "tags": ["caixa de som", "bluetooth", "portatil"],
      "avaliacao": 4.3
    },
    {
      "id": 8,
      "nome": "Carregador Rápido Baseus 30W",
      "descricao": "Carregador de parede USB-C com suporte a carregamento rápido Turbo.",
      "categoria": "Acessórios",
      "preco": 89.90,
      "moeda": "BRL",
      "estoque": 200,
      "tags": ["carregador", "turbo", "usb-c"],
      "avaliacao": 4.9
    },
    {
      "id": 9,
      "nome": "Mouse Sem Fio Ergonômico",
      "descricao": "Mouse óptico sem fio projetado para reduzir a fadiga muscular.",
      "categoria": "Informática",
      "preco": 149.90,
      "moeda": "BRL",
      "estoque": 40,
      "tags": ["mouse", "sem fio", "ergonomico"],
      "avaliacao": 4.1
    },
    {
      "id": 10,
      "nome": "Mochila Impermeável para Notebook",
      "descricao": "Mochila com compartimento acolchoado para laptops de até 15.6 polegadas e entrada USB.",
      "categoria": "Acessórios",
      "preco": 199.90,
      "moeda": "BRL",
      "estoque": 75,
      "tags": ["mochila", "notebook", "viagem"],
      "avaliacao": 4.7
    }
  ]
}

routerAPI.use (express.json())

// Inserindo um Middleware no Mid. Manager
routerAPI.get ('/produtos', (req, res) =>  {
  res.json(dados.produtos)
})

// Inserindo um Middleware no Mid. Manager
routerAPI.get ('/produtos/:id', (req, res) =>  {
    const id = Number.parseInt(req.params.id)
    const produto = dados.produtos.find (elem => elem.id === id)
    if (produto) {
        res.json (produto)
    }
    else {
        res.status (404).json({ 
            "erro": 404, 
            "mensagem": "Produto não encontrado." 
        })
    }
})

routerAPI.post ('/produtos',  (req, res) => {
    console.log ("corpo", JSON.stringify (req.body))
    res.send (`post executado: ${req.body.descricao}. Recurso ainda não implementado.`)
})

routerAPI.put ('/produtos/:id',  (req, res) => {
    res.send ('put executado. Recurso ainda não implementado.')
})

routerAPI.delete ('/produtos/:id',  (req, res) => {
    res.send ('delete executado. Recurso ainda não implementado.')
})

routerAPI.use ((req, res) => {
    res.status (404).send('Erro 404. Recurso não encontrado.')
})

module.exports = routerAPI