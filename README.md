# API Node + Express + Knex + PostgreSQL + JWT

Exemplo didático para um treinamento introdutório de back-end.

## Arquitetura

Fluxo principal:

```text
HTTP Request
    ↓
Router
    ↓
Middleware (quando necessário)
    ↓
Controller
    ↓
Model
    ↓
Knex
    ↓
PostgreSQL
```

### Responsabilidades

- **routes/**: associa verbo HTTP e URL a uma operação.
- **controllers/**: recebe a requisição, valida dados básicos e coordena a resposta.
- **models/**: concentra o acesso aos dados.
- **middleware/**: executa lógica antes do controller, como autenticação.
- **database/**: configura a conexão com PostgreSQL usando Knex.

## Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e em execução

## 1. Instale as dependências

```bash
npm install
```

## 2. Crie o banco

No PostgreSQL:

```sql
CREATE DATABASE treinamento_node;
```

Depois execute o arquivo:

```text
database/schema.sql
```

Por exemplo, com `psql`:

```bash
psql -U postgres -d treinamento_node -f database/schema.sql
```

## 3. Configure as variáveis de ambiente

Copie:

```text
.env.example
```

para:

```text
.env
```

Ajuste usuário, senha e nome do banco.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=treinamento_node

JWT_SECRET=uma-chave-secreta-bem-grande
```

## 4. Crie o usuário de teste

```bash
npm run seed:user
```

Credenciais:

```text
email: professor@teste.com
senha: 123456
```

A senha armazenada no banco é um hash BCrypt.

## 5. Inicie o servidor

Durante o desenvolvimento:

```bash
npm run dev
```

Ou:

```bash
npm start
```

Servidor:

```text
http://localhost:3000
```

## Endpoints

### Autenticação

#### POST /auth/login

Body:

```json
{
  "email": "professor@teste.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "usuario": {
    "id": 1,
    "nome": "Professor",
    "email": "professor@teste.com"
  },
  "token": "..."
}
```

#### GET /auth/validar

Header:

```text
Authorization: Bearer SEU_TOKEN
```

Esse endpoint demonstra a validação do JWT.

### Produtos

#### GET /produtos

Lista todos os produtos. Rota pública.

#### GET /produtos/:id

Busca um produto pelo ID. Rota pública.

#### POST /produtos

Rota protegida por JWT.

Body:

```json
{
  "descricao": "Mouse sem fio",
  "preco": 89.90,
  "categoria": "Periféricos",
  "estoque": 20
}
```

#### PUT /produtos/:id

Rota protegida por JWT.

Exemplo:

```json
{
  "preco": 99.90,
  "estoque": 15
}
```

#### DELETE /produtos/:id

Rota protegida por JWT.

## Testando

O arquivo `requests.http` contém chamadas prontas para extensões como REST Client do VS Code.

Também é possível usar Postman, Insomnia ou Bruno.

## Exemplo de fluxo

1. Execute `POST /auth/login`.
2. Copie o token retornado.
3. Envie o token nas operações protegidas:

```text
Authorization: Bearer SEU_TOKEN
```

4. Faça POST, PUT ou DELETE em `/produtos`.

## Observação didática

O projeto evita propositalmente camadas adicionais como services, repositories, DTOs e schemas para deixar claro o fluxo básico:

```text
Router → Controller → Model → Banco
```

Depois que essa separação estiver compreendida, o projeto pode evoluir para uma arquitetura mais robusta.
