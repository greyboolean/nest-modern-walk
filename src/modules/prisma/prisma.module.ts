import { Module } from '@nestjs/common';
import { MainPrismaService } from './main-prisma.service';
import { TenantPrismaService } from './tenant-prisma.service';

@Module({
  providers: [MainPrismaService, TenantPrismaService],
  exports: [MainPrismaService, TenantPrismaService],
})
export class PrismaModule {}
