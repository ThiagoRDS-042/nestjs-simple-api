<h1 align="center">Authors API :computer:</h1>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Nestjs](https://nestjs.com)
- [Typescript](https://www.typescriptlang.org)
- [Postgres](https://www.postgresql.org)
- [Prisma](https://www.prisma.io)
- [Insomnia](https://insomnia.rest)
- [Docker](https://www.docker.com)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io)
- [REST]

## 🚀 Como executar a aplicação

- Executando docker-compose

  - **docker-compose**
    - Abra o terminal e digite `docker-compose up` para subir o container com o banco de dados postgresql.

- Executando a aplicação:

  - **aplicação**
    - Abra o terminal e digite `yarn ou yarn install` para instalar todas as dependências do projeto.
    - Manipule suas variáveis de ambiente para o uso, ex: `.env`.
    - No mesmo terminal digite `yarn migrate:dev` para criar as tabelas do bando de dados.
    - Ainda no mesmo terminal agora digite `yarn start:dev ou yarn start` para iniciar a aplicação.
    - Por fim, a aplicação estará disponível em `http://localhost:${SERVER_PORT}`.

- Rodando os testes:

  - **jest**
    - Abra o terminal e digite `yarn test` para iniciar os testes unitários.

- Documentação da aplicação:

  - **Swagger**
    - Para acessar a documentação da API basta iniciar a aplicação, abrir seu navegador e acessar `http://localhost:${SERVER_PORT}/api`
  
  - **Insomnia**
    - Há um arquivo do insomnia em 'src/docs/insomnia/insomnia.json' importe em seu aplicativo e teste as requisições.

  - **Diagrama**
    - [Diagrama ERD](./src/docs/diagrams/diagram_erd.md)


### Autor

---

Feito por ❤️ Thiago Rodrigues 👋🏽
