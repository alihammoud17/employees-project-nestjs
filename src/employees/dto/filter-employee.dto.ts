import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterEmployeesDto {
  @ApiPropertyOptional({ description: 'Search by department name' })
  @IsOptional() departmentId?: number;

  @ApiPropertyOptional({ description: 'Search by position title' })
  @IsOptional() positionId?: number;

  @ApiPropertyOptional({ description: 'Search' })
  @IsOptional() @IsString() search?: string;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional() page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional() limit?: number;
}
