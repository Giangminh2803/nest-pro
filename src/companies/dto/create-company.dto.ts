import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateCompanyDto {
   
    @IsNotEmpty({message: 'Name can not be blank'})
    name: string
   
    @IsNotEmpty({message: 'Address can not be blank'})
    address: string

    @IsNotEmpty({message: 'Description can not be blank'})
    description: string

    
}
