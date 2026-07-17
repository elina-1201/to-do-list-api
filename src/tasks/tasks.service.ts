import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './dto/task.dto';
import { tasks } from './tasks.list';

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

    createTask(title: string): Task {
        const newTask: Task = {
            id: tasks[tasks.length - 1]?.id + 1 || 1,
            title,
            done: false
        };
        if (tasks.some(task => task.title === title)) {
            throw new ConflictException(`Task "${title}" already exists`);
        }

        tasks.push(newTask);
        return newTask;
    }
}
