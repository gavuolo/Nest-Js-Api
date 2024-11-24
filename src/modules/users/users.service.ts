import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/user.repository';
import { NotFoundError } from 'rxjs';

@Injectable() // Se tem injectable tem que ter no provider
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDTO) {
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const emailExist = await this.usersRepository.findUserByEmail(data.email);
    if (emailExist)
      throw new HttpException(
        'This E-mail already exists',
        HttpStatus.CONFLICT,
      );
    return await this.usersRepository.createUser({
      ...data,
      password: hashPassword,
    });
  }

  async findAllUsers() {
    return await this.usersRepository.findAllUsers();
  }

  async findUserById(id: number) {
    const userById = await this.usersRepository.findUserById(id);
    if (!userById)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return userById;
  }

}

//add usuário 