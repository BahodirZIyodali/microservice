import { OrderController } from './order.controller';
import { OrderModule } from '@clients';
import { Module } from "@nestjs/common";


@Module({
    imports: [OrderModule],
    controllers: [OrderController]
})
export class OrderGatewayModule { }