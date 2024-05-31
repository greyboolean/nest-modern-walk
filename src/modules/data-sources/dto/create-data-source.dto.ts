import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDataSourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}
