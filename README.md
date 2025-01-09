# Introdução

Este é um projeto desenvolvido para demonstrar minhas habilidades em desenvolvimento Full Stack, utilizando as tecnologias mais recentes e boas práticas.
O projeto inclui uma API RESTful para gerenciar posts e comentários, com autenticação JWT, e um front-end interativo para gerenciar posts e comentários.

# Preview

<img src="https://github.com/erickbarrosr/snx-technical-challenge/blob/main/frontend/public/preview.png" height="500"/>

## Live link:

Em breve disponível.

## Principais conceitos aplicados

- API RESTful com Node.js e Express.js
- Autenticação JWT
- Sequelize ORM com PostgreSQL
- Gerenciamento de estado com Context API
- CRUD completo (Criar, Ler, Atualizar, Deletar) de posts e comentários
- Validação e tratamento de erros

## Tecnologias utilizadas

### Back-End:

- Node.js
- Express.js
- Sequelize (com PostgreSQL)
- JWT (JSON Web Tokens)
- Middleware de autenticação
- Migrations com Sequelize CLI

### Front-End:

- React.js + Vite
- Material UI
- Axios para requisições HTTP
- Context API para gerenciamento de estado

## Instruções para rodar o projeto:

1.  Clone o repositório:

```
git clone https://github.com/erickbarrosr/snx-technical-challenge.git
```

2. Acesse a pasta do projeto:

```
cd snx-technical-challenge
```

### Configuração do Back-End:

Faça a configuração de um banco de dados PostgreSQL em sua máquina.

1. Instale as dependências:

```
cd backend
npm install
```

2. Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente do banco de dados:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
```

3. Rode as migrations para criar as tabelas no banco:

```
npx sequelize-cli db:migrate
```

4. Inicie o servidor:

```
npm run dev
```

### Configuração do Front-End:

1. Instale as dependências:

```
cd frontend
npm install
```

2. Inicie o servidor de desenvolvimento:

```
npm run dev
```

Agora, o front-end estará acessível em http://localhost:5173.

## Testes de API:

A API estará disponível em http://localhost:3000, ou na porta adicionada na váriavel de ambiente.
Você pode testar as funcionalidades de CRUD de posts e comentários.

## Funcionalidades:

- Autenticação de usuários: Login e registro com JWT.
- Gerenciamento de posts: Criar, editar, deletar e listar posts.
- Gerenciamento de comentários: Adicionar e excluir comentários nos posts.

## Considerações:

- A aplicação utiliza autenticação JWT para garantir a segurança das rotas.
- O banco de dados é configurado com PostgreSQL e o Sequelize para gerenciar a persistência de dados.
- O front-end foi desenvolvido com React.js + Vite e Material UI, garantindo uma interface moderna e interativa.

### Contato do autor em caso de dúvidas:

- E-mail: erickbarrosrezende@gmail.com
- WhatsApp: (32) 9 9963-2070
