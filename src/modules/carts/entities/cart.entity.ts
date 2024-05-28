import { ApiProperty } from '@nestjs/swagger';

export class Cart {
  @ApiProperty()
  id: number;

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
