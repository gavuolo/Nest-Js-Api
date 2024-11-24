import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //acesso provider global e usar exports
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
