import { GoodsService } from './goods.service';
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [GoodsService],
    providers: [GoodsService]
})
export class GoodsModule { }