import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsString, ValidateNested } from "class-validator"

export class CreateRoomDto {
    @IsString()
    roomNumber: string;

    @IsString()
    location: string;

    @IsString()
    status: string;

    @IsNumber()
    price: number;

    
}
