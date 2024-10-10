import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator"
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
    @IsOptional()
    role: mongoose.Schema.Types.ObjectId

    
}

export class RegisterUserDto {
    
    @IsString()
    @IsNotEmpty({message: 'Email is invalid'})
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string

    @IsString()
    name: string

    
    @IsNotEmpty()
    @IsNumberString()
    age: number

    @IsString()
    gender: string

    @IsString()
    address: string

    @IsNumber()
    @Length(12)
    @IsOptional()
    idCard: number


}
