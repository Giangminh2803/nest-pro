import { Type } from "class-transformer";
import { isDate, IsDateString, IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"



export class CreateEquipmentDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsNumber()
    @IsOptional()
    price: number;
}
