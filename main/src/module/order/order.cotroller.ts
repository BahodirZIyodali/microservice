import type { Order } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { orderService } from './order.service';
import {  OrderCreateDto , OrderUpdateDto} from './dtos';
import { orderCommand } from './enums';




@Controller({
    path: 'order-service/',
    version: '1'
})

export class OrderController {
    constructor(
        private readonly service: orderService
    ) {
        this.service = service
    }

    @MessagePattern(orderCommand.ORDER_RETRIVE_ALL)
    async OrderRetriveAll(): Promise<Pick<Order, 'id' | 'goodsId' | 'userId'  >[]> {
        return await this.service.orderRetriveAll()
    }


    @MessagePattern(orderCommand.ORDER_CREATE)
    async createOrder(
        @Payload() payload: OrderCreateDto
    ): Promise<OrderCreateDto> {
        return await this.service.createOrder(payload)
    }

    @MessagePattern(orderCommand.ORDER_UPDATE)
    async updateOrder(
        @Payload() payload: OrderUpdateDto
    ): Promise<OrderUpdateDto> {
        return await this.service.updateOrder(payload)
    }

    @MessagePattern(orderCommand.ORDER_DELETE)
    async deleteOrder(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.deleteOrder({
            id
        })
    }
}                   