import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"

export class CreateRoomDto {
    @IsString()
    roomName: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsString()
    status: string;

    @IsNumber()
    price: number;

    
}
