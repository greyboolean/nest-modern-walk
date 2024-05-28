import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}
