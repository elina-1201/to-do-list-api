import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginatedTasks } from './dto/paginated-tasks.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'List tasks with optional search, filter and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of tasks',
    type: PaginatedTasks,
  })
  findAll(@Query() query: QueryTaskDto): PaginatedTasks {
    return this.tasksService.findWithQuery(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Return aggregate counts of tasks' })
  @ApiResponse({
    status: 200,
    description: 'Task statistics',
    schema: {
      example: { total: 3, done: 1, open: 2 },
    },
  })
  getStats(): { total: number; done: number; open: number } {
    return this.tasksService.getStats();
  }

  @Get('reset')
  @ApiOperation({
    summary: 'Reset the task list to its initial predefined state',
  })
  @ApiResponse({
    status: 200,
    description: 'The reset list of tasks',
    type: Task,
    isArray: true,
  })
  reset(): Task[] {
    return this.tasksService.reset();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single task by id' })
  @ApiParam({ name: 'id', example: '1', description: 'Task identifier' })
  @ApiResponse({ status: 200, description: 'The requested task', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task was created', type: Task })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({ name: 'id', example: '1', description: 'Task identifier' })
  @ApiResponse({ status: 200, description: 'The updated task', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', example: '1', description: 'Task identifier' })
  @ApiResponse({ status: 204, description: 'The task was deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }
}
