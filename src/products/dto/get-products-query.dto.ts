import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductsQueryDto {
  @ApiPropertyOptional({ description: 'number of items to return' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit?: number;

  @ApiPropertyOptional({ description: 'items to skip' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number;

  @ApiPropertyOptional({ description: 'comma separated fields to select' })
  @IsOptional()
  @IsString()
  select?: string; // e.g. "id,title,price"

  @ApiPropertyOptional({ description: 'field to sort by (if supported)' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ description: 'order: asc or desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc'|'desc';

  @ApiPropertyOptional({ description: 'search query (q)' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: 'category filter if needed' })
  @IsOptional()
  @IsString()
  category?: string;
}
