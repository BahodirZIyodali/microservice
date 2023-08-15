import { ApiProperty } from "@nestjs/swagger";
import { OrderCreateResponse } from "@clients";

export class OrderCreateDto implements OrderCreateResponse {
    @ApiProperty({
        example: 'product id'
    })
    goodsId: string;

    @ApiProperty({
        example: 'user id'
    })
    userId:string 
}   