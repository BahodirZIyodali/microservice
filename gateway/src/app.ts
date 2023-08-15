import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { categoryConfig, userConfig,subCategoryConfig ,GoodsConfig,OrderConfig } from '@config';
import {  CategoryGatewayModule ,SubCategoryGatewayModule ,GoodsGatewayModule,OrderGatewayModule} from '@module';
import { UserGatewayModule } from 'module/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [categoryConfig, userConfig,subCategoryConfig,GoodsConfig,OrderConfig],
      isGlobal: true
    }),
    UserGatewayModule,
    CategoryGatewayModule,
    SubCategoryGatewayModule,
    GoodsGatewayModule,
    OrderGatewayModule
  ],
})
export class App {}
