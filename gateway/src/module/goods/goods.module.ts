import { GoodsController } from './goods.controller';
import { CategoryModule } from '@clients';
import { Module } from "@nestjs/common";


@Module({
    imports: [CategoryModule],
    controllers: [GoodsController]
})
export class GoodsGatewayModule { }