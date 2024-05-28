import { ApiProperty } from '@nestjs/swagger';

export class CreateDataSourceDto {
  @ApiProperty()
  url: string;
}
