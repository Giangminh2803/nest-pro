import { Type } from "class-transformer";
import { IsDate, isDate, isDateString, IsDateString, IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import mongoose from "mongoose";

export class CreateInvoiceDto {
    @IsString()
    tenantId: mongoose.Schema.Types.ObjectId;

    @IsString()
    roomId: mongoose.Schema.Types.ObjectId;

    @IsString()
    serviceId: mongoose.Schema.Types.ObjectId;

    @IsNumber()
    @IsOptional()
    firstIndex: number;

    @IsNumber()
    @IsOptional()
    finalIndex: number;

    @IsOptional()
    @IsNumber()
    month: number;

    @IsOptional()
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsOptional()
    @IsDateString()
    dueDate: Date;

    
}
