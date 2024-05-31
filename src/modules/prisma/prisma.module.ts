import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { MainPrismaService } from './main-prisma.service';
import { TenantPrismaService } from './tenant-prisma.service';

export interface ContextPayload {
  tenantId: string;
  datasourceUrl: string;
}

@Module({
  providers: [
    MainPrismaService,
    {
      provide: TenantPrismaService,
      scope: Scope.REQUEST,
      durable: true,
      inject: [REQUEST],
      useFactory: (ctxPayload: ContextPayload) => {
        // tenantId not required for the main database
        if (!ctxPayload) {
          return;
        }
        const { tenantId, datasourceUrl } = ctxPayload;
        return new TenantPrismaService(datasourceUrl).extend(tenantId);
      },
    },
  ],
  exports: [MainPrismaService, TenantPrismaService],
})
export class PrismaModule {}
