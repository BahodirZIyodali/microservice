import { SubCategoryService } from './sub-category.service';
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [SubCategoryService],
    providers: [SubCategoryService]
})
export class SubCategoryModule { }