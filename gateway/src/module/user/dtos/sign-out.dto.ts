import { ApiProperty } from "@nestjs/swagger";
import type { SignOutRequest, } from "clients/user/interfaces";

export class SignOutDto implements SignOutRequest {
    @ApiProperty({
        example: 'refresh token...'
    })
    refreshToken: string;
}

