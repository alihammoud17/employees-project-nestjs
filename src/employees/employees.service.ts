import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeesDto } from './dto/filter-employee.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {

    const position = await this.prisma.position.findUnique({
      where: { id: dto.positionId },
    });

    if (!position) {
      throw new BadRequestException('Invalid position ID.');
    }

    const { minSalary, maxSalary } = position;
    const { monthlySalary } = dto;

    if (monthlySalary < minSalary || monthlySalary > maxSalary) {
      throw new BadRequestException(
        `Salary must be between ${minSalary} and ${maxSalary} for this position.`,
      );
    }

    return this.prisma.employee.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        mobileNumber: dto.mobileNumber,
        pictureUrl: dto.pictureUrl,
        position: { connect: { id: dto.positionId } },
        address: { create: dto.address },
        monthlySalary: dto.monthlySalary
      },
      include: { position: { include: { department: true } }, address: true },
    });
  }

  async findAll(filters: FilterEmployeesDto) {
    const { departmentId, positionId, search, page = 1, limit = 10 } = filters;

    const whereClause : Prisma.EmployeeWhereInput = {
      OR: search
        ? [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { mobileNumber: { contains: search, mode: 'insensitive' } },
            { address: { city: { contains: search, mode: 'insensitive' } } },
            { address: { region: { contains: search, mode: 'insensitive' } } },
            { address: { area: { contains: search, mode: 'insensitive' } } },
            { address: { postalCode: { contains: search, mode: 'insensitive' } } },
          ]
        : undefined,
      positionId: positionId ? Number(positionId) : undefined,
      position: {
        departmentId: departmentId ? Number(departmentId) : undefined,
      },
    };

    const total = await this.prisma.employee.count({ where: whereClause });

    const employees = await this.prisma.employee.findMany({
      where: whereClause,
      include: {
        position: { include: { department: true } },
        address: true,
      },
      skip: (page - 1) * limit,
      take: +limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      items: employees,
      meta: {
        totalPages,
        currentPage: page,
      },
    };
  }


  async findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        position: { include: { department: true } },
        address: true,
      },
    });
  }

  async update(id: number, dto: UpdateEmployeeDto) {

    if (dto.positionId || dto.monthlySalary) {
      const positionId =
        dto.positionId ||
        (await this.prisma.employee.findUnique({ where: { id } }))
          ?.positionId;

      if (!positionId) {
        throw new BadRequestException('Position ID is required.');
      }

      const position = await this.prisma.position.findUnique({
        where: { id: positionId },
      });

      if (!position) {
        throw new BadRequestException('Invalid position ID.');
      }

      const { minSalary, maxSalary } = position;
      const salaryToCheck =
        dto.monthlySalary ||
        (await this.prisma.employee.findUnique({ where: { id } }))
          ?.monthlySalary;

      if (salaryToCheck && (salaryToCheck < minSalary || salaryToCheck > maxSalary)) {
        throw new BadRequestException(
          `Salary must be between ${minSalary} and ${maxSalary} for this position.`,
        );
      }
    }

    return this.prisma.employee.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        mobileNumber: dto.mobileNumber,
        pictureUrl: dto.pictureUrl,
        positionId: dto.positionId,
        address: dto.address
          ? { update: dto.address }
          : undefined,
      },
      include: { position: { include: { department: true } }, address: true },
    });
  }

  async remove(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
