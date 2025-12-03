import {
  Body,
  Controller,
  Headers,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // REGISTER (Protected by custom header)
  @Post('register')
  async register(@Headers('register') register: string) {
    try {
      const parsed = JSON.parse(register);
      const dto = plainToInstance(RegisterDto, parsed);
      await validateOrReject(dto);
      return this.authService.register(dto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  // LOGIN (Public)
  @Post('login')
  async login(
    @Headers('login') login: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const parsed = JSON.parse(login);
      const dto = plainToInstance(LoginDto, parsed);
      await validateOrReject(dto);
      const { token } = await this.authService.login(dto);
      res.cookie('jwt', token, { httpOnly: true});
      return { message: 'Logged in', token };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
