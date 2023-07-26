import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Product } from "../Types/ProductTypes";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";

type ProductCardProps = {
  product: Product;
  moreInfo: (productID: number) => void;
  deleteCard: (productID: number) => void;
  addToCart: (productID: number) => void;
};

/**
 * ProductCard with one line title "noWrap", description and buttons
 * @param props
 * @returns
 */
export const ProductCard = (props: ProductCardProps) => {
  return (
    <Card elevation={8}>
      <CardMedia component="img" height="140" image={props.product.images[0]} />
      <CardContent sx={{ height: 120 }}>
        <Typography noWrap gutterBottom variant="h5" component="div">
          {props.product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => props.moreInfo(props.product.id)}
          size="small"
        >
          <LiveHelpRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => props.addToCart(props.product.id)}
          size="small"
        >
          <AddShoppingCartIcon />
        </IconButton>
        <Box ml={"auto"}>
          <IconButton
            onClick={() => props.deleteCard(props.product.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
