import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './user.interface';
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) { }

  hashPassword = (password: string) => {
    let salt = genSaltSync(10);
    let hashPassword = hashSync(password, salt);
    return hashPassword;
  }

  isValidPassword = (password: string, hash: string) => {
    return compareSync(password, hash);
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password);
    createUserDto.password = hashPassword;
    let newUser = await this.userModel.create({ ...createUserDto })
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found user by id: ${id}`;
    const user = await this.userModel.findOne({ _id: id }).select('-password');
    return user;
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({
      email: username
    });
  }



  async update(updateUserDto: UpdateUserDto) {

    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
      { $exists: true });
  }

  async remove(id: string) {
    return await this.userModel.softDelete({ _id: id });
  }
}
