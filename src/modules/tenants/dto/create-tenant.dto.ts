import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tenantId: string;

  @IsNumber()
  @ApiProperty({ required: false })
  dataSourceId?: number;
}
