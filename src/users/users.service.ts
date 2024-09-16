import { BadRequestException, Injectable, SetMetadata } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './user.interface';
import aqp from 'api-query-params';

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

   isExistEmail = async (email: string) => {
     const isExistEmail = await this.userModel.findOne({email: email});
     return isExistEmail
    
  }

  async create(createUserDto: CreateUserDto) {
    const isExistEmail =await this.isExistEmail(createUserDto.email);
    if(isExistEmail){
      
      throw new BadRequestException( `Email: ${createUserDto.email} has existed` , { cause: new Error(), description:'Register Fail' })

       ;
    }
    const hashPassword = this.hashPassword(createUserDto.password);
    createUserDto.password = hashPassword;
    let newUser = await this.userModel.create({ ...createUserDto })
    return {
      _id: newUser._id,
      createdAt: newUser.createdAt
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const isExistEmail =await this.isExistEmail(registerUserDto.email);
    if(isExistEmail){
      
      throw new BadRequestException( `Email: ${registerUserDto.email} has existed` , { cause: new Error(), description:'Register Fail' })

       ;
    }
    const hashPassword = this.hashPassword(registerUserDto.password);
    registerUserDto.password = hashPassword;
    let newUser = await this.userModel.create({ ...registerUserDto})
    return {
      _id: newUser._id,
      createdAt: newUser.createdAt
    };
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.userModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;


    const result = await this.userModel.find(filter)
      .skip(skip)
      .limit(defaultPageSize)
      .sort(sort as any)
      .select(projection)
      .populate(population)
      .exec()

    return {
      meta: {
        currentPage: defaultCurrentPage,
        pageSize: defaultPageSize,
        totalPage: totalPage,
        totalDocument: totalDocument
      },
      result
    }

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

  async remove(id: string, user: IUser) {
    await this.userModel.updateOne({_id:id}, {
      deletedBy: {
        _id: user._id,
        email: user.email
      } 
    })
    return await this.userModel.softDelete({ _id: id });
  }
}
