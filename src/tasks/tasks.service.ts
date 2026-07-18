import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

        this.throwIfAlreadyExists(title);
        tasks.push(newTask);
        return newTask;
    }

    updateTask(taskId: number, newTask: UpdateTaskDto): Task {
        const task = tasks.find(task => task.id === taskId);
        if (!task) throw new NotFoundException(`Task ${taskId} not found`);
        this.throwIfAlreadyExists(newTask.title!);
        Object.assign(task, newTask);
        return task;
    }

    deleteTask(taskId: number) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) throw new NotFoundException(`Task ${taskId} not found`);
        tasks.splice(taskIndex, 1);
    }

    throwIfAlreadyExists(title: string) {
        if (tasks.some(task => task.title === title)) {
            throw new ConflictException(`Task "${title}" already exists`);
        }
    }
}
