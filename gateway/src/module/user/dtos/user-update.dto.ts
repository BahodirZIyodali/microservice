import { UserUpdateRequest } from "@clients";
import { ApiProperty } from "@nestjs/swagger";



export class UserUpdateDto implements Omit<UserUpdateRequest ,'id'> {

    @ApiProperty({
        example: 'update to smth '
    })
    username: string;

    @ApiProperty({
        example: 'update to smth '
    })
    password: string;
}