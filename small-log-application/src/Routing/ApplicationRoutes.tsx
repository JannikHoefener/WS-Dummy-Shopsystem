import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProductForm } from "../Components/AddProductForm";
import { TemporaryDrawer } from "../Components/AppBar";
import { LoginForm } from "../Components/LoginForm";
import { AllProductsList } from "../Components/AllProducts";
import { LoginContext } from "../Context/LoginAuthContext";
import { HandleProductContext } from "../Context/HandleProductContext";
import { ProductsGrid } from "../Components/ProductsGrid";

/**
 * defines the Routes / Links for routing between all the pages / components
 * @returns
 */
export const ApplicationRoutes = () => {
  const { isLogIn } = useContext(LoginContext);
 
  /* if (!isLogIn) {
    return <LoginForm />;
  } */
  return (
    <BrowserRouter>
      <TemporaryDrawer />
      <Routes>
        <Route path="/" element={<AddProductForm />} />
        <Route path="Productlist" element={<AllProductsList />} />
        <Route path="ProductsGrid" element={<ProductsGrid/>} />
      </Routes>
    </BrowserRouter>
  );
};
