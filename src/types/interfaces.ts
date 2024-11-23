// {
//     id:1,
//     title:'...',
//     price:'...',
//     category:'...',
//     description:'...',
//     image:'...'
// }

export interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

export interface ObjectWithId {
    id: number;
}