import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto'; // Import DTO

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.mat_khau, 10);
    return this.usersService.create({
      email: registerDto.email,
      mat_khau: hashedPassword,
      ho_ten: registerDto.ho_ten,
      tuoi: registerDto.tuoi,
      anh_dai_dien: registerDto.anh_dai_dien,
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.mat_khau))) {
      const { mat_khau, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.nguoi_dung_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
