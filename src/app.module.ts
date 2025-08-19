import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, PositionsModule],
  providers: [PrismaService],
})
export class AppModule {}
