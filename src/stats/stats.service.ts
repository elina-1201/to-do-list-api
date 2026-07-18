import { Injectable } from '@nestjs/common';
import { tasks } from '../tasks/tasks.list';

@Injectable()
export class StatsService {
    getStats() {
        return {
            total: tasks.length,
            done: tasks.filter(task => task.done).length,
            open: tasks.filter(task => !task.done).length,
        };
    }
}


