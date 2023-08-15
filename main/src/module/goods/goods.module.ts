import { PrismaService } from '@prisma';
import { GoodsController } from './goods.cotroller';
import { goodsService } from './goods.service';
import { Module } from "@nestjs/common";


@Module({
    providers:[PrismaService , goodsService],
    controllers:[GoodsController]
})

export class goodsModule{}

