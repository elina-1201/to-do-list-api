import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Task } from './dto/task.dto';

export function ApiTaskList() {
    return applyDecorators(
        ApiOperation({
            summary: 'List tasks with optional search, filter and pagination',
        }),
        ApiOkResponse({ type: [Task] }),
    );
}

export function ApiTaskSingle() {
    return applyDecorators(
        ApiOperation({ summary: 'Get a single task by id' }),
        ApiOkResponse({ type: Task }),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}

export function ApiTaskCreate() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new task' }),
        ApiCreatedResponse({ type: Task, description: 'The created task' }),
        ApiConflictResponse({ description: 'Task with the same title already exists' })
    );
}

export function ApiTaskUpdate() {
    return applyDecorators(
        ApiOperation({ summary: 'Update an existing task' }),
        ApiOkResponse({ type: Task, description: 'The updated task' }),
        ApiNotFoundResponse({ description: 'Task not found' }),
        ApiConflictResponse({ description: 'Task with the same title already exists' })
    );
}

export function ApiTaskDelete() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a task' }),
        ApiNoContentResponse({ description: 'Task deleted successfully' }),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}