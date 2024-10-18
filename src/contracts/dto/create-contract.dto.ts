
import { IsDate, IsDateString, IsNumber, IsNumberString, IsOptional, IsString, } from "class-validator"
import mongoose from "mongoose";


export class CreateContractDto {

    @IsString()
    roomId: mongoose.Schema.Types.ObjectId;

    @IsString()
    tenantId: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    endDate: Date;

    @IsNumber()
    depositAmount: number

    @IsNumber()
    monthlyRent: number

    @IsString()
    status: string;

}
