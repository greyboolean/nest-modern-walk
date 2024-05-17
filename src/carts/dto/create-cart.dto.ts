export class CreateCartDto {
  userId: number;

  date: string;

  products: Array<{
    productId: number;
    quantity: number;
  }>;
}
