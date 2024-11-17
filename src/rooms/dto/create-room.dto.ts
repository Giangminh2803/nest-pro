
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import mongoose from "mongoose";

export class CreateRoomDto {
    @IsString()
    roomName: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsString()
    status: string;

    @IsNumber()
    area: number;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsArray()
    @IsString({ each: true })
    services: string[];

    @IsString()
    @IsOptional()
    description: string;

    
}
