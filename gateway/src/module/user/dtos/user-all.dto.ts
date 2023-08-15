import { ApiProperty } from "@nestjs/swagger";
import { UserRetriveAllresponse } from "@clients";


export class UserRetriveAllDto implements UserRetriveAllresponse {
    id: string
    username: string;
}