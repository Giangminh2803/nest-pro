import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator"
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

    @IsDateString()
    @IsOptional()
    birthday: Date

    @IsNumberString()
    @IsOptional()
    @MaxLength(12)
    @MinLength(12)
    idCard: string

    @IsNumberString()
    @IsOptional()
    @MaxLength(10)
    @MinLength(10)
    phone: string

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

    
    @IsDate()
    birthday: Date

    @IsString()
    gender: string

    @IsString()
    address: string

    @IsNumberString()
    @Length(12)
    @IsOptional()
    idCard: string

    @IsNumberString()
    @Length(10)
    @IsOptional()
    phone: string



}
