import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginatedTasks } from './dto/paginated-tasks.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { INITIAL_TASKS, Task } from './task.model';

/**
 * In-memory store for tasks. No database is used — the array lives for the
 * lifetime of the process. `reset()` restores the predefined seed tasks.
 */
@Injectable()
export class TasksService {
  private tasks: Task[] = INITIAL_TASKS.map((task) => ({ ...task }));

  /** Return a deep copy of every task. */
  findAll(): Task[] {
    return this.tasks.map((task) => ({ ...task }));
  }

  /** Return a single task by id or throw NotFoundException. */
  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" was not found`);
    }
    return { ...task };
  }

  /** Create a new task with `done: false` and an auto-incremented id. */
  create(dto: CreateTaskDto): Task {
    const nextId = this.getNextId();
    const task: Task = {
      id: nextId,
      title: dto.title,
      done: false,
    };
    this.tasks.push(task);
    return { ...task };
  }

  /** Partially update an existing task. */
  update(id: string, dto: UpdateTaskDto): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" was not found`);
    }
    if (dto.title !== undefined) {
      task.title = dto.title;
    }
    if (dto.done !== undefined) {
      task.done = dto.done;
    }
    return { ...task };
  }

  /** Remove a task. Throws NotFoundException when it does not exist. */
  remove(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id "${id}" was not found`);
    }
    this.tasks.splice(index, 1);
  }

  /** Restore the predefined seed tasks. */
  reset(): Task[] {
    this.tasks = INITIAL_TASKS.map((task) => ({ ...task }));
    return this.findAll();
  }

  /** Aggregate counts for the /stats endpoint. */
  getStats(): { total: number; done: number; open: number } {
    const total = this.tasks.length;
    const done = this.tasks.filter((t) => t.done).length;
    return { total, done, open: total - done };
  }

  /** Apply optional search / done filters and pagination. */
  findWithQuery(query: QueryTaskDto): PaginatedTasks {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    let filtered = this.tasks;

    if (query.search) {
      const needle = query.search.toLowerCase();
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(needle));
    }

    if (query.done !== undefined) {
      filtered = filtered.filter((t) => t.done === query.done);
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit).map((t) => ({ ...t }));

    return { data, total, page, limit, totalPages };
  }

  /** Compute the next id as the increment of the highest numeric id. */
  private getNextId(): string {
    const numericIds = this.tasks
      .map((t) => Number(t.id))
      .filter((n) => Number.isFinite(n));
    const maxId = numericIds.length ? Math.max(...numericIds) : 0;
    return String(maxId + 1);
  }
}
