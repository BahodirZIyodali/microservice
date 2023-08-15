import { CategoryService } from './category.service';
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [CategoryService],
    providers: [CategoryService]
})
export class CategoryModule { }