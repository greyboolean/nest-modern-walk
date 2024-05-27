import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from 'src/modules/tenants/tenants.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantsService: TenantsService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const tenantId = request.headers['x-tenant-id'] as string;

    const tenant = await this.tenantsService.findByTenantId(tenantId);

    if (!tenant) {
      throw new BadRequestException('Invalid tenant ID');
    }
    if (!tenant.dataSource) {
      throw new NotFoundException(
        'This tenant does not have a data source configured',
      );
    }

    request.tenant = {
      tenantId: tenant.tenantId,
      datasourceUrl: tenant.dataSource.url,
    };

    next();
  }
}
