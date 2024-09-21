import { Type } from "class-transformer";
import { isDate, IsDateString, IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsString, ValidateNested } from "class-validator"



export class CreateEquipmentDto {

    @IsString()
    equipmentName: string;

    @IsString()
    status: string;

    @IsNumberString()
    price: number;
}
