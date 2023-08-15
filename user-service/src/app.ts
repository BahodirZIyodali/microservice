import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {  dbConfig } from '@config';
import { AuthModule ,UserModule} from '@module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    AuthModule,
    UserModule
  ]
})
export class App {}
