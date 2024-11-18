import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegisterServiceDto } from './dto/create-register-service.dto';
import { UpdateRegisterServiceDto } from './dto/update-register-service.dto';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RegisterService, RegisterServiceDocument } from './schemas/register-service.schema';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { Contract, ContractDocument } from 'src/contracts/schemas/contract.schema';
import dayjs from 'dayjs';
import { Cron } from '@nestjs/schedule';
import aqp from 'api-query-params';

@Injectable()
export class RegisterServiceService {
  constructor(
    @InjectModel(RegisterService.name) private registerServiceModel: SoftDeleteModel<RegisterServiceDocument>,
    @InjectModel(Room.name) private roomModel: SoftDeleteModel<RoomDocument>,
    @InjectModel(Contract.name) private contractModel: SoftDeleteModel<ContractDocument>,
  ) { }



  async create(createRegisterServiceDto: CreateRegisterServiceDto, user: IUser) {
    if (
      !mongoose.isObjectIdOrHexString(createRegisterServiceDto.room) ||
      !mongoose.isObjectIdOrHexString(createRegisterServiceDto.user) ||
      !mongoose.isObjectIdOrHexString(createRegisterServiceDto.service)
    ) {
      throw new BadRequestException('Id is not valid!');
    }
    const isExist = await this.registerServiceModel.findOne({
      room: createRegisterServiceDto.room,
      user:  user._id,
      service: createRegisterServiceDto.service,
      type: createRegisterServiceDto.type,
    })

    const isExistInRoom = await this.roomModel.findOne(
      {
        _id: createRegisterServiceDto.room,
        services: { $in: createRegisterServiceDto.service },
      }
    )

    if (isExist) {
      throw new BadRequestException("The service already exists or is pending approval!");
    }
    if (isExistInRoom && createRegisterServiceDto.type === false) {
      const cancelService = await this.registerServiceModel.create({
        ...createRegisterServiceDto,
        user: user._id,
        status: "PENDING",
        createdBy: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
      return {
        _id: cancelService._id,
        createdAt: cancelService.createdAt
      };
    }
    if (!isExistInRoom && createRegisterServiceDto.type) {
      const registerService = await this.registerServiceModel.create({
        ...createRegisterServiceDto,
        user : user._id,
        status: "PENDING",
        createdBy: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
      return {
        _id: registerService._id,
        createdAt: registerService.createdAt
      };
    }
    throw new BadRequestException('Something wrong!');
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.registerServiceModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;


    const result = await this.registerServiceModel.find(filter)
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
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    return (await this.registerServiceModel.findOne({ _id: id })).populate(
      [
        {
          path: "service",
          select: { serviceName: 1, price: 1, unit: 1 }
        },
        {
          path: "user",
          select: { email: 1, name: 1 }
        },
        {
          path: "room",
          select: { roomName: 1 }
        }
      ]

    );
  }

  async update(id: string, updateRegisterServiceDto: UpdateRegisterServiceDto, user: IUser) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    const isExist = await this.registerServiceModel.findById({ _id: id });
    if (isExist) {
      if (isExist.status === "PENDING") {
        if (updateRegisterServiceDto.status === "APPROVED") {
          if(!isExist.type && isExist.executeNow){
            throw new BadRequestException("Service cannot be canceled without invoice!");
          }
          if(isExist.executeNow){
            const now = await this.roomModel.updateOne({ _id: isExist.room }, { status: "SUCCESS" , $push: { services: isExist.service.toString() } });
          }else{
            const {startDate} = await this.contractModel.findOne({"room._id": isExist.room.toString()});
            const date = Number(dayjs(startDate).format('DD'));
            const targetDay = dayjs().date(date);
            let day;
            const today = dayjs();
            if(today.isSame(targetDay, 'date')){
              day = targetDay.format('DD-MM-YYYY');
            }else if(today.isAfter(targetDay)){
              day = targetDay.add(1, "month").format('DD-MM-YYYY');
            }else{
              day = targetDay.format('DD-MM-YYYY');
            }
            const after = await this.registerServiceModel.updateOne({_id: isExist._id},{implementationDate: day});
          }
          return await this.registerServiceModel.updateOne(
            { _id: id },
            {
              ...updateRegisterServiceDto,
              updatedBy: {
                _id: user._id,
                email: user.email,
                name: user.name
              }
            })
        } 
      
      }
    }
    throw new BadRequestException('Something wrong!');
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    const isExist = await this.registerServiceModel.findOne({_id: id, status: "PENDING"});
    if(!isExist){
      throw new BadRequestException('Something wrong!');
    }
    await this.registerServiceModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })
    return await this.registerServiceModel.softDelete({ _id: id });
  }

  @Cron("*/5 * * * *")
  async autoUpdateServiceForRoom(){
    const today = dayjs().format('DD-MM-YYYY');
    const requestsUser = await this.registerServiceModel.find({status: "APPROVED"});
    if(requestsUser && requestsUser.length > 0){
      for(const requestUser of requestsUser){
        if(requestUser.type && requestUser?.implementationDate === today){
          await this.roomModel.updateOne({ _id: requestUser.room }, { $push: { services: requestUser.service.toString() } });
        }else if(!requestUser.type && requestUser.implementationDate === today){
          await this.roomModel.updateOne({ _id: requestUser.room }, { $pull: { services: requestUser.service.toString() } });
        }
        await this.registerServiceModel.updateOne({_id: requestUser._id}, {status: "SUCCESS"});
      }
    }
  }
}
