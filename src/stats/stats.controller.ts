import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(private readonly statsService: StatsService) { }

    @Get()
    @ApiOperation({ summary: 'Return aggregate counts of tasks' })
    getStats() {
        return this.statsService.getStats();
    }
}
