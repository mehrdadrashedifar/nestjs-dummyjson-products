import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find();
  }

  async findBySlug(slug: string) {
    try {
      const category = await this.categoryModel.findOne({ slug });
      return category;
    } catch (error) {
      throw new NotFoundException("Category not found");
    }
    
    
  }

  async create(dto : CreateCategoryDto) {
    const createdCategory = new this.categoryModel(dto);
    return createdCategory.save();
  }
  
}
