import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { HandleProductContext } from "../Context/HandleProductContext";
import ShowProductInformation from "./GetProductInfo";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartContext } from "../Context/HandleCartContext";
import { InProcess } from "./InProcess";
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';

/**
 * show all the Products from the API and we added
 * @returns
 */
export const AllProductsList = () => {
  
  // Context to handle Product on this Component 
  const {
    deleteProductById,
    products,
    handleGetProductById,
    selectedProduct,
    handleCloseDialog,
    loading,
  } = useContext(HandleProductContext);

/*   // context to add selected product to cart
  // const ValuesOfCartContext = useContext(CartContext)
  // wir brauchen nur addItemToCart
  // const {addItemToCart,products} = useContext(CartContext) */
  const {addItemToCart} = useContext(CartContext)

  return (
    <React.Fragment>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          sx={{
            m: 1,
            width: "25ch",
          }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />

        <Button variant="contained" sx={{ m: 1, height: 55 }}>
          <SearchIcon fontSize="large" />
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Category</strong>
            </TableCell>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Info</strong>
            </TableCell>
            <TableCell>
              <strong>Price</strong>
            </TableCell>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>{/* add to Cart */}</TableCell>
            <TableCell>{/* delete */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            ? products.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleGetProductById(row.id)}>
                      <LiveHelpRoundedIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.id}</TableCell>

                  {/* add to cart */}
                  <TableCell>
                    <IconButton
                      onClick={() => addItemToCart(row.id)}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </TableCell>
                  {/* Delete Item */}
                  <TableCell>
                    <IconButton onClick={() => deleteProductById(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {/* hier wird das info Fenster aufgerufen und die entsprechende Parameter übergeben */}
      <ShowProductInformation
        loading={loading}
        product={selectedProduct}
        inProcess={<InProcess />}
        onClose={handleCloseDialog}
      />
    </React.Fragment>
  );
};
