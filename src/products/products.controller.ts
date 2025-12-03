import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // =========================================
  // 1) Get all products (with limit/skip/sort)
  // =========================================
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  findAll(
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.productsService.findAll({ limit, skip, sortBy, order });
  }

  // =========================================
  // 3) Search products
  // =========================================
  @Get('search')
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'q', required: true })
  search(@Query('q') q: string) {
    return this.productsService.search(q);
  }

  // =========================================
  // 4) Get all categories (object list)
  // =========================================
  @Get('categories')
  @ApiOperation({
    summary: 'Get all product categories',
    description: 'Returns a list of categories with slug, name, and url.',
  })
  getAllCategories() {
    return this.productsService.getAllCategories();
  }

  // =========================================
  // 5) Get category list (string list)
  // =========================================
  @Get('category-list')
  @ApiOperation({
    summary: 'Get category list',
    description: 'Returns a list of category names (string array).',
  })
  getCategoryList() {
    return this.productsService.getCategoryList();
  }

  // =========================================
  // 6) Get products by category
  // =========================================
  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category name' })
  @ApiParam({ name: 'category', type: String })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getByCategory(
    @Param('category') category: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.productsService.getByCategory(category, limit, skip);
  }

  // =========================================
  // 7) Add new product
  // =========================================
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new product' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // =========================================
  // 8) Update product
  // =========================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  // =========================================
  // 9) Delete product
  // =========================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }

  // =========================================
  // 2) Get single product
  // =========================================
  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }
}

