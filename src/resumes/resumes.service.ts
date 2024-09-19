import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {
  constructor(@InjectModel(Resume.name) private resumeModel: SoftDeleteModel<ResumeDocument>) { }

  async create(createResumeDto: CreateResumeDto, user: IUser) {
    const resume =  await this.resumeModel.create({...createResumeDto,
      email: user.email, 
      userId: user._id,
      status: "PENDING",
      history: {
        status: "PENDING",
        updatedBy: {
          _id: user._id,
          email: user.email
        },
        updatedAt: new Date
      }
      , createdBy: {
      _id: user._id,
      email: user.email
    }}) ;

    return {
      _id: resume._id,
      createdAt: resume.createdAt
    }
  };

  async findOne(id: string) {
    return this.resumeModel.find({_id: id}) ;
  }

  async findByUser(user: IUser){
    return await this.resumeModel.find({userId: user._id});
  }

  async findAll( currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.resumeModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * defaultPageSize;

    const result = await this.resumeModel.find(filter)
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

  async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
    return await this.resumeModel.updateOne({_id: id}, {
      ...updateResumeDto, 
      $push:{
        history: {
          status: updateResumeDto.status,
          updatedBy: {
            _id: user._id,
            email: user.email
          },
          updatedAt: new Date
        }
      }
    }) ;
  }

  async remove(id: string, user: IUser) {
    await this.resumeModel.updateOne({_id: id}, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.resumeModel.softDelete({_id: id});
  }
}
