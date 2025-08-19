import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(departmentId?: number) {
    return this.prisma.position.findMany({
      where: departmentId ? { departmentId } : {},
      include: { department: true },
      orderBy: { title: 'asc' },
    });
  }
}
