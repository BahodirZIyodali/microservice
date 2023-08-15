import { registerAs } from "@nestjs/config"

declare interface SubCategoryServiceOptions {
    host: string
    port: number
    timeout: number
}

export const subCategoryConfig = registerAs<SubCategoryServiceOptions>('subcategory', (): SubCategoryServiceOptions => ({
    host: process.env.SUBCATEGORY_SERVICE_HOST,
    port: process.env.SUBCATEGORY_SERVICE_PORT ? parseInt(process.env.SUBCATEGORY_SERVICE_PORT, 10): undefined,
    timeout: process.env.SUBCATEGORY_SERVICE_TIMEOUT ? parseInt(process.env.SUBCATEGORY_SERVICE_TIMEOUT, 10): undefined,
}))
