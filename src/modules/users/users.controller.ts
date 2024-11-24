import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  //Atributos -> Caracteristicas da classe  e Métodos -> Ações
  constructor(private readonly usersService: UsersService) {} // Atributo da Classe UsersController
  
  @Post()//rota
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUser(body); //Métodos da Classe UsersController. This representa o atributo desta classe. Métodos parecem funções
  }

  @Get() 
  findAllUsers(): any {
    //controller método de callback da rota post
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }
}
// Classes são moldes -> Planta baixa de um prédio
// Constructor é a função responsável por construir os objetos a partir de uma classe
