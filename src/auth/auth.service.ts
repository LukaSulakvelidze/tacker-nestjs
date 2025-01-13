import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getCurrentUser(userId) {
    return this.userService.findOne(userId).populate('invoices');
  }

  async SignUp(CreateUserDto: CreateUserDto) {
    const { email, password } = CreateUserDto;
    const user = await this.userService.findByEmail({ email });
    if (user) throw new BadRequestException('User Already Exist');
    const hashedPass = await bcrypt.hash(password, 10);
    return await this.userService.create({
      email,
      password: hashedPass,
    });
  }

  async SignIn(SignInDto: SignInDto) {
    const { email, password, rememberMe } = SignInDto;
    const user = await this.userService.findByEmailWPass({ email });
    if (!user) throw new BadRequestException('Invalid Credentials');
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new BadRequestException('Invalid Credentials');
    const payload = {
      sub: user._id,
    };
    const expire = rememberMe ? '7d' : '1d';
    return {
      accesstoken: await this.jwtService.signAsync(payload, {
        expiresIn: expire,
      }),
    };
  }
}
