import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { HandleProductContext } from "../Context/HandleProductContext";
import { useNavigate } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import { Product } from "../Types/ProductTypes";
import * as Yup from "yup";
import CategoryDropDown from "./CategoryDropDown";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CreateIcon from '@mui/icons-material/Create';

//Omit => um  attribute von type Product rausnehmen
type FormikValues = Omit<Product, "id" | "images">;

/**
 * Form to Create a new Product to the Database:
 * with 4 Information: Category, Title, Description and Price of the Product using Formik
 * @returns
 */
export const AddProductForm = () => {
  const { appendProduct, groupedProducts } = useContext(HandleProductContext);
  const navigate = useNavigate();

  /* const validate = (values: FormikValues) => {
    console.log("validate");

    //leeres Object wo die Errors gespeichert
    const errors: FormikErrors<FormikValues> = {};

    if (values.category === "") {
      errors.category = "Required";
      console.log("leer");
    } 

    return errors;
  }; */

  //Formik Hook: hier wird die Validation für die TextFields und das DropDown geprüft
  // und die Values von TextFields und Dropdown als Parameters an appendProduct übergeben
  const formik = useFormik<FormikValues>({
    initialValues: {
      category: "",
      title: "",
      description: "",
      price: 0,
    },

    validationSchema: Yup.object({
      category: Yup.string()
        .required("Required")
        .max(100, "must be 10 characters or less")
        .min(3, "must be more than 3 characters"),

      title: Yup.string()
        .required("Required")
        .min(3, "must be more than 3 characters"),

      price: Yup.number().required("Required"),
    }),

    onSubmit: (values) => {
      console.log("handleSubmit");
      appendProduct(
        values.title,
        values.description,
        values.price,
        values.category
      );
      navigate("Productlist");
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ m: 1 }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
        <h1>Add Product</h1>

        {/* the products categories as TextField */}
        {/* <TextField
          sx={{ width: "400px" }}
          id="category"
          name="category"
          label="Category"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.category}
          error={formik.errors.category !== undefined}
          helperText={formik.errors.category}
          required
        /> */}

        <CategoryDropDown
          categories={Object.keys(groupedProducts)}
          onChange={formik.handleChange}
          lable="Category"
          value={formik.values.category}
          error={formik.errors.category !== undefined}
          helperText={formik.errors.category}
          required
        />

        <TextField
          sx={{ width: "400px" }}
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title !== undefined}
          helperText={formik.errors.title}
          required
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          sx={{ width: "400px" }}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <TextField
          sx={{ width: "400px" }}
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price !== undefined}
          helperText={formik.errors.price}
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={formik.isValid == false}
          sx={{ m: 2, width: 100 }}
          endIcon={<CreateIcon/>}
        >
          Create
        </Button >
      </Stack>
    </Box>
  );
};
