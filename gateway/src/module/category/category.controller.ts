import { CategoryService } from '@clients';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { CategoryCreateDto,CategoryRetriveAllDto ,CategoryUpdateDto} from './dtos';
import { ApiTags } from '@nestjs/swagger';




@ApiTags("Category")
@Controller({
  path: "category-service",
  version: "1",
})
    export class CategoryController{
        readonly #_service:CategoryService
        constructor(service:CategoryService){
            this.#_service = service
        }
        @HttpCode(HttpStatus.OK)
        @Get("categories")
        categoryRetriveAll(
            @Query() query:CategoryRetriveAllDto
        ):object{
            return this.#_service.categoryRetriveAll(query)
        }

        @HttpCode(HttpStatus.CREATED)
        @Post('create-category')
         async  createCategory(
            @Body() body:CategoryCreateDto
        ):Promise<CategoryCreateDto>{
           return await this.#_service.createCategory(body) 
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Patch('update-category/:id')
        async updateCategory(
            @Param('id', ParseUUIDPipe) id:string ,
            @Body() body:CategoryUpdateDto
        ):Promise<CategoryUpdateDto>{
            return await this.#_service.updateCategory({
                ...body,    
                id  
            })              
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Delete('delete-category/:id')
        async deleteCategory(
            @Param('id', ParseUUIDPipe) id:string ,
        ):Promise<object>{              
            return await this.#_service.deleteCategory({id})              
        }
      

        @HttpCode(HttpStatus.OK)
        @Get('get-category/:id')
        async getCategory(
            @Param('id', ParseUUIDPipe) id:string ,
        ):Promise<object>{              
            return await this.#_service.getCategory({id})              
        }

    }                                         