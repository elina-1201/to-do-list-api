# To-Do List API

A backend CRUD API for managing to-do tasks, built with [NestJS](https://nestjs.com/).

Tasks are stored **in memory** (a simple array) — there is **no database**. The
store is seeded with three predefined tasks on startup and can be reset at any
time. The API is fully type-safe, validates incoming data, and ships with a
Swagger UI for interactive documentation.

## Features

- Full CRUD over an in-memory task list (`GET`, `POST`, `PUT`, `DELETE`)
- Three predefined seed tasks (`Task 1`, `Task 2`, `Task 3`)
- New tasks get `done: false` and an auto-incremented `id`
- Optional **pagination**, **search by title**, and **filter by `done`** status
- Convenient HTTP status codes (`201` create, `204` delete, `404` not found, …)
- Global `ValidationPipe` with implicit transform (query/body coercion + validation)
- `/reset` endpoint to restore the initial task list
- `/stats` endpoint returning `{ total, done, open }`
- `/health` health-check endpoint
- `/` root endpoint returning endpoint info as JSON
- Swagger UI at `/api/docs` with request & response schemas
- Type-safe code throughout (strict TypeScript)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (or use `npm`/`yarn` — adjust scripts accordingly)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server (with hot reload):

```bash
pnpm start:dev
```

Or build and run the production build:

```bash
pnpm build
pnpm start:prod
```

The server listens on `http://localhost:3000` by default. Override the port with
the `PORT` environment variable, e.g. `PORT=3100 pnpm start:prod`.

## Available Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `pnpm start`       | Start the app                           |
| `pnpm start:dev`   | Start with watch mode (hot reload)       |
| `pnpm start:prod`  | Run the compiled production build        |
| `pnpm build`       | Compile the TypeScript project           |
| `pnpm lint`        | Lint and auto-fix with ESLint            |
| `pnpm test`        | Run unit tests with Jest                 |
| `pnpm test:e2e`    | Run end-to-end tests                     |

## API Reference

Base URL: `http://localhost:3000`

### Task model

```json
{ "id": "1", "title": "Task 1", "done": false }
```

### Endpoints

| Method   | Path             | Description                                              | Success code |
| -------- | ---------------- | -------------------------------------------------------- | ------------ |
| `GET`    | `/`              | Returns API information and available endpoints (JSON)   | `200`        |
| `GET`    | `/health`        | Health check                                            | `200`        |
| `GET`    | `/tasks`         | List tasks (supports `page`, `limit`, `search`, `done`)   | `200`        |
| `GET`    | `/tasks/stats`   | Returns `{ total, done, open }`                          | `200`        |
| `GET`    | `/tasks/reset`   | Reset the task list to its initial state                 | `200`        |
| `GET`    | `/tasks/:id`     | Get a single task by id                                  | `200`        |
| `POST`   | `/tasks`         | Create a new task (body: `{ "title": "..." }`)           | `201`        |
| `PUT`    | `/tasks/:id`     | Update a task (body: `{ "title"?, "done"? }`)            | `200`        |
| `DELETE` | `/tasks/:id`     | Delete a task                                           | `204`        |

All error responses return a JSON body with `statusCode`, `error`, and `message`
(e.g. `404` when a task is not found, `400` on validation failure).

### Query parameters for `GET /tasks` (all optional)

| Param    | Type    | Description                                              |
| -------- | ------- | -------------------------------------------------------- |
| `page`   | number  | 1-based page number (default `1`)                        |
| `limit`  | number  | Items per page (default `10`)                            |
| `search` | string  | Case-insensitive substring match against the title       |
| `done`   | boolean | Filter by completion status (`true` / `false`)           |

### Examples

```bash
# List all tasks (paginated)
curl http://localhost:3000/tasks

# Search + filter + paginate
curl "http://localhost:3000/tasks?search=Task&done=false&page=1&limit=2"

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Buy milk"}'

# Update a task
curl -X PUT http://localhost:3000/tasks/1 \
  -H 'Content-Type: application/json' \
  -d '{"done":true}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1

# Stats and reset
curl http://localhost:3000/tasks/stats
curl http://localhost:3000/tasks/reset
```

## API Documentation (Swagger)

Interactive Swagger UI is available at:

```
http://localhost:3000/api/docs
```

It documents every endpoint along with request and response schemas.

## Project Structure

```
src/
├── app.controller.ts        # Root info (/) and health (/health)
├── app.service.ts           # App info + health logic
├── app.module.ts            # Root module
├── main.ts                  # Bootstrap, ValidationPipe, Swagger setup
└── tasks/
    ├── tasks.module.ts      # Tasks feature module
    ├── tasks.controller.ts  # Task CRUD + stats + reset endpoints
    ├── tasks.service.ts     # In-memory store & business logic
    ├── task.model.ts        # Task entity + initial seed data
    └── dto/
        ├── create-task.dto.ts     # POST body validation
        ├── update-task.dto.ts     # PUT body validation
        ├── query-task.dto.ts      # GET query validation
        └── paginated-tasks.dto.ts # List response envelope
```

## Notes

- Data is **not persisted** — restarting the server restores the three seed
  tasks. Use `GET /tasks/reset` to reset the list at runtime.
- The project uses strict TypeScript and `class-validator` / `class-transformer`
  for runtime validation of all client-supplied input.

## License

UNLICENSED


# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
