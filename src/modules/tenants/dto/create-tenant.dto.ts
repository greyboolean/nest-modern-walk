import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty()
  tenantId: string;

  @ApiProperty({ required: false })
  dataSourceId?: number;
}
