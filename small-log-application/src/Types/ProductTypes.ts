// Our Definition of Product based on 4 cathegories
export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: string;
  };

  export type ProductInCart = {
    product: Product;
    amount: number;
  };