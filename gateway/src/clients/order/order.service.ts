import { orderCommand } from './enums';
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientTCP } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import {OrderCreateResponse,OrderRetriveAllresponse,OrderDeleteresponse,OrderUpdateResponse} from "./interfaces";



@Injectable()
export class OrderService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(private readonly config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('order.host'),
      port: config.getOrThrow<number>('order.port')
    });
    this.#_timeout = config.getOrThrow<number>('order.timeout');
  }

  async orderRetriveAll(payload: OrderRetriveAllresponse): Promise<OrderRetriveAllresponse> {
    return await this.#_send(orderCommand.ORDER_RETRIVE_ALL, payload)
  }



  async createOrder(payload: OrderCreateResponse): Promise<OrderCreateResponse> {
    return await this.#_send(orderCommand.ORDER_CREATE, payload)
  }

  async updateOrder(payload: OrderUpdateResponse): Promise<OrderUpdateResponse> {
    return await this.#_send(orderCommand.ORDER_UPDATE, payload)
  }

  async deleteOrder(payload: OrderDeleteresponse): Promise<OrderDeleteresponse> {
    return await this.#_send(orderCommand.ORDER_DELETE, payload)
  }





  async #_connect(): Promise<void> {
    await this.#_client.connect();
  }

  #_disConnect(): void {
    this.#_client.close();
  }

  async #_send<TResponse, TRequest>(pattern: string, payload: TRequest): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.#_client.send<TResponse, TRequest>(pattern, payload).pipe(timeout(this.#_timeout))
      );
    } catch (error: unknown) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
