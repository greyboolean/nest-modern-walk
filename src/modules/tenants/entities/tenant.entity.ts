import { ApiProperty } from '@nestjs/swagger';
import { DataSource } from '../../data-sources/entities/data-source.entity';

export class Tenant {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  datasourceId?: number;

  @ApiProperty({ required: false })
  datasource?: DataSource;
}
