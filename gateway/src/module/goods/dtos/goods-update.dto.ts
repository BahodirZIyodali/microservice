import { ApiProperty } from "@nestjs/swagger";
import {  GoodsUpdateResponse } from "@clients";


export class GoodsUpdateDto implements Omit<GoodsUpdateResponse , 'id'> {
    @ApiProperty({
        example: 'update to smth '
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