import type { Goods } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { goodsService } from './goods.service';
import {  GoodsCreateDto ,GoodsUpdateDto} from './dtos';
import { goodsCommand } from './enums';




@Controller({
    path: 'goods-service/',
    version: '1'
})

export class GoodsController {
    constructor(
        private readonly service: goodsService
    ) {
        this.service = service
    }

    @MessagePattern(goodsCommand.GOODS_RETRIVE_ALL)
    async GoodsRetriveAll(): Promise<Pick<Goods, 'id' | 'title' | 'price' | 'subcategoryId' >[]> {
        return await this.service.goodsRetriveAll()
    }
    @MessagePattern(goodsCommand.GOODS_SALES_ALL)
    async  goodsAllSales(): Promise<Pick<Goods,  'title' | 'price' | 'sale' >[]> {
        return await this.service.goodsAllSales()
    }


    @MessagePattern(goodsCommand.GOODS_CREATE)
    async createGoods(
        @Payload() payload: GoodsCreateDto
    ): Promise<GoodsCreateDto> {
        return await this.service.createGoods(payload)
    }

    @MessagePattern(goodsCommand.GOODS_UPDATE)
    async updateGoods(
        @Payload() payload: GoodsUpdateDto
    ): Promise<GoodsUpdateDto> {
        return await this.service.updateGoods(payload)
    }

    @MessagePattern(goodsCommand.GOODS_DELETE)
    async deleteGoods(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.deleteGoods({
            id
        })
    }
}                   

