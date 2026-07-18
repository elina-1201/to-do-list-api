import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../task.model';

/**
 * Envelope returned by the paginated list endpoint.
 */
export class PaginatedTasks {
  @ApiProperty({ type: Task, isArray: true, description: 'Page items' })
  data: Task[];

  @ApiProperty({ example: 25, description: 'Total number of matching tasks' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current 1-based page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Requested page size' })
  limit: number;

  @ApiProperty({ example: 3, description: 'Total number of pages available' })
  totalPages: number;
}
