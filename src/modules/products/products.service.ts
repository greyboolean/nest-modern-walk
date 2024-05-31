import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private apiService: ApiService) {}

  create(createProductDto: CreateProductDto) {
    return this.apiService.createProduct(createProductDto);
  }

  findAll(limit?: string, sort?: string) {
    return this.apiService.findProducts(limit, sort);
  }

  findOne(id: number) {
    return this.apiService.findProduct(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.apiService.updateProduct(id, updateProductDto);
  }

  remove(id: number) {
    return this.apiService.removeProduct(id);
  }

  findCategories() {
    return this.apiService.findCategories();
  }

  findProductsByCategory(category: string) {
    return this.apiService.findProductsByCategory(category);
  }
}
