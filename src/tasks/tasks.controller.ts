import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Task } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTaskCreate, ApiTaskDelete, ApiTaskList, ApiTaskSingle, ApiTaskUpdate } from './tasks-api.decorator';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  @ApiTaskList()
  getTasks(
    @Query() paginationDto: PaginationDto): Task[] {
    return this.tasksService.getTasks(paginationDto);
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

  @Put(':id')
  @ApiTaskUpdate()
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTaskDelete()
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    this.tasksService.deleteTask(id);
  }
}