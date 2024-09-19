import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, isDateString, IsDefined, IsEmail, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsString()
    _id: mongoose.Schema.Types.ObjectId;
    @IsString()
    name: string;
}

class Job {
    @IsString()
    _id: mongoose.Schema.Types.ObjectId;
    @IsString()
    name: string;
}

class updatedBy{
    @IsString()
    _id: mongoose.Schema.Types.ObjectId

    @IsString()
    email: string
}
class History{
    @IsString()
    status: string

    @IsDateString()
    updatedAt: Date

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => updatedBy)
    updatedBy!: updatedBy;
}

export class CreateResumeDto {

    @IsString()
    url: string

    @IsString()
    companyId: mongoose.Schema.Types.ObjectId

    @IsString()
    jobId: mongoose.Schema.Types.ObjectId
}
