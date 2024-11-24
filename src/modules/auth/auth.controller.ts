import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signIn.dto';
import { AuthService } from './auth.service';
import { AuthSignUpDTO } from './dto/auth-signUp.dto';
import { User } from '@prisma/client';
import { AuthGuard } from './authGuard/auth.guard';
import { UserRequest } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  async signUp(@Body() body: AuthSignUpDTO) {
    return this.authService.signUp(body);
  }

  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() body: AuthSignInDTO) {
    return this.authService.signIn(body);
  }

  //MiddlewareAuth
  @UseGuards(AuthGuard) //guard. (token no header)
  @Get('sign-in')
  async userLogged(@UserRequest() user: User) {
    return user;
  }
}
