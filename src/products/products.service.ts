import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private apiService: ApiService) {}

  async create(createProductDto: CreateProductDto) {
    return this.apiService.createProduct(createProductDto);
  }

  async findAll(limit?: number, sort?: string) {
    return this.apiService.findAllProducts(limit, sort);
  }

  async findOne(id: number) {
    return this.apiService.findOneProduct(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.apiService.updatePRoduct(id, updateProductDto);
  }

  async remove(id: number) {
    return this.apiService.removeProduct(id);
  }

  async getCategories() {
    return this.apiService.getCategories();
  }

  async getProductsByCategory(categoryName: string) {
    return this.apiService.getProductsByCategory(categoryName);
  }
}
