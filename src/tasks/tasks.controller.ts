import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.dto';
import { ApiTaskCreate, ApiTaskList, ApiTaskSingle } from './tasks-api.decorator';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    @ApiTaskList()
    getTasks(): Task[] {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    @ApiTaskSingle()
    getTaskById(@Param('id', ParseIntPipe) id: number): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @ApiTaskCreate()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto.title);
    }
}