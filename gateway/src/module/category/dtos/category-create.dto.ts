import { ApiProperty } from "@nestjs/swagger";
import { CategoryCreateResponse } from "@clients";

export class CategoryCreateDto implements CategoryCreateResponse {
    @ApiProperty({
        example: 'sport equipment'
    })
    name: string;
}   