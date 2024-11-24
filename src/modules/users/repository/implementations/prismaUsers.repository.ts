//O NestJs não cria repository. Mas é mais organizado.
import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UsersRepository } from '../user.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO) {
    return await this.prisma.user.create({ data: data });
  }

  async findAllUsers() {
    return await this.prisma.user.findMany({});
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirstOrThrow({ where: { id } });
  }
}
