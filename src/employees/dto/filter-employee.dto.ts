import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterEmployeesDto {
  @ApiPropertyOptional({ description: 'Search by department name' })
  @IsOptional() @IsString() department?: string;

  @ApiPropertyOptional({ description: 'Search by position title' })
  @IsOptional() @IsString() title?: string;

  @ApiPropertyOptional({ description: 'Search by city or region' })
  @IsOptional() @IsString() location?: string;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional() page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional() limit?: number;
}
