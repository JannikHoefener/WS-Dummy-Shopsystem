import * as React from "react";
import Grid from "@mui/material/Grid";
import { ProductCard } from "./ProductCard";
import { useContext } from "react";
import { HandleProductContext } from "../Context/HandleProductContext";
import ShowProductInformation from "./GetProductInfo";
import { InProcess } from "./InProcess";
import { Product } from "../Types/ProductTypes";
import { CartContext } from "../Context/HandleCartContext";

/**
 * a grid to set the order of ProductCards.
 * xs={12} extra-small => uses 12 columns of 12 -the defult- for each Grid item
 * md={4} medium => uses 4 columns of 12 for each Grid item
 * xl={2} extra-large => uses 2 columns of 12 for each Grid item
 * @returns
 */
export const ProductsGrid = () => {
  const {
    deleteProductById,
    products,
    handleGetProductById,
    selectedProduct,
    handleCloseDialog,
    loading,
    groupedProducts,
  } = useContext(HandleProductContext);
  const {addItemToCart} = useContext(CartContext)



  

  return (
    <>
      <Grid container>
        {/* Object.entries(groupedProducts) ==> um das Object in ein Array umzuwandeln  */}
        {Object.entries(groupedProducts).map((innerArray, index) => (
          <Grid
            container
            item
            xl={12}
            md={12}
            xs={12}
            sx={{ p: 3 }}
            key={index}
          >
            <h3>{innerArray[0].toUpperCase()} :</h3>
            <Grid mb={2} container spacing={3} key={innerArray[0]}>
              {innerArray[1].map((product: Product, index: number) => (
                <Grid item xs={12} md={4} xl={2} key={product.id}>
                  <ProductCard
                    product={product}
                    moreInfo={handleGetProductById}
                    deleteCard={deleteProductById}
                    addToCart={addItemToCart}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>

      <ShowProductInformation
        loading={loading}
        product={selectedProduct}
        inProcess={<InProcess />}
        onClose={handleCloseDialog}
      />
    </>
  );
};


