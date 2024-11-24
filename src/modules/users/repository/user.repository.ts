import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';

export abstract class UsersRepository {
  //Para criar um contrato é melhor usar uma classe abstrata
  //Essa criação é importante para um projeto que utiliza vários bancos de dados
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserById(id: number): Promise<User>;
}
