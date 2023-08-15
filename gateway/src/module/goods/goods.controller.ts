import { GoodsService } from '@clients';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { GoodsCreateDto,GoodsRetriveAllDto ,GoodsUpdateDto ,GoodsSaleDto}  from './dtos';



@ApiTags("Goods")
@Controller({
  path: "goods-service",
  version: "1",
})

    export class GoodsController{
        readonly #_service:GoodsService
        constructor(service:GoodsService){
            this.#_service = service
        }
        @HttpCode(HttpStatus.OK)
        @Get("goods")
        goodsRetriveAll(
            @Query() query:GoodsRetriveAllDto
        ):object{
            return this.#_service.goodsRetriveAll(query)
        }

        @HttpCode(HttpStatus.CREATED)
        @Post('create-goods')
         async  createGoods(
            @Body() body:GoodsCreateDto
        ):Promise<GoodsCreateDto>{
           return await this.#_service.createGoods(body) 
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Patch('update-goods/:id')
        async updateGoods(
            @Param('id', ParseUUIDPipe) id:string ,
            @Body() body:GoodsUpdateDto
        ):Promise<GoodsUpdateDto>{
            return await this.#_service.updateGoods({
                ...body,    
                id  
            })              
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Delete('delete-goods/:id')
        async deleteGoods(
            @Param('id', ParseUUIDPipe) id:string ,
        ):Promise<object>{              
            return await this.#_service.deleteGoods({id})              
        }


        @HttpCode(HttpStatus.OK)
        @Get("status")        
        goodsSale(
            @Query() query:GoodsSaleDto
        ):object{
            return this.#_service.goodsSale(query)
        }
        
    
    }                                         