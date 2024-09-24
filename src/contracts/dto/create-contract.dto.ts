
import { IsDateString, IsNumberString, IsString, } from "class-validator"
import mongoose from "mongoose";


export class CreateContractDto {

    @IsString()
    roomId: mongoose.Schema.Types.ObjectId;

    @IsString()
    tenantId: mongoose.Schema.Types.ObjectId;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNumberString()
    deposit: number

    @IsNumberString()
    monthlyRent: number

    @IsString()
    status: string;

}
