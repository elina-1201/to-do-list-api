import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { originalTasks, tasks } from '../tasks/tasks.list';

@Controller('reset')
export class ResetController {
    @Get()
    @HttpCode(205)
    @ApiOperation({
        summary: 'Reset the task list to its initial predefined state',
    })
    reset() {
        tasks.length = 0;
        tasks.push(...originalTasks);
    }
}
