import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { Command } from "./enums";
import { SignInDto, SignUpDto } from "./dtos";
import type { SignInResponse, SignUpResponse } from "./interfaces";
import { SignOutDto } from "./dtos/sign-out.dto";

@Controller()
export class AuthController {
    readonly #_service: AuthService

    constructor(service: AuthService) {
        this.#_service = service
    }

    @MessagePattern(Command.AUTH_SIGN_UP)
    signUp(@Payload() payload: SignUpDto): Promise<SignUpResponse> {
        return this.#_service.signUp(payload)
    }

    @MessagePattern(Command.AUTH_SIGN_IN)
    signIn(@Payload() payload: SignInDto): Promise<SignInResponse> {
        return this.#_service.signIn(payload)
    }
    @MessagePattern(Command.AUTH_SIGN_OUT)
    signOut(@Payload() payload: SignOutDto): Promise<null> {
        return this.#_service.signOut(payload)
    }
}
