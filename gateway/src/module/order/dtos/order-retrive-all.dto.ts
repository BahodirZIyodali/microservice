import { OrderRetriveAllresponse } from "@clients";


export class OrderRetriveAllDto implements OrderRetriveAllresponse {
    id: string
    goodsId: string
    userId:string  
}