import { User } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import { UserGetOrderRequest, UserUpdateRequest } from './interfaces';


@Injectable()
export class UserService {
    private readonly prisma: PrismaService
    constructor(prisma: PrismaService) {
        this.prisma = prisma
    }

  
    async userRetriveAll(): Promise<Pick<User, 'id' | 'username' >[]> {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
            }
        })
    }


    async updateUser(payload: UserUpdateRequest): Promise<UserUpdateRequest> {
        await this.#_checkUser(payload.id)
        return await this.prisma.user.update({
            where: {
                id: payload.id
            },
            data: {
                username: payload.username,
                password:payload.password
            }
        })
    }

   
    async getUserOrder(
        payload: UserGetOrderRequest,
      ): Promise<Pick<User, 'id' | 'username'  >[]> {
        await this.#_checkUser(payload.id);
        const allUser = await this.prisma.user.findMany({
          where: {
            id: payload.id,
          },
          select: {
            id: true,
            username: true,
            orders: {
                select: {
                  id: true,
                  goods:true
                },
              },
          },
        });
        return allUser;
      }

    async #_checkUser(id: string) {
        const User = await this.prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!User) {
            throw new NotFoundException('User not found')
        }
    }

}