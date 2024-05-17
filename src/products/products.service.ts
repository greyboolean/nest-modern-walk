import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  async create(createProductDto: CreateProductDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://fakestoreapi.com/products',
        createProductDto,
      ),
    );
    return data;
  }

  async findAll(limit?: number, sort?: string) {
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

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/products/${id}`),
    );
    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `https://fakestoreapi.com/products/${id}`,
        updateProductDto,
      ),
    );
    return data;
  }

  async remove(id: number) {
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
}
