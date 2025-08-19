import { Controller, Get, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  @ApiQuery({ name: 'departmentId', required: false, description: 'Filter positions by department ID' })
  findAll(@Query('departmentId') departmentId?: string) {
    return this.positionsService.findAll(departmentId ? +departmentId : undefined);
  }
}
