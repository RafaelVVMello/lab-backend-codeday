-- Crie o banco antes de executar este arquivo:
-- CREATE DATABASE treinamento_node;

CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(150) NOT NULL,
  preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
  categoria VARCHAR(100),
  estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);
