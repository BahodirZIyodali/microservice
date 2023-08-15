import { ApiProperty } from "@nestjs/swagger";
import { CategoryRetriveAllresponse } from "@clients";


export class CategoryRetriveAllDto implements CategoryRetriveAllresponse {
    id: string
    name: string;
}