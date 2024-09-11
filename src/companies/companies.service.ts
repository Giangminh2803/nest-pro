import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { }

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const isExist = await this.companyModel.findOne({ name: createCompanyDto.name });
    if (!isExist) {
      return await this.companyModel.create({
        ...createCompanyDto, createdBy: {
          _id: user._id,
          email: user.email
        }
      })
    }
    return `Company ${createCompanyDto.name} has existed`;
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.companyModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / pageSize);
    let skip = (currentPage - 1) * pageSize;


    const result = await this.companyModel.find(filter)
      .skip(skip)
      .limit(defaultPageSize)
      .sort(sort as any)
      .select(projection)
      .populate(population)
      .exec()

    return {
      meta: {
        currentPage: currentPage,
        pageSize: pageSize,
        totalPage: totalPage,
        totalDocument: totalDocument
      },
      result
    }

  }

  async findOne(id: string) {

    return await this.companyModel.findOne({ _id: id });
  }

  async update(updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const isExist = await this.companyModel.findOne({ name: updateCompanyDto.name });
    if (!isExist) {
      return await this.companyModel.updateOne({
        ...updateCompanyDto, updatedBy: {
          _id: user._id,
          email: user.email
        }

      })
    }
    return `Company ${updateCompanyDto.name} has existed`;
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.companyModel.softDelete({ _id: id });
  }
}
