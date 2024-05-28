import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/tenant-client';
// import { PrismaClient, Prisma } from '@prisma/tenant-client';

// interface IData {
//   data: any;
// }

@Injectable()
export class TenantPrismaService extends PrismaClient {
  constructor(datasourceUrl: string) {
    super({ datasourceUrl });
  }

  extend(tenantId: string) {
    return this.$extends({
      query: {
        $allModels: {
          async create({ args, query }) {
            return query({ data: { ...args.data, tenantId } });
          },
          // TODO implement type-safe create method
          // async create<T, A extends IData>(
          //   this: T,
          //   args: Prisma.Exact<
          //     A,
          //     Prisma.Args<T, 'create'> & { data: Omit<A['data'], 'tenantId'> }
          //   >,
          // ): Promise<Prisma.Result<T, A, 'create'>> {
          //   const context = Prisma.getExtensionContext(this);
          //   console.log(context);
          //   return (context as any).create({
          //     data: { ...args.data, tenantId },
          //   });
          // },
          async findMany({ args, query }) {
            return query({ ...args, where: { tenantId } });
          },
          async findUnique({ args, query }) {
            return query({ where: { ...args.where, tenantId } });
          },
          async update({ args, query }) {
            return query({
              where: { ...args.where, tenantId },
              data: args.data,
            });
          },
          async delete({ args, query }) {
            return query({ where: { ...args.where, tenantId } });
          },
        },
      },
    });
  }
}
