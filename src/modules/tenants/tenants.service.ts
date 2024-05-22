import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { MainPrismaService } from '../prisma/main-prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: MainPrismaService) {}

  create(createTenantDto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: createTenantDto,
    });
  }

  findAll() {
    return this.prisma.tenant.findMany();
  }

  findOne(id: number) {
    return this.prisma.tenant.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  remove(id: number) {
    return this.prisma.tenant.delete({
      where: { id },
    });
  }
}
