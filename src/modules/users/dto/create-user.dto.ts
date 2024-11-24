// para validar os dados ou tipar os dados. Transferencia de dados, tipagens e validações.
//schema. Nest usa Pipes
//Para n usar entity. 
//Boa prática.
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDTO {
    @IsString()   //name = Joi.string().required()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6, //minimo de caracteres
        minLowercase: 2,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 3
    }, {message: 'A senha é muito fraca'}) //default: 8 caracteres, 1 minuscula, 1 maiuscula, 1 simbolo, 1 numero
    password: string
}