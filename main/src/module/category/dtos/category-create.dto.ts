import { IsNotEmpty, IsString } from "class-validator";
import { CategoryCreateRequest } from "../interfaces";


export class CategoryCreateDto implements CategoryCreateRequest {
    @IsString()
    @IsNotEmpty()
    name: string;
}               