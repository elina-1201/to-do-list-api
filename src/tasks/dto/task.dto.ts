import { ApiProperty } from '@nestjs/swagger';

export class Task {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 'Buy milk' })
    title!: string;

    @ApiProperty({ example: false })
    done!: boolean;
}