import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/repository/user.repository';
import { PrismaUsersRepository } from '../users/repository/implementations/prismaUsers.repository';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, //criação da autenticação jwt
      signOptions: { expiresIn: '24h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
})
export class AuthModule {}
