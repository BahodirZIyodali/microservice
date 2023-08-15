import { IsNotEmpty, IsString } from "class-validator";
import { SubcategoryCreateRequest } from "../interfaces";


export class SubCategoryCreateDto implements  SubcategoryCreateRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;    
}               