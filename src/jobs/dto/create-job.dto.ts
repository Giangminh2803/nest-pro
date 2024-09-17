import { Type } from "class-transformer";
import { IsArray, isArray, IsBoolean, IsDate, IsDateString, IsDefined, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, isString, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsString()
    _id: mongoose.Schema.Types.ObjectId;
    @IsString()
    name: string;
}

export class CreateJobDto {

    @IsString()
    name: string;

    @IsArray()
    skills: [string];

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company!: Company;

    @IsString()
    location: string;

    @IsNumber()
    salary: number;

    @IsNumber()
    quantity: number;

    @IsString()
    level: string;

    @IsString()
    description: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsBoolean()
    isActive: boolean;

}
