import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * Payload for partially updating a task.
 * All fields are optional; only provided fields are changed.
 */
export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Buy groceries and cook dinner',
    description: 'Updated title of the task',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Updated completion status of the task',
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
