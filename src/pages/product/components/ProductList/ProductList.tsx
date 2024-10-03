// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../../../../store';
import ProductItem from '../ProductItem';
import { Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
// import { deletePost, getPostList } from '../../../blog/blog.thunk';
// import { useNavigate } from 'react-router-dom';
import { Product, ProductApi } from '../../../../types/product.type';
import { getProductList } from '../../../../services/product.service';

export default function PostList() {
  
  const TABLE_HEAD = ['Tình trạng', 'Tên sản phẩm', 'Hình ảnh', 'Slug', 'Loại sản phẩm','Giá', 'Ngày tạo',''];
  const [productList, setProductList] = useState<Product[]>([])
  const [page] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);


  useEffect(() => {
    async function fetchProductList () {
      const { data } = await getProductList()
      const products = data.map((product: ProductApi) => ({
        id: product.id,
        productName: product.product_name,
        productThumb: product.product_thumb,
        productSlug: product.product_slug,
        productDescription: product.product_description,
        productPrice: product.product_price,
        productQuantity: product.product_quantity,
        productType: product.product_type,
        isDraft: product.isDraft,
        isPublish: product.isPublish
      }))
      setProductList(products)
    }
    fetchProductList()
  }, []);

  const handleDelete = (productId: number) => {
    // TODO
  };

  const handleEditingPost = (productId: number) => {
    // TODO
  };

  const handleReadMorePost = (productId: number) => {
    // TODO
  };

  // table

  return (
    <Card className="h-full w-full overflow-auto">
      
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => {
            const isLast = index === productList.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
            return (
              <ProductItem
                product={product}
                classes={classes}
                handleDelete={handleDelete}
                handleEditingPost={handleEditingPost}
                handleReadMorePost={handleReadMorePost}
                key={`postItem-${index}`}
              />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
