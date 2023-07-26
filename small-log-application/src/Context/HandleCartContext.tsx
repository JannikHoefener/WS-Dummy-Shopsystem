import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ProductCard } from "../Components/ProductCard";
import { Product, ProductInCart } from "../Types/ProductTypes";

// Variabel für Werte von dem cartContext werden in
type CartContextValues = {
  productsInCart: ProductInCart[];
  addItemToCart: (id: number) => void;
  removeProductFromCart: (selectedProd: ProductInCart) => void;
  increaseCartProductAmountByOne: (selectedProd: ProductInCart) => void;
  decreaseCartProductAmountByOne: (selectedProd: ProductInCart) => void;
};

// initValues = Object
const initValues: CartContextValues = {
  productsInCart: [],
  addItemToCart: function (id: number): void {
    throw new Error("Function not implemented.");
  },
  removeProductFromCart: function (selectedCartProduct: ProductInCart): void {
    throw new Error("Function not implemented.");
  },
  increaseCartProductAmountByOne: function (
    selectedCartProduct: ProductInCart
  ): void {
    throw new Error("Function not implemented.");
  },
  decreaseCartProductAmountByOne: function (
    selectedCartProduct: ProductInCart
  ): void {
    throw new Error("Function not implemented.");
  },
};

// spread CartValues by useContext
export const CartContext = createContext<CartContextValues>(initValues);

// Component Context Provider für CartContext
// Context Logiken die wir weiter geben wollen
export const CartContextProvider = (props: any) => {
  // useState for the cart list
  const [cart, setCart] = useState<ProductInCart[]>([]);

  //1. Find selected Product by ID with the index of the AllProductsComponent
  const findProductById = async (productID: number) => {
    const results = await axios.get<Product>(
      `https://dummyjson.com/products/${productID}`
    );
    return results.data;
  };

  // 2. Item zur Cart(useState) hinzufügen oder menge erhöhen wenn bereits vorhanden
  const addItemToCartLogic = async (selectedCartProductId: number) => {
    const selectedProd = await findProductById(selectedCartProductId);

    // gucken ob das Product bereits im Warenkorb ist, wenn ja amount erhöhen...
    const cartItemIndex = cart.findIndex(
      (Cartitem) => Cartitem.product.id === selectedProd.id
    );
    if (cartItemIndex != -1) {
      const cartArryCopy = [...cart];
      cartArryCopy[cartItemIndex].amount += 1;
      setCart(cartArryCopy);

      //... sonst hinzufügen
    } else {
      // das Product braucht aber eine Menge als Value um duplicate zu vermeiden ... product um amount erweitert ... siehe Types
      const newProduct: ProductInCart = { product: selectedProd, amount: 1 };
      setCart([...cart, newProduct]);
    }

    // console.log(cart);
  };

  // 3. remove selected Product from cart
  const removeProductFromCartLogic = (selectedCartProduct: ProductInCart) => {
    const index = cart.indexOf(selectedCartProduct);
    let copyOfCart = [...cart];
    copyOfCart.splice(index, 1);
    setCart([...copyOfCart]);
  };

  // 4. handle Product amount
  const increaseCartProductAmountByOneLogic = (
    selectedCartProduct: ProductInCart
  ) => {
    const index = cart.indexOf(selectedCartProduct);
    let copyOfCart = [...cart];
    copyOfCart[index].amount += 1;
    setCart([...copyOfCart]);
  };

  const decreaseCartProductAmountByOneLogic = (
    selectedCartProduct: ProductInCart
  ) => {
    const index = cart.indexOf(selectedCartProduct);
    let copyOfCart = [...cart];
    copyOfCart[index].amount -= 1;
    setCart([...copyOfCart]);
    if (selectedCartProduct.amount === 0) {
      removeProductFromCartLogic(selectedCartProduct);
    }
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart: cart,
        addItemToCart: addItemToCartLogic,
        removeProductFromCart: removeProductFromCartLogic,
        increaseCartProductAmountByOne: increaseCartProductAmountByOneLogic,
        decreaseCartProductAmountByOne: decreaseCartProductAmountByOneLogic,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
