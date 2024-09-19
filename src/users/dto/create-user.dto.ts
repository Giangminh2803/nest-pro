import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"
import mongoose from "mongoose";



export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    name: string

    @IsNotEmpty()
    @IsInt()
    age: number

    @IsString()
    gender: string

    @IsString()
    address: string

    @IsString()
    role: string

    
}

export class RegisterUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    name: string

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    age: number

    @IsString()
    gender: string

    @IsString()
    address: string

    @IsString()
    idCard: string


}
