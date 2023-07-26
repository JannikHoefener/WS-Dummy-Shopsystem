import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { HandleProductContext } from "../Context/HandleProductContext";
import { useContext } from "react";

export const InProcess = () => {
  const { loading } = useContext(HandleProductContext);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <></>;
};
