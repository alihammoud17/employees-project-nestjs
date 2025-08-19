import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }
}
