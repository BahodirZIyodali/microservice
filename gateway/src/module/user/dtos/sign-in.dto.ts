import { ApiProperty } from "@nestjs/swagger";
import type { SignInRequest, SignInResponse } from "@clients";

export class SignInDto implements SignInRequest {
    @ApiProperty({
        example: 'your name'
    })
    username: string

    @ApiProperty({
        example: '*********'
    })
    password: string
}

export class SignInResponseDto implements SignInResponse {
    @ApiProperty({
        example: 'Bearer token...'
    })
    accessToken: string

    @ApiProperty({
        example: 'token....'
    })
    refreshToken: string
}