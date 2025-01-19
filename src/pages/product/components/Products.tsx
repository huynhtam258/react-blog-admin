import { Button, Typography } from "@material-tailwind/react";
import ProductList from "./ProductList/ProductList";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const Products: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section> 
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" color="blue-gray">
          Danh sách sản phẩm
        </Typography>

        <Button onClick={() => { navigate('/create-product') }}>
          <p className='flex items-center gap-1'>Tạo sản phẩm mới <PlusIcon className="h-5 w-5" /></p>
        </Button>
      </div>
      <ProductList />
    </section>
       
  )
}

export default Products