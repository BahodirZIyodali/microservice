import { IsString, IsNotEmpty } from "class-validator";
import type {  SignOutRequest } from "../interfaces";

export class SignOutDto implements SignOutRequest {
    @IsString()
    @IsNotEmpty()
    refreshToken: string

}
