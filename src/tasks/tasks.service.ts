import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, tasks } from './tasks.list';

@Injectable()
export class TasksService {
    getTasks(): Task[] {
        return tasks;
    }

    getTaskById(id: number): Task {
        const task = tasks.find(task => task.id === id);
        if (!task) throw new NotFoundException(`Task ${id} not found`);
        return task;
    }
}
