import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GoodsUpdateRequest } from "../interfaces";



export class GoodsUpdateDto implements GoodsUpdateRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

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