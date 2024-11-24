import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignUpDTO } from './dto/auth-signUp.dto';
import { AuthSignInDTO } from './dto/auth-signIn.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private AUDIENCE: string = 'users';
  private ISSUER: string = 'Gavuolo';
  private EXPIRATION_TIME = '1 day';

  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: AuthSignUpDTO) {
    const user = await this.usersService.createUser(body);
    return this.createToken(user);
  }

  async signIn({ email, password }: AuthSignInDTO) {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Email or password invalid');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Email or password invalid');
    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
        role: 'user',
      },
      {
        expiresIn: this.EXPIRATION_TIME, //Metadados
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );
    return { token };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}

//cadastrar
