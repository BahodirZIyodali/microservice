import { ApiProperty } from "@nestjs/swagger";
import { SubCategoryCreateResponse } from "@clients";

export class SubCategoryCreateDto implements SubCategoryCreateResponse {
    @ApiProperty({
        example: 'foodball'
    })
    name: string;
    @ApiProperty({
        example: 'id'
    })
    categoryId:string
}   