import type { TcpOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { App } from './app'
import { appConfig } from './config'

setImmediate(async(): Promise<void> => {
  const app = await NestFactory.createMicroservice<TcpOptions>(App, {
    transport: Transport.TCP,
    options: appConfig.options
  })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen()
})
