import { SubCategoryService } from '@clients';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { SubCategoryCreateDto,SubCategoryRetriveAllDto ,SubCategoryUpdateDto} from './dtos';
import { ApiTags } from '@nestjs/swagger';




@ApiTags("subCategory")
@Controller({
  path: "subcategory-service",
  version: "1",
})
    export class SubCategoryController{
        readonly #_service:SubCategoryService
        constructor(service:SubCategoryService){
            this.#_service = service
        }
        @HttpCode(HttpStatus.OK)
        @Get("subcategories")
        subcategoryRetriveAll(
            @Query() query:SubCategoryRetriveAllDto
        ):object{
            return this.#_service.subcategoryRetriveAll(query)
        }

        @HttpCode(HttpStatus.CREATED)
        @Post('create-subcategory')
         async  createSubCategory(
            @Body() body:SubCategoryCreateDto
        ):Promise<SubCategoryCreateDto>{
           return await this.#_service.createSubCategory(body) 
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Patch('update-subcategory/:id')
        async updateSubCategory(
            @Param('id', ParseUUIDPipe) id:string ,
            @Body() body:SubCategoryUpdateDto
        ):Promise<SubCategoryUpdateDto>{
            return await this.#_service.updateSubCategory({
                ...body,    
                id  
            })              
        } 
        
        @HttpCode(HttpStatus.NO_CONTENT)
        @Delete('delete-subcategory/:id')
        async deleteSubCategory(
            @Param('id', ParseUUIDPipe) id:string ,
        ):Promise<object>{              
            return await this.#_service.deleteSubCategory({id})              
        }

        @HttpCode(HttpStatus.OK)
        @Get('get-subcategory/:id')
        async getSubCategory(
            @Param('id', ParseUUIDPipe) id:string ,
        ):Promise<object>{              
            return await this.#_service.getSubCategory({id})              
        }

    }                                         