import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductsService);

  console.log('⏳ Fetching products from DummyJSON...');

  const { data } = await axios.get('https://dummyjson.com/products?limit=0');

  const products = data.products;
  console.log(`📦 Total products received: ${products.length}`);

  for (const p of products) {
    const dto = {
      title: p.title,
      description: p.description,
      category: p.category,
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
