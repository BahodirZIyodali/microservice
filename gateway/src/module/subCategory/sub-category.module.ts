import { SubCategoryController } from './sub-category.controller';
import { SubCategoryModule } from '@clients';
import { Module } from "@nestjs/common";


@Module({
    imports: [SubCategoryModule],
    controllers: [SubCategoryController]
})
export class SubCategoryGatewayModule { }