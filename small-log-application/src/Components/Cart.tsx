import * as React from "react";
import Drawer from "@mui/material/Drawer";
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { CartContext } from "../Context/HandleCartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function OpenCartDrawer() {
  const {
    productsInCart,
    removeProductFromCart,
    increaseCartProductAmountByOne,
    decreaseCartProductAmountByOne,
  } = React.useContext(CartContext);
  const [open, setOpen] = React.useState(false);

  const getCart = () => (
    <div >
      {/* Cart Headline */}
      <Toolbar sx={{ boxShadow: 3, bgcolor: "#1976d2"}}>
        <Typography variant="h5" color="white">
          Items in Cart
        </Typography>
        <ShoppingCartIcon sx={{ color: "white", ml: 1 }} />
        <Divider />
      </Toolbar>

      {/*Cart-List Header*/}
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Price</strong>
            </TableCell>
            <TableCell>
              <strong>Quantity</strong>
            </TableCell>
            <TableCell>{/* delete */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Cart-List every Product */}
          {productsInCart.map((cartItem, index) => (
            <TableRow>
              {/* Delete Title */}
              <TableCell>{cartItem.product.title}</TableCell>
              {/* Product Price */}
              <TableCell>{cartItem.product.price + " €"}</TableCell>
              {/* Handle Amount */}
              <TableCell>
                <IconButton
                  onClick={() => decreaseCartProductAmountByOne(cartItem)}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                {cartItem.amount}
                <IconButton
                  onClick={() => increaseCartProductAmountByOne(cartItem)}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </TableCell>
              {/* delete Product */}
              <TableCell>
                <IconButton onClick={() => removeProductFromCart(cartItem)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/*Cart Total-Price*/}
      <Box sx={{ m: 2 }}>{getTotalPrice()}</Box>
      <Box sx={{ m: 2 }}>{getTotalQuantity()}</Box>

      {/*Ceckout Button*/}
      
      <Box sx={{ m: 2, display: "inline" }}>
        <Button disabled={productsInCart.length <= 0 } variant="contained" endIcon={<ShoppingCartCheckoutIcon />}>
          CheckOut
        </Button>
      </Box>
    </div>
  );

  /**
   * Get the total price of all cart items
   * @returns totalPrice
   */
  const getTotalPrice = () => {
    const totalPrice = productsInCart
      .map((cartitem) => cartitem.amount * cartitem.product.price)
      .reduce((prevValue, currentTotalValue) => {
        return prevValue + currentTotalValue;
      }, 0);

    // console.log(totalPrice);
    return totalPrice + " €";
  };

  /**
   * Get the total Amount of all items in Cart
   * @returns totalQuantity
   */
  const getTotalQuantity = () => {
    const totalQuantity = productsInCart.reduce(
      (currentTotalAmount, perItem) => {
        return currentTotalAmount + perItem.amount;
      },
      0
    );
    //console.log("totalQuantity2: " + totalQuantity)
    return totalQuantity ;
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="large" color="inherit">
        <Badge badgeContent={getTotalQuantity()} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
        {getCart()}
      </Drawer>
    </>
  );
}
