import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: TenantPrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll(limit?: string, sort?: 'asc' | 'desc') {
    return this.prisma.user.findMany({
      ...(limit && { take: parseInt(limit) }),
      ...(sort && { orderBy: { id: sort } }),
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
