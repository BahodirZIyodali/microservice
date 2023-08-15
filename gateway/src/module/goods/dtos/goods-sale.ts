import { GoodsSaleresponse } from "@clients"


export class GoodsSaleDto implements GoodsSaleresponse {
    title :string       
    price :string     
    sale?:string
}