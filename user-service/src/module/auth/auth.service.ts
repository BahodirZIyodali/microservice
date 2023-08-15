import {  User } from "@prisma/client";
import {  ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { sign, refreshSign, verify } from "@helpers";
import type { SignInRequest, SignUpRequest, SignUpResponse, SignOutRequest } from "./interfaces";

@Injectable()
export class AuthService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async signUp(payload: SignUpRequest): Promise<SignUpResponse> {
        await this.#_checkExistingUser({ username: payload.username })

        const newUser = await this.#_prisma.user.create({
            data: {
                username: payload.username,
                password: payload.password
            },
            select: {
                id: true
            }
        })

        return {
            accessToken: sign({ id: newUser.id }),
            refreshToken: refreshSign({ id: newUser.id })
        }
    }
   
    async signIn(payload: SignInRequest): Promise<SignUpResponse> {
        const user = await this.#_checkUser({ username: payload.username, password: payload.password })

        return {
            accessToken: await sign({ id: user.id }),
            refreshToken: await refreshSign({ id: user.id })
        }
    }

    async signOut(payload: SignOutRequest): Promise<null> {
        
       await  this.#_prisma.user.update({
        data:{
            deletedAt:new Date().toISOString(),
        },
        where:{
          id:JSON.parse(verify(payload.refreshToken)).id
        },
        })

        return null
      }
   
    async #_checkUser(payload: { username: string, password?: string }): Promise<Pick<User, 'id'>> {
        const user = await this.#_prisma.user.findFirst({
            where: {
                username: payload.username,
                password: payload.password,
                deletedAt: null
            },
            select: {
                id: true
            }
        })

        if(!user) {
            throw new NotFoundException('User not found')
        }

        return {
            id: user.id
        }
    }

    async #_checkExistingUser(payload: { username: string }): Promise<null> {
        const user = await this.#_prisma.user.findFirst({
            where: {
                username: payload.username,
                deletedAt: null
            },
            select: {
                id: true
            }
        })

        if(user) {
            throw new ConflictException('User already exists')
        }

        return null
    }




}

