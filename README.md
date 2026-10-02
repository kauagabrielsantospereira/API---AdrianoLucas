# API - Sistema de Gestão de Vendas

API desenvolvida em **Node.js**, **Express** e **MySQL** para gerenciamento de clientes, produtos, usuários e pedidos.

O projeto utiliza uma arquitetura modular com `express.Router()` para organização das rotas.

---

# 1. Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Nodemon
- Postman
- Git e GitHub

---

# 2. Estrutura do projeto

A estrutura do projeto é:

```text
api-clientes/
│
├── .env
├── .env.example
├── .gitignore
├── db.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── script_banco.sql
│
└── routes/
    ├── clientes.js
    ├── produtos.js
    ├── usuarios.js
    └── pedidos.js
```

---

# 3. Pré-requisitos

Antes de iniciar o projeto, instale:

- Node.js
- MySQL
- Git
- Postman

---

# 4. Clonar o projeto

Abra o terminal e execute:

```bash
git clone URL_DO_REPOSITORIO
```

Depois entre na pasta:

```bash
cd api-clientes
```

---

# 5. Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

Esse comando instala todas as dependências necessárias para executar a aplicação.

---

# 6. Configurar as variáveis de ambiente

Na raiz do projeto existe o arquivo:

```text
.env.example
```

Utilize esse arquivo como modelo para criar o arquivo `.env`.

O arquivo `.env` deve conter:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=sistema_cliente
```

### Descrição das variáveis

| Variável | Descrição |
|---|---|
| `PORT` | Porta utilizada pela API |
| `DB_HOST` | Endereço do servidor MySQL |
| `DB_USER` | Usuário do MySQL |
| `DB_PASS` | Senha do MySQL |
| `DB_NAME` | Nome do banco de dados |

> O arquivo `.env` contém configurações locais e não deve ser enviado para o GitHub.

---

# 7. Configurar o banco de dados

O projeto possui o arquivo:

```text
script_banco.sql
```

Esse arquivo contém a criação das tabelas e os dados iniciais necessários para o funcionamento do sistema.

As principais tabelas utilizadas são:

- `clientes`
- `produtos`
- `usuarios`
- `pedidos`
- `itens_pedido`

## 7.1 Importar o banco pelo MySQL

Abra o MySQL ou o MySQL Workbench.

Execute o conteúdo do arquivo:

```text
script_banco.sql
```

O script cria o banco, as tabelas e os dados iniciais.

Depois confirme se o banco `sistema_cliente` foi criado corretamente.

---

# 8. Executar a aplicação

Depois de instalar as dependências e configurar o banco, execute:

```bash
npm run dev
```

Se tudo estiver correto, o terminal deverá mostrar:

```text
Servidor rodando na porta 3000
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

# 9. Testando a API com o Postman

Abra o Postman e utilize a URL base:

```text
http://localhost:3000
```

Os testes devem ser realizados utilizando os métodos HTTP correspondentes a cada operação.

---

# 10. Rotas de Clientes

## Criar cliente

```http
POST /clientes
```

Exemplo de corpo:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999"
}
```

Resposta esperada:

```text
201 Created
```

---

## Listar clientes

```http
GET /clientes
```

---

## Buscar cliente por ID

```http
GET /clientes/1
```

---

## Atualizar cliente

```http
PUT /clientes/1
```

---

## Atualizar parcialmente um cliente

```http
PATCH /clientes/1
```

---

## Excluir cliente

```http
DELETE /clientes/1
```

---

# 11. Rotas de Produtos

## Criar produto

```http
POST /produtos
```

Exemplo:

```json
{
  "nome": "Teclado",
  "descricao": "Teclado USB",
  "preco": 50,
  "estoque": 10
}
```

---

## Listar produtos

```http
GET /produtos
```

---

## Buscar produto por ID

```http
GET /produtos/1
```

---

## Atualizar produto

```http
PUT /produtos/1
```

---

## Atualizar parcialmente um produto

```http
PATCH /produtos/1
```

---

## Excluir produto

```http
DELETE /produtos/1
```

---

# 12. Rotas de Usuários

## Criar usuário

```http
POST /usuarios
```

Exemplo:

```json
{
  "nome": "Administrador",
  "email": "admin@email.com",
  "senha": "123456",
  "perfil": "admin",
  "status": "ativo"
}
```

---

## Listar usuários

```http
GET /usuarios
```

---

## Buscar usuário por ID

```http
GET /usuarios/1
```

---

## Atualizar usuário

```http
PUT /usuarios/1
```

---

## Atualizar parcialmente um usuário

```http
PATCH /usuarios/1
```

Exemplo:

```json
{
  "status": "inativo"
}
```

---

## Excluir usuário

```http
DELETE /usuarios/1
```

---

# 13. Rotas de Pedidos

## Criar pedido

```http
POST /pedidos
```

Exemplo:

```json
{
  "cliente_id": 1,
  "valor_total": 100.50
}
```

---

## Listar pedidos

```http
GET /pedidos
```

---

## Buscar pedido por ID

```http
GET /pedidos/1
```

---

## Alterar status do pedido

```http
PATCH /pedidos/1/status
```

Exemplo:

```json
{
  "status": "pago"
}
```

Os status utilizados são:

```text
pendente
pago
cancelado
```

---

# 14. Itens do pedido

## Adicionar item ao pedido

```http
POST /pedidos/1/itens
```

Exemplo:

```json
{
  "produto_id": 1,
  "quantidade": 2,
  "preco_unitario": 50
}
```

---

## Remover item do pedido

```http
DELETE /pedidos/1/itens/1
```

Onde:

- `1` após `/pedidos/` representa o ID do pedido.
- `1` após `/itens/` representa o ID do item.

---

# 15. Testes realizados

As principais operações da API foram testadas utilizando o Postman.

Foram realizados testes de:

- Criação de clientes
- Consulta de clientes
- Atualização de clientes
- Exclusão de clientes
- Criação de produtos
- Consulta de produtos
- Criação de usuários
- Consulta de usuários
- Atualização completa de usuários
- Atualização parcial de usuários
- Exclusão de usuários
- Criação de pedidos
- Consulta de pedidos
- Consulta de pedido por ID
- Alteração do status de pedidos
- Adição de itens aos pedidos
- Exclusão de itens dos pedidos

Também foram realizados testes de respostas de erro, como recursos inexistentes e dados inválidos.

---

# 16. Códigos HTTP utilizados

A API utiliza códigos HTTP para indicar o resultado das operações.

| Código | Significado |
|---|---|
| `200` | Operação realizada com sucesso |
| `201` | Recurso criado com sucesso |
| `400` | Dados enviados são inválidos |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |

---

# 17. Organização das rotas

As rotas são separadas em arquivos dentro da pasta `routes`:

```text
routes/
├── clientes.js
├── produtos.js
├── usuarios.js
└── pedidos.js
```

Cada arquivo utiliza `express.Router()` para manter a organização e modularização da aplicação.

O arquivo `index.js` é responsável por registrar os routers:

```js
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pedidos', pedidosRouter);
```

---

# 18. Banco de dados

O banco utilizado pelo projeto é:

```text
sistema_cliente
```

As tabelas principais são:

```text
clientes
produtos
usuarios
pedidos
itens_pedido
```

Os pedidos possuem relacionamento com clientes.

Os itens de pedido possuem relacionamento com pedidos e produtos.

---

# 19. Arquivos importantes

### `index.js`

Responsável por iniciar o servidor Express e registrar as rotas.

### `db.js`

Responsável pela conexão da aplicação com o banco de dados MySQL.

### `.env`

Contém as configurações locais do banco e da aplicação.

### `.env.example`

Modelo das variáveis necessárias para configurar o ambiente.

### `script_banco.sql`

Contém a criação do banco, tabelas e dados iniciais.

### `routes/`

Contém as rotas organizadas por recurso.

---

# 20. Git

O projeto utiliza Git para controle de versão.

Arquivos que não devem ser enviados para o repositório:

```text
node_modules/
.env
```

Esses arquivos estão configurados no `.gitignore`.

Para registrar alterações:

```bash
git add .
```

Depois:

```bash
git commit -m "Implementa API de gestão de vendas"
```

---

# 21. Execução rápida

Depois que o projeto estiver configurado, os passos principais são:

```bash
git clone URL_DO_REPOSITORIO
cd api-clientes
npm install
```

Configure o `.env`.

Depois importe:

```text
script_banco.sql
```

E execute:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

---

# 22. Coleção do Postman

A coleção do Postman deve ser exportada e disponibilizada junto ao projeto para permitir a reprodução dos testes das rotas da API.

---

# 23. Autor

Projeto desenvolvido como atividade prática do curso Técnico em Informática para Internet.