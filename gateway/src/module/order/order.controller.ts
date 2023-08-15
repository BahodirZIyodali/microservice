import { OrderService } from '@clients';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { OrderCreateDto,OrderRetriveAllDto ,OrderUpdateDto} from './dtos';



@ApiTags("Orders")
@Controller({
  path: "order-service",
  version: "1",
})
    export class OrderController{
        readonly #_service:OrderService
        constructor(service:OrderService){
            this.#_service = service
        }
        @HttpCode(HttpStatus.OK)
        @Get("orders")
        orderRetriveAll(
            @Query() query:OrderRetriveAllDto
        ):object{
            return this.#_service.orderRetriveAll(query)
        }

        @HttpCode(HttpStatus.CREATED)
        @Post('create-order')
         async  createMarket(
            @Body() body:OrderCreateDto
        ):Promise<OrderCreateDto>{
           return await this.#_service.createOrder(body) 
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Patch('update-order/:id')
        async updateMarket(
            @Param('id', ParseUUIDPipe) id:string ,
            @Body() body:OrderUpdateDto
        ):Promise<OrderUpdateDto>{
            return await this.#_service.updateOrder({
                ...body,    
                id  
            })              
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Delete('delete-order/:id')
        async deleteMarket(
            @Param('id', ParseUUIDPipe) id:string ,
        ):Promise<object>{              
            return await this.#_service.deleteOrder({id})              
        }

    }                                         