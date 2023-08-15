import { SubCategoryUpdateResponse } from "@clients";
import { ApiProperty } from "@nestjs/swagger";



export class SubCategoryUpdateDto implements Omit<SubCategoryUpdateResponse , 'id'> {
    @ApiProperty({
        example: 'update to smth'
    })
    name: string;
    @ApiProperty({
        example: 'update to smth'
    })
    categoryId: string;
}