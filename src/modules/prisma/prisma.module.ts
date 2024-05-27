import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { MainPrismaService } from './main-prisma.service';
import { TenantPrismaService } from './tenant-prisma.service';

@Module({
  providers: [
    MainPrismaService,
    {
      provide: TenantPrismaService,
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: (request: Request) => {
        const {
          tenant: { datasourceUrl, tenantId },
        } = request;
        return new TenantPrismaService(datasourceUrl).extend(tenantId);
      },
    },
  ],
  exports: [MainPrismaService, TenantPrismaService],
})
export class PrismaModule {}
