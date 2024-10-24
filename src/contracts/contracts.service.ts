import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contract, ContractDocument } from './schemas/contract.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { RoleDocument } from 'src/role/schemas/role.schema';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract.name) private contractModel: SoftDeleteModel<ContractDocument>,
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Room.name) private roomModel: SoftDeleteModel<RoomDocument>) { }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const isExist = await this.roomModel.findOne({
      _id: createContractDto.room._id,
      status: "OCCUPIED"
      }
    );
    if (isExist) {
      throw new BadRequestException('Data is not valid!');
    }
    
    const contract = await this.contractModel.create({
      ...createContractDto,
      innkeeper:{
        _id: user._id,
        name: user.name,
        phone: user.phone,
        idCard: user.idCard
      },
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })

    await this.roomModel.updateOne({_id: createContractDto.room._id}, {status: "OCCUPIED"});

    return {
      _id: contract._id,
      createdAt: contract.createdAt
    };
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.contractModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;


    const result = await this.contractModel.find(filter)
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

  async findByTenantId(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    return await this.contractModel.find({ "tenant._id": id })

  }

  async update(id: string, updateContractDto: UpdateContractDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }

    const isExist = await this.contractModel.findOne({ _id: id, isDeleted: false });
    if (isExist) {
      return await this.contractModel.updateOne({ _id: id }, {
        ...updateContractDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
          name: user.name

        },

      });
    }
    throw new BadRequestException('Something wrong!!!');
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    await this.contractModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })
    return await this.contractModel.softDelete({ _id: id });
  }

  @Cron('0 6 * * * *')
  async autoUpdateStatus(user: IUser) {
    const today = new Date();
    await this.contractModel.updateMany({endDate: {$lt: today}}, {status: "EXPIRED"})
   console.log('call me');
}
}
