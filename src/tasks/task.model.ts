import { ApiProperty } from '@nestjs/swagger';

/**
 * Domain model representing a single to-do task.
 * Stored in an in-memory array (no database).
 */
export class Task {
  @ApiProperty({ example: '1', description: 'Unique identifier of the task' })
  id: string;

  @ApiProperty({
    example: 'Task 1',
    description: 'Title / short description of the task',
  })
  title: string;

  @ApiProperty({
    example: false,
    description: 'Whether the task has been completed',
  })
  done: boolean;
}

/**
 * The three predefined tasks that seed the in-memory store on startup
 * and after a reset.
 */
export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Task 1', done: false },
  { id: '2', title: 'Task 2', done: false },
  { id: '3', title: 'Task 3', done: false },
];
