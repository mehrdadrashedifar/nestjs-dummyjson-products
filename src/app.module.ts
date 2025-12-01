import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule ,
    MongooseModule.forRoot('mongodb://localhost:27017/products-db')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
