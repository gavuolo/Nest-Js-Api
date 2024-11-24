import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

// Descontinuado, pois está sendo utilizado a class criada pelo PRISMA
export class Users {
  constructor(
    private _email: string,
    private _name: string,
    private _password: string,
    private readonly id: string = randomUUID(),
  ) {}

  public set name(name: string) {
    this._name = name;
  }
  public get name() {
    return this._name;
  }

  public set email(email: string) {
    this._email = email;
  }
  public get email() {
    return this._email;
  }

  public set password(password: string) {
    this._password = password;
  }
  public get password() {
    return this._password;
  }
  getInfo() {
    return `${this.id}${this._name}${this._email}${this._password}`;
  }
}
