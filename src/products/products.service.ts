import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // =====================================================
  // 1) Get all products + pagination + sorting
  // =====================================================
  async findAll({
    limit = 30,
    skip = 0,
    sortBy = 'id',
    order = 'asc',
  }: {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const sortOrder = order === 'asc' ? 1 : -1;

    const products = await this.productModel
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await this.productModel.countDocuments();

    return {
      products,
      total,
      skip: Number(skip),
      limit: Number(limit),
    };
  }

  // =====================================================
  // 2) Get a single product
  // =====================================================
  async findOne(id: number) {
    const product = await this.productModel.findOne({ id });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  // =====================================================
  // 3) Search products (title + description)
  // =====================================================
  async search(query: string) {
    const products = await this.productModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    return {
      products,
      total: products.length,
    };
  }

  // =====================================================
  // 4) Get ALL categories (slug, name, url) — like dummyjson
  // =====================================================
  async getAllCategories() {
    const raw = await this.productModel.distinct('category');

    return raw.map((cat: string) => ({
      slug: cat,
      name: this.toTitle(cat),
      url: `https://dummyjson.com/products/category/${cat}`,
    }));
  }

  // Convert "mens-shoes" => "Mens Shoes"
  private toTitle(slug: string) {
    return slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // =====================================================
  // 5) Category list (string array only)
  // =====================================================
  async getCategoryList() {
    return this.productModel.distinct('category');
  }

  // =====================================================
  // 6) Get products by category + pagination
  // =====================================================
  async getByCategory(
    category: string,
    limit = 30,
    skip = 0,
  ) {
    const products = await this.productModel
      .find({ category })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await this.productModel.countDocuments({ category });

    return {
      products,
      total,
      skip: Number(skip),
      limit: Number(limit),
    };
  }

  // =====================================================
  // 7) Create product
  // =====================================================
  async create(dto: CreateProductDto) {
    // Generate new id (max + 1)
    const last = await this.productModel
      .find()
      .sort({ id: -1 })
      .limit(1);

    const newId = last.length ? last[0].id + 1 : 1;

    const product = new this.productModel({
      ...dto,
      id: newId,
    });

    return product.save();
  }

  // =====================================================
  // 8) Update product
  // =====================================================
  async update(id: number, dto: UpdateProductDto) {
    const updated = await this.productModel.findOneAndUpdate(
      { id },
      dto,
      { new: true },
    );

    if (!updated) throw new NotFoundException(`Product with id ${id} not found`);
    return updated;
  }

  // =====================================================
  // 9) Delete product
  // =====================================================
  async remove(id: number) {
    const deleted = await this.productModel.findOneAndDelete({ id });

    if (!deleted) throw new NotFoundException(`Product with id ${id} not found`);

    return { message: 'Product deleted successfully', id };
  }
}
