import { CategoryController } from './category.controller';
import { GoodsModule } from '@clients';
import { Module } from "@nestjs/common";


@Module({
    imports: [GoodsModule],
    controllers: [CategoryController]
})
export class CategoryGatewayModule { }