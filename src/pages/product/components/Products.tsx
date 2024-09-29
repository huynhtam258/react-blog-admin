import { Typography } from "@material-tailwind/react";
import ProductList from "./ProductList/ProductList";

export default function Home() {
  return (
    <section> 
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Danh sách sản phẩm
      </Typography>
      <ProductList />
    </section>
       
  )
}