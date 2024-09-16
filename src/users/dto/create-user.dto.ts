import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"
import mongoose from "mongoose";

class Company {
    @IsString()
    _id: mongoose.Schema.Types.ObjectId;
    @IsString()
    name: string;
}

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

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company!: Company;
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


}
