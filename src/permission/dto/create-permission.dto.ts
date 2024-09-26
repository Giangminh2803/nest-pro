import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, isString, ValidateNested } from "class-validator";
import mongoose from "mongoose";


export class CreatePermissionDto {
    

    @IsNotEmpty({message:'Name is not empty'})
    name: string;

    @IsNotEmpty({message:'apiPath is not empty'})
    apiPath: number;

    
    @IsNotEmpty({message:'method is not empty'})
    method: string;
    
    
    @IsNotEmpty({message:'Name is not empty'})
    module: string;

    
   

  
}