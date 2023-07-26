import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Product } from "../Types/ProductTypes";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

type ShowProductInformationProps = {
  children?: React.ReactNode;
  product: Product | null;
  onClose: () => void;
  loading: boolean;
  inProcess: React.ReactNode;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * gives the user information about a selected product as MUI a dialog
 * @param props
 * @returns
 */
export default function ShowProductInformation(
  props: ShowProductInformationProps
) {
  return (
    <>
      {/* hier prüfen wir ob das Product von API bereit ist zu zeigen oder müssen wir loading zeigen*/}
      {props.product || props.loading ? (
        <>
          <Dialog
            open={true}
            onClose={props.onClose}
            keepMounted
            TransitionComponent={Transition}
          >
            {props.product ? (
              <>
                <DialogTitle>{props.product.title}</DialogTitle>
                <DialogContent>
                  <img src={props.product.images[0]} />
                  <DialogContentText>
                    {props.product.description}

                    <Typography mt={2} >
                      <strong>Price:&#160;{props.product.price}€</strong>
                    </Typography>
                  </DialogContentText>
                </DialogContent>
              </>
            ) : (
              props.inProcess
            )}
            <DialogActions>
              <Button variant="contained" onClick={props.onClose}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
