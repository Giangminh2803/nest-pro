import { BadRequestException, Injectable } from '@nestjs/common';
;
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Contract, ContractDocument } from 'src/contracts/schemas/contract.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import dayjs from 'dayjs';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { RequestsContract, RequestsContractDocument } from './schemas/requests-contract.schema';
import { CreateRequestsContractDto } from './dto/create-requests-contract.dto';
import { UpdateRequestsContractDto } from './dto/update-requests-contract.dto';


@Injectable()
export class RequestsContractsService {
  constructor(
    @InjectModel(Contract.name)
    private contractModel: SoftDeleteModel<ContractDocument>,

    @InjectModel(RequestsContract.name)
    private requestsContractModel: SoftDeleteModel<RequestsContractDocument>,
    
  ) {}

  async create(createRequestsContractDto: CreateRequestsContractDto, user: IUser) {
    try {
      const contract = await this.contractModel.findOne({
        _id: createRequestsContractDto.contract
      })
      if(contract){
        const expireDay = dayjs(contract.endDate);
        if(expireDay.isBefore(dayjs().add(15, "day")) && expireDay.startOf('day').isAfter(dayjs().startOf("day"))){
          const requestRenew = await this.requestsContractModel.create({...createRequestsContractDto, status: "PENDING"});
          return {
            _id: requestRenew._id,
            createdAt: requestRenew.createdAt
          }
        }else{
          throw new BadRequestException("Contract not yet renewed!");
        }

      }
    } catch (error) {
      return error
    }
    
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.requestsContractModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;

    const result = await this.requestsContractModel
      .find(filter)
      .skip(skip)
      .limit(defaultPageSize)
      .sort(sort as any)
      .select(projection)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage: defaultCurrentPage,
        pageSize: defaultPageSize,
        totalPage: totalPage,
        totalDocument: totalDocument,
      },
      result,
    };
  }

  async findOneByIdContract(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!');
    }
    try {
      return await this.requestsContractModel.find({ _id: id });
    } catch (error) {
      throw new BadRequestException("Something wrong in server!");
    }
  }

  async update(id: string, updateRequestsContractDto: UpdateRequestsContractDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!');
    }
    try {
      const contract = await this.requestsContractModel.updateOne({_id: id}, {...updateRequestsContractDto, updatedBy:{
        _id: user._id,
        email: user.email,
        name: user.name
      }})
      return contract;
    } catch (error) {
      throw new BadRequestException("Something wrong in server!")
    }
   
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!');
    }
    try {
      await this.requestsContractModel.updateOne({_id: id}, {updatedBy:{
        _id: user._id,
        email: user.email,
        name: user.name
      }})
      return await this.requestsContractModel.softDelete({_id: id});
    } catch (error) {
      throw new BadRequestException("Something wrong in server!")
    }
  }
}
