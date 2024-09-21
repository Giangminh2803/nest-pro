import { Type } from "class-transformer";
import { isDate, isDateString, IsDateString, IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsString, ValidateNested } from "class-validator"
import mongoose from "mongoose";

export class CreateBillDto {
    @IsString()
    userId: mongoose.Schema.Types.ObjectId;

    @IsString()
    roomId: mongoose.Schema.Types.ObjectId;

    @IsNumberString()
    firstIndex: number;

    @IsNumberString()
    finalIndex: number;

    @IsString()
    description: string;

    @IsString()
    status: string;

   

    
}
