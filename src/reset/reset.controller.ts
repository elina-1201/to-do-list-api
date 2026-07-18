import { Controller, Get, HttpCode } from '@nestjs/common';
import { originalTasks, tasks } from '../tasks/tasks.list';

@Controller('reset')
export class ResetController {
    @Get()
    @HttpCode(205)
    reset() {
        tasks.length = 0;
        tasks.push(...originalTasks);
    }
}
