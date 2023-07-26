import { Category } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { Product } from "../Types/ProductTypes";

// !!!=> Logs meint die Liste aller Produkte!!!

// "filtering" the Information from the API based on our Product definition" so we only see the important values
type GetProductsResponse = {
  products: Product[];
};

//
type HandleProductProviderProps = {
  children?: React.ReactNode;
};


//die Kombination zwischen key und Value ist Dictionary 
type GroupedProducts ={
  [category:string]: Product[]
}

//zweite Möglichkeit wie eine Dictionary geschrieben wird
type GroupedProducts2 = Record<string, Product[]>


//
type HandleProductContextProps = {
  appendProduct: (
    title: string,
    description: string,
    price: number,
    category: string
  ) => void;
  deleteProductById: (id: number) => void;
  products: Product[];
  handleGetProductById: (productID: number) => void;
  selectedProduct: Product | null;
  handleCloseDialog: () => void;
  loading: boolean;
  groupedProducts: GroupedProducts;
};

const initValues: HandleProductContextProps = {
  products: [],
  deleteProductById: function (id: number): void {
    throw new Error("Function not implemented.");
  },
  appendProduct: function (
    title: string,
    description: string,
    price: number
  ): void {
    throw new Error("Function not implemented.");
  },

  handleGetProductById: function (productID: number): void {
    throw new Error("Function not implemented.");
  },
  selectedProduct: null,
  handleCloseDialog: function (): void {
    throw new Error("Function not implemented.");
  },
  loading: false,

  //leeres Dictionary
  groupedProducts: {},
};

export const HandleProductContext =
  createContext<HandleProductContextProps>(initValues);

/**
 * Dieser Provider stellt folgende Dinge Global zur verfügung:
 * 1. Function: appendProduct() (fügt ein neu erstelltes Produkt zur JSON datei hinzu)
 * 2. deleteProductById()
 * @param props
 * @returns
 */
export const HandleProductProvider = (props: HandleProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * useEffect um HTTP Get Request zu stellen
   */
  useEffect(() => {
    //Start loading
    setLoading(true);

    const getData = async () => {
      const response = await axios.get<GetProductsResponse>(
        `https://dummyjson.com/products`
      );
      setProducts(response.data.products);
      console.log(products);

      //Stop loading
      setLoading(false);
    };
    getData();

    // ===> Andere Möglichkeit HTTP Get Request zu verwenden
    /* axios
      .get<GetProductsResponse>("https://dummyjson.com/products")
      .then((response) => {
        console.log(response.data.products);

        setLogs(response.data.products);
        console.log(logs);
      }); */
  }, []);

  const appendProductLogic = (
    title: string,
    description: string,
    price: number,
    category: string
  ) => {
    setProducts([
      ...products,
      {
        title: title,
        description: description,
        id: createId(),
        price: price,
        images: [],
        category: category,
      },
    ]);
  };

  /**
   * searches for the largest id value in logs and safes the new id + 1 in resultID
   * @returns
   */
  const createId = () => {
    let resultID = 1;
    products.forEach((element) => {
      resultID = Math.max(element.id) + 1;
    });
    return resultID;
  };

  const deleteProductByIdLogic = (id: number) => {
    setProducts(products.filter((v, i) => v.id !== id));
    console.log(id);
  };

  /**
   * Create Http request to provide a product by id
   * @param productID
   */
  const handleGetProductByIdLogic = (productID: number) => {
    //Start loading
    setLoading(true);

    const getSelectedProductData = async () => {
      try {
        const results = await axios.get<Product>(
          `https://dummyjson.com/products/${productID}`
        );
        console.log(results);
        setCurrentProduct(results.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        setCurrentProduct(null);

        //was immer passiert
      } finally {
        setLoading(false);
      }
    };

    getSelectedProductData();
  };

  const handleCloseDialogLogic = () => {
    setCurrentProduct(null);
    console.log(currentProduct);
    setLoading(false);
  };

  //-------------reduce Beispiel---------------
  /*   const arr = [1, 2, 3];
  const result = arr.reduce((pre, crr, index) => {
    return pre + crr;
  },0);
  console.log("myResult ", result); */

  /**
   * Grouping the products by category
   */
  const groupedProducts = products.reduce(
    (group: GroupedProducts, value) => {
      // Group initialization
      if (!group[value.category]) {
        group[value.category] = [];
      }
      // Grouping
      group[value.category].push(value);
      return group;
    },
    {}
  );
  console.log("Result ", groupedProducts);

  return (
    <HandleProductContext.Provider
      value={{
        appendProduct: appendProductLogic,
        deleteProductById: deleteProductByIdLogic,
        products: products,
        handleGetProductById: handleGetProductByIdLogic,
        selectedProduct: currentProduct,
        handleCloseDialog: handleCloseDialogLogic,
        loading: loading,
        groupedProducts: groupedProducts,
      }}
    >
      {props.children}
    </HandleProductContext.Provider>
  );
};
