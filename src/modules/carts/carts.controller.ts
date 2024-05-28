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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiCreatedResponse({ type: Cart })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  @ApiOkResponse({ type: Cart, isArray: true })
  findAll(
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('startdate') startDate?: string,
    @Query('enddate') endDate?: string,
  ) {
    return this.cartsService.findAll(limit, sort, startDate, endDate);
  }

  @Get(':id')
  @ApiOkResponse({ type: Cart })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Cart })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Cart })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.remove(id);
  }

  @Get('user/:id')
  @ApiOkResponse({ type: Cart, isArray: true })
  findCartsByUser(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.findCartsByUser(id);
  }
}
