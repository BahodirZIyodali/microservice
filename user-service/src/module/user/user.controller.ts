import type { User } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {  UserCommand} from './enums';
import { UserUpdateDto } from './dtos/user-update.dto';
import { Controller, ParseUUIDPipe } from '@nestjs/common';




@Controller({
    path: 'user-service/',
    version: '1'
})

export class UserController {
    constructor(
        private readonly service: UserService
    ) {
        this.service = service
    }

    
    @MessagePattern(UserCommand.USER_GET_ALL)
    async UserRetriveAll(): Promise<Pick<User, 'id' | 'username'  >[]> {
        return await this.service.userRetriveAll()
    }


    @MessagePattern(UserCommand.USER_UPDATE)
    async updateUser(
        @Payload() payload: UserUpdateDto
    ): Promise<UserUpdateDto> {
        return await this.service.updateUser(payload)
    }

  

    @MessagePattern(UserCommand.USER_GET_ORDER)
    async getUser(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.getUserOrder({
            id
        })
    }
}                   