import { PrismaService } from '@prisma';
import { SubCategoryController } from './sub-category.cotroller';
import { SubCategoryService } from './sub-category.service';
import { Module } from "@nestjs/common";


@Module({
    providers:[PrismaService , SubCategoryService],
    controllers:[SubCategoryController]
})

export class SubCategoryModule{}

