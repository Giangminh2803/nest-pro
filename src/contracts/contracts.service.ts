import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contract, ContractDocument } from './schemas/contract.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';


@Injectable()
export class ContractsService {
  constructor(@InjectModel(Contract.name) private contractModel: SoftDeleteModel<ContractDocument>) { }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const isExist = await this.contractModel.findOne({ roomId: createContractDto.roomId, isDeleted: false });
    if (isExist) {
      //throw new BadRequestException('Data is not valid!');
      return isExist;
    }
    const contract = await this.contractModel.create({
      ...createContractDto,
      innkeeperId: user._id,
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })

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

  async findByTenantId(id: string){
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    return await this.contractModel.find({tenantId: id})

  }
  
  async update(id: string, updateContractDto: UpdateContractDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }

    const isExist = await this.contractModel.findOne({_id: id, isDeleted: false});
    if(isExist){
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
    await this.contractModel.updateOne({_id: id}, {
      deletedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })
    return await this.contractModel.softDelete({_id: id});
  }
}
