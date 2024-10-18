import { BadRequestException, Injectable, SetMetadata } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { USER_ROLE } from 'src/databases/sample';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { IUser } from './user.interface';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>
  ) { }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  isEmailExist = async (email: string) => {
    const isExist = await this.userModel.findOne({ email });
    if (isExist && isExist.isDeleted) {
      return true;
    } else {
      return false;
    }
  }
  async create(createUserDto: CreateUserDto, user: IUser) {
    if (await this.isEmailExist(createUserDto.email)) {
      throw new BadRequestException(`Email: ${createUserDto.email} is exist`);
    }
    const hashPassword = this.hashPassword(createUserDto.password);
    createUserDto.password = hashPassword;
    let data = await this.userModel.create(
      {
        ...createUserDto, createdBy: {
          _id: user._id,
          email: user.email
        }
      }
    );
    return {
      _id: data?._id,
      createdAt: data?.createdAt
    }


  }

  async register(registerUserDto: RegisterUserDto) {
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });

    let { name, email, birthday, gender, address } = registerUserDto;
    const hashPassword = this.hashPassword(registerUserDto.password);
    let user = await this.userModel.create(
      {
        name, email, password: hashPassword,
        birthday,
        gender,
        address,
        role: userRole?._id
      }
    )
    return user;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let defaultCurrent = currentPage ? currentPage : 1;
    let skip = (defaultCurrent - 1) * limit;
    let defaultLimit = limit ? limit : 10;
    const totalItem = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItem / defaultLimit);
    let result = await this.userModel.find(filter)
      .skip(skip)
      .limit(defaultLimit)
      .sort(sort as any)
      .select(["-password", "-refresh_token"])
      .populate(population)
      .exec();

    return {
      meta: {
        current: defaultCurrent,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItem
      },
      result
    };
  }

  findOne(id: string) {
    return this.userModel.findOne({
      _id: id
    }).select("-password")
      .populate({ path: 'role', select: { name: 1, _id: 1 } })
      ;
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
      .populate({ path: "role", select: { name: 1 } })
      ;
  }

  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne({
      _id: id
    }, {
      ...updateUserDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    const foundUser = await this.userModel.findById(id);
    if (foundUser && foundUser.email === "admin@gmail.com") {
      throw new BadRequestException("Can not delete account Admin");
    }
    await this.userModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.userModel.softDelete({
      _id: id
    });

  }

  updateUserToken = async (refresh_Token: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refresh_token: refresh_Token })
      .populate({
        path: "role",
        select: { name: 1 }
      })
  }

  findUserByToken = async (refresh_Token: string) => {
    return (await this.userModel.findOne({ refresh_token: refresh_Token })).populate({
      path: 'role',
      select: { name: 1 }
    })
  }

  findUserByRole = async () => {

    const userRole = await this.roleModel.findOne({ name: USER_ROLE });

    const users = await this.userModel.find({ role: userRole?._id }).select('-password');

    return users;

  }
}
