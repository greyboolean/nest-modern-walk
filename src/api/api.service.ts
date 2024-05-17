import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  // products

  async createProduct(createProductDto: CreateProductDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://fakestoreapi.com/products',
        createProductDto,
      ),
    );
    return data;
  }

  async findAllProducts(limit?: number, sort?: string) {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/products', {
        params: {
          ...(limit && { limit: limit.toString() }),
          ...(sort && { sort }),
        },
      }),
    );
    return data;
  }

  async findOneProduct(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/products/${id}`),
    );
    return data;
  }

  async updatePRoduct(id: number, updateProductDto: UpdateProductDto) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `https://fakestoreapi.com/products/${id}`,
        updateProductDto,
      ),
    );
    return data;
  }

  async removeProduct(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete(`https://fakestoreapi.com/products/${id}`),
    );
    return data;
  }

  async getCategories() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/products/categories'),
    );
    return data;
  }

  async getProductsByCategory(categoryName: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://fakestoreapi.com/products/category/${categoryName}`,
      ),
    );
    return data;
  }

  // cart
}
