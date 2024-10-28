import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"

export class CreateRoomDto {
    @IsString()
    roomName: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsString()
    status: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsArray()
    @IsString({ each: true })
    services: string[];


    
}
