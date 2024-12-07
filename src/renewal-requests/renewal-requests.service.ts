import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRenewalRequestDto } from './dto/create-renewal-request.dto';
import { UpdateRenewalRequestDto } from './dto/update-renewal-request.dto';
import { IUser } from 'src/users/user.interface';
import { RenewalRequest, RenewalRequestDocument } from './schemas/renewal-request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Contract, ContractDocument } from 'src/contracts/schemas/contract.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import dayjs from 'dayjs';
import aqp from 'api-query-params';
import mongoose from 'mongoose';


@Injectable()
export class RenewalRequestsService {
  constructor(
    @InjectModel(Contract.name)
    private contractModel: SoftDeleteModel<ContractDocument>,

    @InjectModel(RenewalRequest.name)
    private renewalRequestModel: SoftDeleteModel<RenewalRequestDocument>,
    
  ) {}

  async create(createRenewalRequestDto: CreateRenewalRequestDto, user: IUser) {
    try {
      const contract = await this.contractModel.findOne({
        _id: createRenewalRequestDto.contract
      })
      if(contract){
        const expireDay = dayjs(contract.endDate);
        if(expireDay.isBefore(dayjs().add(1, "month")) && expireDay.startOf('day').isAfter(dayjs().startOf("day"))){
          const requestRenew = await this.renewalRequestModel.create({...createRenewalRequestDto, status: "PENDING"});
          return {
            _id: requestRenew._id,
            createdAt: requestRenew.createdAt
          }
        }else{
          return "Contract not yet renewed!"
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
    const totalDocument = (await this.renewalRequestModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;

    const result = await this.renewalRequestModel
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
      return await this.renewalRequestModel.find({ _id: id });
    } catch (error) {
      throw new BadRequestException("Something wrong in server!");
    }
  }

  async update(id: string, updateRenewalRequestDto: UpdateRenewalRequestDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!');
    }
    try {
      const contract = await this.renewalRequestModel.updateOne({_id: id}, {...updateRenewalRequestDto, updatedBy:{
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
      await this.renewalRequestModel.updateOne({_id: id}, {updatedBy:{
        _id: user._id,
        email: user.email,
        name: user.name
      }})
      return await this.renewalRequestModel.softDelete({_id: id});
    } catch (error) {
      throw new BadRequestException("Something wrong in server!")
    }
  }
}
