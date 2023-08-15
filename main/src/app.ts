import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {  dbConfig } from '@config';
import {  categoryModule ,SubCategoryModule ,goodsModule ,orderModule} from '@module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    categoryModule,
    SubCategoryModule,
    goodsModule,
    orderModule
  ]
})
export class App {}
