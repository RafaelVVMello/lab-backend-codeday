/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Limpa os registros existentes antes de inserir novos
  await knex('produtos').del();

  // Insere os produtos eletrônicos de exemplo
  await knex('produtos').insert([
    {
      descricao: 'Monitor Gamer 27" Curvo 165Hz',
      preco: 1399.90,
      categoria: 'Monitores',
      estoque: 15
    },
    {
      descricao: 'Teclado Mecânico RGB Switch Blue',
      preco: 289.00,
      categoria: 'Periféricos',
      estoque: 42
    },
    {
      descricao: 'Mouse Sem Fio Sensor Óptico 16000 DPI',
      preco: 199.50,
      categoria: 'Periféricos',
      estoque: 30
    },
    {
      descricao: 'Headset Gamer 7.1 Surround com Microfone',
      preco: 349.99,
      categoria: 'Áudio',
      estoque: 20
    },
    {
      descricao: 'SSD NVMe M.2 1TB Leitura 3500MB/s',
      preco: 429.00,
      categoria: 'Hardware',
      estoque: 55
    },
    {
      descricao: 'Memória RAM DDR4 16GB 3200MHz',
      preco: 259.90,
      categoria: 'Hardware',
      estoque: 60
    },
    {
      descricao: 'Placa-Mãe B550M Socket AM4',
      preco: 689.00,
      categoria: 'Hardware',
      estoque: 12
    },
    {
      descricao: 'Fonte de Alimentação 650W 80 Plus Bronze',
      preco: 389.90,
      categoria: 'Hardware',
      estoque: 25
    },
    {
      descricao: 'Webcam Full HD 1080p com Microfone Embutido',
      preco: 149.90,
      categoria: 'Periféricos',
      estoque: 18
    },
    {
      descricao: 'Roteador Wi-Fi 6 Gigabit Dual Band',
      preco: 319.00,
      categoria: 'Redes',
      estoque: 10
    }
  ]);
};