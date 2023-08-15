import { ApiProperty } from "@nestjs/swagger";
import { GoodsCreateResponse } from "@clients";

export class GoodsCreateDto implements GoodsCreateResponse {
    @ApiProperty({
        example: 'ball '
    })
    title :string 
    
    @ApiProperty({
        example: '100$ '
    })
    price :string   

    @ApiProperty({
        example: '10%'
    })  
    sale?:string
    
    @ApiProperty({
        example: 'id '
    })
    subcategoryId :string   
}   