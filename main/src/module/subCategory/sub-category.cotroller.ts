import type { Subcategory } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { SubCategoryService } from './sub-category.service';
import {  SubCategoryCreateDto ,SubCategoryUpdateDto} from './dtos';
import { subCategoryCommand } from './enums';




@Controller({
    path: 'sub-category-service/',
    version: '1'
})

export class SubCategoryController {
    constructor(
        private readonly service: SubCategoryService
    ) {
        this.service = service
    }

    @MessagePattern(subCategoryCommand.SUBCATEGORY_RETRIVE_ALL)
    async SubCategoryRetriveAll(): Promise<Pick<Subcategory, 'id' | 'name' | 'categoryId' >[]> {
        return await this.service.subCategoryRetriveAll()
    }


    @MessagePattern(subCategoryCommand.SUBCATEGORY_CREATE)
    async createSubCategory(
        @Payload() payload: SubCategoryCreateDto
    ): Promise<SubCategoryCreateDto> {
        return await this.service.createSubCategory(payload)
    }

    @MessagePattern(subCategoryCommand.SUBCATEGORY_UPDATE)
    async updateSubCategory(
        @Payload() payload: SubCategoryUpdateDto
    ): Promise<SubCategoryUpdateDto> {
        return await this.service.updateSubCategory(payload)
    }

    @MessagePattern(subCategoryCommand.SUBCATEGORY_DELETE)
    async deleteSubCategory(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.deleteSubCategory({
            id
        })
    }

    @MessagePattern(subCategoryCommand.SUBCATEGORY_GET)
    async getSubCategory(
        @Payload('id', ParseUUIDPipe) id: string
    ): Promise<object> {
       return await this.service.getOneSubCategory({
            id
        })
    }
}                   