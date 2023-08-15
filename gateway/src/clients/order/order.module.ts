import { OrderService } from './order.service';
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [OrderService],
    providers: [OrderService]
})
export class OrderModule { }