import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductsService);
  const categoryService = app.get(CategoriesService);

  console.log('⏳ Fetching products from DummyJSON...');

  const { data } = await axios.get('https://dummyjson.com/products?limit=0');

  const products = data.products;
  console.log(`📦 Total products received: ${products.length}`);

  for (const p of products) {
    // -------------------------
    // 1. Handle Category
    // -------------------------
    let category = await categoryService.findBySlug(p.category);

    if (!category) {
      category = await categoryService.create({
        name: p.category,
        slug: p.category.toLowerCase().replace(/\s+/g, '-'),
      });
      console.log(`📁 Category created: ${p.category}`);
    }

    // -------------------------
    // 2. Prepare Product DTO
    // -------------------------
    const dto = {
      title: p.title,
      description: p.description,
      categoryId: category._id,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      tags: p.tags || [],
      brand: p.brand,
      sku: p.sku,
      weight: p.weight,
      dimensions: p.dimensions,
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      availabilityStatus: p.availabilityStatus,
      reviews: p.reviews || [],
      returnPolicy: p.returnPolicy,
      minimumOrderQuantity: p.minimumOrderQuantity,
      meta: p.meta,
      thumbnail: p.thumbnail,
      images: p.images,
    };

    await productService.create(dto);
  }

  console.log('✅ Migration Completed Successfully!');

  await app.close();
}

bootstrap();
