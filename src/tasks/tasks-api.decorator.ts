import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Task } from './dto/task.dto';

export function ApiTaskList() {
    return applyDecorators(
        ApiOkResponse({ type: [Task] }),
    );
}

export function ApiTaskSingle() {
    return applyDecorators(
        ApiOkResponse({ type: Task }),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}

export function ApiTaskCreate() {
    return applyDecorators(
        ApiCreatedResponse({ type: Task, description: 'The created task' }),
        ApiConflictResponse({ description: 'Task with the same title already exists' })
    );
}