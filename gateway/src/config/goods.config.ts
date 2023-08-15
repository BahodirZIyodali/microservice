import { registerAs } from "@nestjs/config"

declare interface GoodsServiceOptions {
    host: string
    port: number
    timeout: number
}

export const GoodsConfig = registerAs<GoodsServiceOptions>('goods', (): GoodsServiceOptions => ({
    host: process.env.GOODS_SERVICE_HOST,
    port: process.env.GOODS_SERVICE_PORT ? parseInt(process.env.GOODS_SERVICE_PORT, 10): undefined,
    timeout: process.env.GOODS_SERVICE_TIMEOUT ? parseInt(process.env.GOODS_SERVICE_TIMEOUT, 10): undefined,
}))
