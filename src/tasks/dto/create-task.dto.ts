import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Payload required to create a new task.
 * The `done` flag is always initialised to `false` by the service.
 */
export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'The title of the task',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;
}
