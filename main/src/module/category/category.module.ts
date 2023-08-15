import { PrismaService } from '@prisma';
import { CategoryController } from './category.cotroller';
import { categoryService } from './category.service';
import { Module } from "@nestjs/common";


@Module({
    providers:[PrismaService , categoryService],
    controllers:[CategoryController]
})

export class categoryModule{}

