import { ApiProperty } from "@nestjs/swagger";
import type { SignUpRequest, SignUpResponse } from "@clients";

export class SignUpDto implements SignUpRequest {
    @ApiProperty({
        example: 'your name '
    })
    username: string

    @ApiProperty({
        example: '*********'
    })
    password: string
}

export class SignUpResponseDto implements SignUpResponse {
    @ApiProperty({
        example: 'Bearer token...'
    })
    accessToken: string

    @ApiProperty({
        example: 'token....'
    })
    refreshToken: string
}