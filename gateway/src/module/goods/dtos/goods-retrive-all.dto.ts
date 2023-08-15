import { GooodsRetriveAllresponse } from "@clients";


export class GoodsRetriveAllDto implements GooodsRetriveAllresponse {
    id: string
    title :string       
    price :string     
    subcategoryId:string
}