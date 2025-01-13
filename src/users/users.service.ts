import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(query) {
    return this.userModel.findOne(query);
  }

  findByEmailWPass(query) {
    return this.userModel.findOne(query).select('+password');
  }
}
