import { IsNotEmpty, IsString } from "class-validator";
import { OrderUpdateRequest } from "../interfaces";



export class OrderUpdateDto implements OrderUpdateRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    goodsId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}