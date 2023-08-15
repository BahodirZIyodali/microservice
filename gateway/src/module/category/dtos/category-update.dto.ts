import { CategoryUpdateResponse } from "@clients";
import { ApiProperty } from "@nestjs/swagger";



export class CategoryUpdateDto implements Omit<CategoryUpdateResponse , 'id'> {
    @ApiProperty({
        example: 'update to smth'
    })
    name: string;

}