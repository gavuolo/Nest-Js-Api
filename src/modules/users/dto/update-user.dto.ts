import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    @IsStrongPassword({
        minLength: 6, 
        minLowercase: 2,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 3
    }) 
    password: string
}