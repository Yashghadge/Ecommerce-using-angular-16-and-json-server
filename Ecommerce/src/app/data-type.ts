export interface signUp{
    name: string;
    email: string;
    password: string;
}

export interface login{
    email:string;
    password:string;
}

export interface product{
    id:number | string;
    name: string;
    price:number;
    category:string;
    color:string;
    image:string;
    description:string,
    quantity: undefined | number,
    productId:undefined| number
}


export interface cart{
    id:number | string |undefined;
    name: string;
    price:number;
    category:string;
    color:string;
    image:string;
    description:string,
    quantity: undefined | number;
    userId:number,
    productId:number | string
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}


export interface order{
    id:number | undefined,
   email: string,
   address: string,
    contact: string,
    totalPrice:number,
    userId:number

}