import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: TenantPrismaService) {}

  async create(createUserDto: CreateUserDto, tenantId: string) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
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
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }
}
