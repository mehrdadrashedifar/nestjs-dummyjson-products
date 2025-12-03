import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule , AuthModule ,
    MongooseModule.forRoot('mongodb://localhost:27017/products-db')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
