import { Task } from "./dto/task.dto";

export const originalTasks: Task[] = [
    { id: 1, title: 'Task 1', done: false },
    { id: 2, title: 'Task 2', done: true },
    { id: 3, title: 'Task 3', done: false },
];

export const tasks: Task[] = [...originalTasks];


