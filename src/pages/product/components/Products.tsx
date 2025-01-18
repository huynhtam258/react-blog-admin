import { Typography } from "@material-tailwind/react";
import ProductList from "./ProductList/ProductList";
import React from "react";

const Products: React.FC = () => {
  return (
    <section> 
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Danh sách sản phẩm
      </Typography>
      <ProductList />
    </section>
       
  )
}

export default Products