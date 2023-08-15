import { SubCategoryRetriveAllresponse } from "@clients";


export class SubCategoryRetriveAllDto implements SubCategoryRetriveAllresponse {
    id: string
    name: string
    categoryId:string 
}