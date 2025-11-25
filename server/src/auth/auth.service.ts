import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private excludePassword(user: User): UserWithoutPassword {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return {
      user: this.excludePassword(user),
      access_token: this.generateToken(user.id, user.email),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      user: this.excludePassword(user),
      access_token: this.generateToken(user.id, user.email),
    };
  }

  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.excludePassword(user);
  }

  private generateToken(userId: number, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
