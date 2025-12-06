import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Dimension {
  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  depth: number;
}
export const DimensionSchema = SchemaFactory.createForClass(Dimension);

@Schema()
export class Review {
  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  reviewerName: string;

  @Prop({ required: true })
  reviewerEmail: string;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema()
export class MetaInfo {
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  barcode: string;

  @Prop({ required: true })
  qrCode: string;
}
export const MetaInfoSchema = SchemaFactory.createForClass(MetaInfo);

@Schema()
export class Product {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  discountPercentage: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  brand: string;

  @Prop()
  sku: string;

  @Prop()
  weight: number;

  @Prop({ type: DimensionSchema })
  dimensions: Dimension;

  @Prop()
  warrantyInformation: string;

  @Prop()
  shippingInformation: string;

  @Prop()
  availabilityStatus: string;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];

  @Prop()
  returnPolicy: string;

  @Prop()
  minimumOrderQuantity: number;

  @Prop({ type: MetaInfoSchema })
  meta: MetaInfo;

  @Prop()
  thumbnail: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
