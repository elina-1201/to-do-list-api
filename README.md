
# To-do list API
Simple CRUD API written in [NestJS](https://nestjs.com/)

## API Overview

| CRUD operation | HTTP method | Example endpoint | Meaning |
| -------------- | ----------- | ----------------- | ------- |
| **C**reate | `POST` | `POST /tasks` | Add a new task |
| **R**ead | `GET` | `GET /tasks`<br>`GET /tasks/3` | List all tasks<br>get task 3 |
| **U**pdate | `PUT` | `PUT /tasks/3` | Change task 3 |
| **D**elete | `DELETE` | `DELETE /tasks/3` | Remove task 3 |

# Getting Started
## Prerequisites:

- Node.js (v18 or higher)
- npm / yarn / pnpm
- Nest CLI (optional, for scaffolding): `npm i -g @nestjs/cli`

## Run the project:

``` bash
$ npm install
$ npm run start
```

API will be available at http://localhost:3000.
<br>Swagger UI at http://localhost:3000/api.
