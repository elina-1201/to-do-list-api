import { Injectable } from '@nestjs/common';

export interface EndpointInfo {
  name: string;
  method: string;
  path: string;
  description: string;
}

export interface AppInfo {
  name: string;
  version: string;
  description: string;
  endpoints: EndpointInfo[];
}

@Injectable()
export class AppService {
  getAppInfo(): AppInfo {
    return {
      name: 'To-Do List API',
      version: '1.0.0',
      description:
        'In-memory CRUD API for managing to-do tasks, built with NestJS.',
      endpoints: [
        {
          name: 'Info',
          method: 'GET',
          path: '/',
          description: 'Returns this endpoint information',
        },
        {
          name: 'Health',
          method: 'GET',
          path: '/health',
          description: 'Health check (200 OK)',
        },
        {
          name: 'List tasks',
          method: 'GET',
          path: '/tasks',
          description: 'List tasks with search, filter and pagination',
        },
        {
          name: 'Task stats',
          method: 'GET',
          path: '/tasks/stats',
          description: 'Return total/done/open counts',
        },
        {
          name: 'Reset tasks',
          method: 'GET',
          path: '/tasks/reset',
          description: 'Reset tasks to initial state',
        },
        {
          name: 'Get task',
          method: 'GET',
          path: '/tasks/:id',
          description: 'Get a single task by id',
        },
        {
          name: 'Create task',
          method: 'POST',
          path: '/tasks',
          description: 'Create a new task',
        },
        {
          name: 'Update task',
          method: 'PUT',
          path: '/tasks/:id',
          description: 'Update an existing task',
        },
        {
          name: 'Delete task',
          method: 'DELETE',
          path: '/tasks/:id',
          description: 'Delete a task',
        },
        {
          name: 'API docs',
          method: 'GET',
          path: '/api/docs',
          description: 'Swagger UI',
        },
      ],
    };
  }

  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
