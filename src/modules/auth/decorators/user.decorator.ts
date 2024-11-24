//veriável ou class que recebe um parametro

import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const UserRequest = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if(!request.user) throw new NotFoundException('Usuário não encontrado');
    return request.user;
})