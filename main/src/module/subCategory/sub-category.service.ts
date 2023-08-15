import { Subcategory } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import type { SubcategoryCreateRequest,SubcategoryDeleteRequest,SubcategoryUpdateRequest } from './interfaces';
import { CategoryGetRequest } from 'module/category/interfaces/category-get.interfaces ';



@Injectable()
export class SubCategoryService {
    private readonly prisma: PrismaService
    constructor(prisma: PrismaService) {
        this.prisma = prisma
    }

    async subCategoryRetriveAll(): Promise<Pick<Subcategory, 'id' | 'name' | 'categoryId' >[]> {
        return await this.prisma.subcategory.findMany({
            select: {
                id: true,
                name: true,
                categoryId:true
            }
        })
    }

    async createSubCategory(payload: SubcategoryCreateRequest): Promise<SubcategoryCreateRequest> {
        return await this.prisma.subcategory.create({
            data: {
                name: payload.name,
                categoryId:payload.categoryId
            }
        })
    }

    async updateSubCategory(payload: SubcategoryUpdateRequest): Promise<SubcategoryUpdateRequest> {
        await this.#_checkSubCategory(payload.id)
        return await this.prisma.subcategory.update({
            where: {
                id: payload.id
            },
            data: {
                name: payload.name,
                categoryId:payload.categoryId
            }
        })
    }

    async deleteSubCategory(payload: SubcategoryDeleteRequest): Promise<SubcategoryDeleteRequest> {
        await this.#_checkSubCategory(payload.id)
        return await this.prisma.subcategory.delete({
            where: {
                id: payload.id
            }
        })
    }
   
    async getOneSubCategory(
        payload: CategoryGetRequest,
      ): Promise<Pick<Subcategory, 'id' | 'name' >[]> {
        await this.#_checkSubCategory(payload.id);
        const allSubCategorys = await this.prisma.subcategory.findMany({
          where: {
            id: payload.id,
          },
          select: {
            id: true,
            name: true,
            goods: {
                select: {
                  id: true,
                  title: true,
                  price:true
                },
              },
          },
        });
        return allSubCategorys;
      }

    async #_checkSubCategory(id: string) {
        const SubCategory = await this.prisma.subcategory.findFirst({
            where: {
                id
            }
        })

        if (!SubCategory) {
            throw new NotFoundException('Subcategory not found')
        }
    }

}