import { registerAs } from "@nestjs/config"

declare interface OrderServiceOptions {
    host: string
    port: number
    timeout: number
}

export const OrderConfig = registerAs<OrderServiceOptions>('order', (): OrderServiceOptions => ({
    host: process.env.ORDER_SERVICE_HOST,
    port: process.env.ORDER_SERVICE_PORT ? parseInt(process.env.ORDER_SERVICE_PORT, 10): undefined,
    timeout: process.env.ORDER_SERVICE_TIMEOUT ? parseInt(process.env.ORDER_SERVICE_TIMEOUT, 10): undefined,
}))
