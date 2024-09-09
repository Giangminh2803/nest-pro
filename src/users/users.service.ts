import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {genSaltSync,hashSync } from 'bcryptjs'
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword = (password: string) => {
    let salt = genSaltSync(10);
    let hashPassword = hashSync(password, salt);
    return hashPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password);
    createUserDto.password = hashPassword;
    let user = await this.userModel.create({...createUserDto})
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return `not found user by id: ${id}`;
    const user = await this.userModel.findOne({_id: id}).select('-password');
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    
    return await this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto}, {$exists: true});
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({_id: id});
  }
}
