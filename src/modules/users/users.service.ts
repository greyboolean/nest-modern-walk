import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: TenantPrismaService) {}

  create(createUserDto: CreateUserDto, tenantId: string) {
    return this.prisma.user.create({ data: { ...createUserDto, tenantId } });
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

  findOneByUsername(username: string) {
    // return this.prisma.user.findUnique({ where: { username } });
    return this.prisma.user.findUniqueOrThrow({ where: { username } });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }
}
