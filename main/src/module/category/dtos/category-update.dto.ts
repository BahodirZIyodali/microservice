import { IsNotEmpty, IsString } from "class-validator";
import { CategoryUpdateRequest } from "../interfaces";



export class CategoryUpdateDto implements CategoryUpdateRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

}