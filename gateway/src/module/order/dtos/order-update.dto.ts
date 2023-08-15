import { OrderUpdateResponse } from "@clients";
import { ApiProperty } from "@nestjs/swagger";



export class OrderUpdateDto implements Omit<OrderUpdateResponse , 'id'> {
    @ApiProperty({
        example: 'product id'
    })
    goodsId: string;

    @ApiProperty({
        example: 'user id'
    })
    userId:string 

}