import { goodsCommand } from './enums';
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientTCP } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import {GoodsCreateResponse,GooodsRetriveAllresponse,GoodsDeleteresponse,GoodsUpdateResponse, GoodsSaleresponse} from "./interfaces";



@Injectable()
export class GoodsService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(private readonly config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('goods.host'),
      port: config.getOrThrow<number>('goods.port')
    });
    this.#_timeout = config.getOrThrow<number>('goods.timeout');
  }

  async goodsRetriveAll(payload: GooodsRetriveAllresponse): Promise<GooodsRetriveAllresponse> {
    return await this.#_send(goodsCommand.GOODS_RETRIVE_ALL, payload)
  }
  async goodsSale(payload: GoodsSaleresponse): Promise<GoodsSaleresponse> {
    return await this.#_send(goodsCommand.GOODS_SALES_ALL, payload)
  }




  async createGoods(payload: GoodsCreateResponse): Promise<GoodsCreateResponse> {
    return await this.#_send(goodsCommand.GOODS_CREATE, payload)
  }

  async updateGoods(payload: GoodsUpdateResponse): Promise<GoodsUpdateResponse> {
    return await this.#_send(goodsCommand.GOODS_UPDATE, payload)
  }

  async deleteGoods(payload: GoodsDeleteresponse): Promise<GoodsDeleteresponse> {
    return await this.#_send(goodsCommand.GOODS_DELETE, payload)
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
