import { registerAs } from "@nestjs/config"

declare interface CategoryServiceOptions {
    host: string
    port: number
    timeout: number
}

export const categoryConfig = registerAs<CategoryServiceOptions>('category', (): CategoryServiceOptions => ({
    host: process.env.CATEGORY_SERVICE_HOST,
    port: process.env.CATEGORY_SERVICE_PORT ? parseInt(process.env.CATEGORY_SERVICE_PORT, 10): undefined,
    timeout: process.env.CATEGORY_SERVICE_TIMEOUT ? parseInt(process.env.CATEGORY_SERVICE_TIMEOUT, 10): undefined,
}))
