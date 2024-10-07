import ProductItem from '../ProductItem';
import { Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Product, ProductApi } from '../../../../types/product.type';
import { draftProduct, getProductList, publishProduct, unPublishProduct } from '../../../../services/product.service';
import { converterProduct } from '../../../../converters/product.converter';

export default function PostList() {
  
  const TABLE_HEAD = ['Tình trạng', 'Tên sản phẩm', 'Hình ảnh', 'Slug', 'Loại sản phẩm','Giá', 'Ngày tạo',''];
  const [productList, setProductList] = useState<Product[]>([])
  const [page] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);


  async function fetchProductList () {
    const { data } = await getProductList()
    const products = data.map((product: ProductApi) => converterProduct(product))
    setProductList(products)
  }
  
  useEffect(() => {
    fetchProductList()
  }, []);

  const handleDelete = async (productId: number) => {
    await draftProduct(productId)
  };

  const handleEditingPost = (productId: number) => {
    // TODO
  };

  const handleReadMorePost = (productId: number) => {
    // TODO
  };

  const handlePublishProduct = async (productId: number) => {
    await publishProduct(productId)
  }

  const handleUnPublishProduct = async (productId: number) => {
    await unPublishProduct(productId)
  }

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
                handlePublishProduct={handlePublishProduct}
                handleUnPublishProduct={handleUnPublishProduct}
                key={`productItem-${index}`}
              />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
