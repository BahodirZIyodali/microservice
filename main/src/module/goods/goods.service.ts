import { Goods } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import type { GoodsCreateRequest, GoodsDeleteRequest, GoodsUpdateRequest } from './interfaces';



@Injectable()
export class goodsService {
    private readonly prisma: PrismaService
    constructor(prisma: PrismaService) {
        this.prisma = prisma
    }

    async goodsRetriveAll(): Promise<Pick<Goods, 'id' | 'title' | 'price' | 'subcategoryId'  >[]> {
        return await this.prisma.goods.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                subcategoryId: true,
            }
        })
    }
    async goodsAllSales(): Promise<Pick<Goods, 'title' | 'price' | 'sale'>[]> {
        return await this.prisma.goods.findMany({
            where: {
                sale: { not: null },
            },
            select: {
                title: true,
                price: true,
                sale: true,
            },
        });
    }
    

    async createGoods(payload: GoodsCreateRequest): Promise<GoodsCreateRequest> {
      const createdGoods = await this.prisma.goods.create({
        data: {
          title: payload.title,
          price: payload.price,
          sale: payload.sale,
          subcategoryId: payload.subcategoryId,
        },
      });
    
      return createdGoods;
    }
    

    async updateGoods(payload: GoodsUpdateRequest): Promise<GoodsUpdateRequest> {
        await this.#_checkGoods(payload.id)
        return await this.prisma.goods.update({
            where: {
                id: payload.id
            },
            data: {
                title: payload.title,
                price: payload.price,
                subcategoryId: payload.subcategoryId,
                sale: payload.sale,
            }
        })
    }

    async deleteGoods(payload: GoodsDeleteRequest): Promise<GoodsDeleteRequest> {
        await this.#_checkGoods(payload.id)
        return await this.prisma.goods.delete({
            where: {
                id: payload.id
            }
        })
    }


    async #_checkGoods(id: string) {
        const Goods = await this.prisma.goods.findFirst({
            where: {
                id
            }
        })

        if (!Goods) {
            throw new NotFoundException('goods not found')
        }
    }

}