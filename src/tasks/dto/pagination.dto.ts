import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @Min(0)
    offset: number = 0;

    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => value === 'true')
    done?: boolean;

    @IsOptional()
    search?: string;
}