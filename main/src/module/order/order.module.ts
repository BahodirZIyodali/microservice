import { PrismaService } from '@prisma';
import { OrderController } from './order.cotroller';
import { orderService } from './order.service';
import { Module } from "@nestjs/common";


@Module({
    providers:[PrismaService , orderService],
    controllers:[OrderController]
})

export class orderModule{}

