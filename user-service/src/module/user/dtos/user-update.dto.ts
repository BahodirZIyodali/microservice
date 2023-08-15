import { IsNotEmpty, IsString } from "class-validator";
import { UserUpdateRequest } from "../interfaces";



export class UserUpdateDto implements UserUpdateRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}