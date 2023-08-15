import { subCategoryCommand } from './enums/commond.enums';
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientTCP } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import {SubCategoryCreateResponse,SubCategoryRetriveAllresponse,SubCategoryDeleteresponse,SubCategoryUpdateResponse} from "./interfaces";
import { SubCategoryGetresponse } from './interfaces/category-get.interfaces ';



@Injectable()
export class SubCategoryService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(private readonly config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('subcategory.host'),
      port: config.getOrThrow<number>('subcategory.port')
    });
    this.#_timeout = config.getOrThrow<number>('category.timeout');
  }

  async subcategoryRetriveAll(payload: SubCategoryRetriveAllresponse): Promise<SubCategoryRetriveAllresponse> {
    return await this.#_send(subCategoryCommand.SUBCATEGORY_RETRIVE_ALL, payload)
  }



  async createSubCategory(payload: SubCategoryCreateResponse): Promise<SubCategoryCreateResponse> {
    return await this.#_send(subCategoryCommand.SUBCATEGORY_CREATE, payload)
  }

  async updateSubCategory(payload: SubCategoryUpdateResponse): Promise<SubCategoryUpdateResponse> {
    return await this.#_send(subCategoryCommand.SUBCATEGORY_UPDATE, payload)
  }

  async deleteSubCategory(payload: SubCategoryDeleteresponse): Promise<SubCategoryDeleteresponse> {
    return await this.#_send(subCategoryCommand.SUBCATEGORY_DELETE, payload)
  }

  async getSubCategory(payload: SubCategoryGetresponse): Promise<SubCategoryGetresponse> {
    return await this.#_send(subCategoryCommand.SUBCATEGORY_GET, payload)
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
