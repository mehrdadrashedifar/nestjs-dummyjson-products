import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get products (forwards query params to DummyJSON)' })
  @ApiResponse({ status: 200, description: 'Products list returned.' })
  async findAll(@Query() query: GetProductsQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Product returned.' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
