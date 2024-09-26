
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, isString, ValidateNested } from "class-validator";
import mongoose from "mongoose";


export class CreateRoleDto {
    

    @IsNotEmpty({message:'Name is not empty'})
    name: string;

    @IsNotEmpty({message:'description is not empty'})
    description: string;

    
    @IsNotEmpty({message:'method is not empty'})
    isActive: boolean;
    
    
    @IsNotEmpty({message:'permission is not empty'})
    permissions: [mongoose.Schema.Types.ObjectId];

    
   

  
}