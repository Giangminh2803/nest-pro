import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsString, ValidateNested } from "class-validator"


export class CreateServiceDto {
    @IsString()
    serviceName: string;

    @IsString()
    description: string;

    @IsNumberString()
    price: number;

    @IsString()
    unit: string;

    @IsString()
    type: string;

}
