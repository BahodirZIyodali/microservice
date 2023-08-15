import { categoryCommand } from './enums/commond.enums';
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientTCP } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import {CategoryCreateResponse,CategoryRetriveAllresponse,CategoryDeleteresponse,CategoryUpdateResponse} from "./interfaces";
import { CategoryGetresponse } from './interfaces/category-get.interfaces ';



@Injectable()
export class CategoryService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(private readonly config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('category.host'),
      port: config.getOrThrow<number>('category.port')
    });
    this.#_timeout = config.getOrThrow<number>('category.timeout');
  }

  async categoryRetriveAll(payload: CategoryRetriveAllresponse): Promise<CategoryRetriveAllresponse> {
    return await this.#_send(categoryCommand.CATEGORY_RETRIVE_ALL, payload)
  }



  async createCategory(payload: CategoryCreateResponse): Promise<CategoryCreateResponse> {
    return await this.#_send(categoryCommand.CATEGORY_CREATE, payload)
  }

  async updateCategory(payload: CategoryUpdateResponse): Promise<CategoryUpdateResponse> {
    return await this.#_send(categoryCommand.CATEGORY_UPDATE, payload)
  }

  async deleteCategory(payload: CategoryDeleteresponse): Promise<CategoryDeleteresponse> {
    return await this.#_send(categoryCommand.CATEGORY_DELETE, payload)
  }

  async getCategory(payload: CategoryGetresponse): Promise<CategoryGetresponse> {
    return await this.#_send(categoryCommand.CATEGORY_GET, payload)
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
