import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GoodsCreateRequest } from "../interfaces";




export class GoodsCreateDto implements GoodsCreateRequest {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    subcategoryId: string;

    
    @IsOptional()
    sale?: string;
}               