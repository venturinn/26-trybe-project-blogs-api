Olá,

Nesse repositório está armazenado o meu projeto avaliativo de número 26, realizado durante o meu período de estudos na Trybe.

Importante: o intuito desse repositório é manter um histórico da minha evolução como Desenvolvedor Web, dessa forma, deve-se considerar que parte das soluções presentes no projeto foram realizadas durante a fase de aprendizado e podem não refletir as melhores práticas de desenvolvimento.

:construction: README em construção :construction:

---

# Project Blogs API

Esse é um projeto de aprendizado na qual foi desenvolvida uma API utilizando arquitetura MSC que fornece operações CRUD em um banco de dados.

- Deploy da API realizada no Heroku: https://venturin-blogs-api.herokuapp.com/
- Utilizado banco de dados Postgres hospedado no Supabase (https://supabase.com/)

---

## Tecnologias utilizadas:

- Docker
- Node.js
- Express
- ORM Sequelize
- JWT
- Joi
- DotEnv

---

## Diagrama de Entidade-Relacionamento do banco de dados:

 ![DER](./public/der.png)

 ---

## Endpoints:

- POST  https://venturin-blogs-api.herokuapp.com/login

O corpo da requisição deverá enviar as informações de um usuário já cadastrado no banco de dados e caso as informações estejam corretas um token JWT com validade de 7 dias será retornado pela API

Para o primeiro login utilizar: 
```json
{
  "email": "diego@gmail.com",
  "password": "123456"
}
```

Para acessar os próximos endpoints um token válido deverá ser enviado no Header Authorization das requisições.

---

- POST  https://venturin-blogs-api.herokuapp.com/user

O endpoint adiciona um novo user na tabela no banco de dados;

O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```
---

- GET  https://venturin-blogs-api.herokuapp.com/user

O endpoint trará todos users do banco de dados;

---

- GET  https://venturin-blogs-api.herokuapp.com/user/:id

O endpoint trará o user baseado no id do banco de dados, se ele existir;

---

- POST  https://venturin-blogs-api.herokuapp.com/categories

O endpoint adicionará uma nova categoria na tabela no banco de dados;

O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "name": "Typescript"
}
```
---

- GET  https://venturin-blogs-api.herokuapp.com/categories

O endpoint trará todas categorias do banco de dados;

---

- POST  https://venturin-blogs-api.herokuapp.com/post

O endpoint irá adicionar um novo blog post e vinculá-lo as categorias nas tabelas no banco de dados;

O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```
---

- GET  https://venturin-blogs-api.herokuapp.com/post

O endpoint trará todos os blogs post, user dono dele e as categorias do banco de dados;

---

- GET  https://venturin-blogs-api.herokuapp.com/post/:id

O endpoint trará o blog post baseado no id do banco de dados, se ele existir;

---

- PUT  https://venturin-blogs-api.herokuapp.com/post/:id

O endpoint alterará um post do banco de dados, se ele existir e se o usuário dono do post a ser editado corresponder ao usuário logado;

O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```
---

- DELETE  https://venturin-blogs-api.herokuapp.com/post/:id

O endpoint excluirá um post do banco de dados, se ele existir e se o usuário dono do post a ser editado corresponder ao usuário logado;

---

- GET  https://venturin-blogs-api.herokuapp.com/post/search?q=:searchTerm

O endpoint retornará um array de blogs post que contenham em seu título ou conteúdo o termo passado na URL;
Caso nenhum blog post satisfaça a busca um array vázio será retornado;
