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


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // REGISTER (Protected by custom header)
  @Post('register')
  async register(
    @Headers('register-auth-token') authRegisterToken: string,
    @Body() dto: RegisterDto,
  ) {
    try {
      if(authRegisterToken !== process.env.REGISTRATION_SECRET) {
        throw new UnauthorizedException('Invalid register auth token');
      }
      return this.authService.register(dto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  // LOGIN (Public)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token } = await this.authService.login(dto);
      res.cookie('jwt', token, { httpOnly: true});
      return { message: 'Logged in', token };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
