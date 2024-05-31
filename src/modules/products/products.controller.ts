import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller('products')
@Public()
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: Product, isArray: true })
  findAll(@Query('limit') limit?: string, @Query('sort') sort?: string) {
    return this.productsService.findAll(limit, sort);
  }

  @Get('categories')
  @ApiOkResponse({ type: String, isArray: true })
  findCategories() {
    return this.productsService.findCategories();
  }

  @Get(':id')
  @ApiOkResponse({ type: Product })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Product })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Product })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Get('category/:category')
  @ApiOkResponse({ type: Product, isArray: true })
  findProductsByCategory(@Param('category') category: string) {
    return this.productsService.findProductsByCategory(category);
  }
}
