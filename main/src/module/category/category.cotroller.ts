import type { Category } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { categoryService } from './category.service';
import {  CategoryCreateDto ,CategoryUpdateDto} from './dtos';
import { categoryCommand } from './enums';




@Controller({
    path: 'category-service/',
    version: '1'
})

export class CategoryController {
    constructor(
        private readonly service: categoryService
    ) {
        this.service = service
    }

    @MessagePattern(categoryCommand.CATEGORY_RETRIVE_ALL)
    async CategoryRetriveAll(): Promise<Pick<Category, 'id' | 'name' >[]> {
        return await this.service.categoryRetriveAll()
    }


    @MessagePattern(categoryCommand.CATEGORY_CREATE)
    async createCategory(
        @Payload() payload: CategoryCreateDto
    ): Promise<CategoryCreateDto> {
        return await this.service.createCategory(payload)
    }

    @MessagePattern(categoryCommand.CATEGORY_UPDATE)
    async updateCategory(
        @Payload() payload: CategoryUpdateDto
    ): Promise<CategoryUpdateDto> {
        return await this.service.updateCategory(payload)
    }

    @MessagePattern(categoryCommand.CATEGORY_DELETE)
    async deleteCategory(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.deleteCategory({
            id
        })
    }


    @MessagePattern(categoryCommand.CATEGORY_GET)
    async getCategory(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.getOneCategory({
            id
        })
    }
}                   