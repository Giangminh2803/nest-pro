import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { IUser } from 'src/users/user.interface';
import { Bill, BillDocument } from './schemas/bill.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ServicesService } from 'src/services/services.service';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill.name) private billModel: SoftDeleteModel<BillDocument>,
    private servicesService: ServicesService
  ) { }


  async updateData(_id: string, data: any){

    const {serviceId} = await this.billModel.findOne({_id: _id});
    const { price } = await this.servicesService.findOne(serviceId.toString());

    const totalNumber = data.finalIndex - data.firstIndex;


    await this.billModel.updateOne({ _id: _id },
      {
        totalNumber: totalNumber,
        amount: price * totalNumber
      })

  }

  async create(createBillDto: CreateBillDto, user: IUser) {

    if (createBillDto.finalIndex - createBillDto.firstIndex < 0) {
      throw new BadRequestException('Data is not valid!')
    }
    const bill = await this.billModel.create({
      ...createBillDto,
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }

    })
    await this.updateData(bill.serviceId.toString(), createBillDto);

    return {
      _id: bill._id,
      createAt: bill.createdAt

    };
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.billModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;


    const result = await this.billModel.find(filter)
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
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid');
    }

    return await this.billModel.find({ userId: id });
  }

  async update(id: string, updateBillDto: UpdateBillDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid');
    }

     const update = await this.billModel.updateOne({_id: id}, {...updateBillDto, 
      updatedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    });
    
    await this.updateData(id, updateBillDto);
    return update
  }

  async remove(id: string, user: IUser) {
    await this.billModel.updateOne({_id: id}, {
      updatedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })
    return await this.billModel.softDelete({_id: id});
  }
}
