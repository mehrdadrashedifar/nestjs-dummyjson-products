import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // REGISTER (Protected by header token)
  async register(dto: RegisterDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new ForbiddenException('User already exists');
    
    const hash = await bcrypt.hash(dto.password, 10);
    const user = {
      ...dto,
      password: hash,
    };
    await this.usersService.createUser(user);
    return { message: 'User created successfully' };
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ userId: user._id });

    return { token };
  }

  async validateUser(payload: any) {
    return this.usersService.findById(payload.userId);
  }
}
