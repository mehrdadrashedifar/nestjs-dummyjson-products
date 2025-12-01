import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsService {
  private readonly baseUrl = 'https://dummyjson.com/products';

  constructor(private readonly httpService: HttpService) {}

  //sending request to external API and handling errors and make observable to promise and return just "response.data"
  private async request(url: string, params?: Record<string, any>) {
    try {
      const response = await firstValueFrom(this.httpService.get(url, { params }));
      return response.data;
    } catch (err: any) {
      const status = err?.response?.status || HttpStatus.BAD_GATEWAY;
      const message = err?.response?.data || err?.message || 'Error while calling external API';
      throw new HttpException(
        { message: 'DummyJSON request failed', details: message },
        status,
      );
    }
  }

  async findAll(query: GetProductsQueryDto) {
    const params: Record<string, any> = {};

    if (query.limit !== undefined) params.limit = query.limit;
    if (query.skip !== undefined) params.skip = query.skip;
    if (query.select) params.select = query.select;
    if (query.q) params.q = query.q;
    if (query.category) params.category = query.category;

    
    if (query.sortBy) params.sortBy = query.sortBy;
    if (query.order) params.order = query.order;

    const data = await this.request(this.baseUrl, params);
    
    return data;
  }

  async findOne(id: string | number) {
    const url = `${this.baseUrl}/${id}`;
    const data = await this.request(url);
    return data;
  }
}
