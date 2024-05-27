import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/tenant-client';

@Injectable()
export class TenantPrismaService extends PrismaClient {
  constructor(datasourceUrl: string) {
    super({ datasourceUrl });
  }

  extend(tenantId: string) {
    return this.$extends({
      query: {
        $allOperations({ query }) {
          return query({ where: { tenantId } });
        },
      },
    });
  }
}
