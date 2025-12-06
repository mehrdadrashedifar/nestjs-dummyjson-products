import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

class DimensionsDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  width?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  depth?: number;
}

class ReviewDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reviewerName?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  reviewerEmail?: string;
}

class MetaDto {
  @ApiPropertyOptional()
  @IsOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  qrCode?: string;
}

export class CreateProductDto {
  // REQUIRED FIELDS
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  categoryId: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsNumber()
  price: number;

  // OPTIONAL FIELDS
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ type: DimensionsDto })
  @ValidateNested()
  @Type(() => DimensionsDto)
  @IsOptional()
  dimensions?: DimensionsDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  warrantyInformation?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shippingInformation?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  availabilityStatus?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  returnPolicy?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  minimumOrderQuantity?: number;

  @ApiPropertyOptional({ type: [ReviewDto] })
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  @IsOptional()
  reviews?: ReviewDto[];

  @ApiPropertyOptional({ type: MetaDto })
  @ValidateNested()
  @Type(() => MetaDto)
  @IsOptional()
  meta?: MetaDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  images?: string[];
}
