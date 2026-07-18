import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Another task', description: 'The task title' })
    title?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ example: false, description: 'The task completion status' })
    done?: boolean;
}