import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Button, Typography, Textarea, Select, Option } from '@material-tailwind/react';
import { postProduct } from '../../../../services/product.service';
import { useAppDispatch } from '../../../../store';
import { showToast } from '../../../../stores/toast.slice';

interface IFormInput {
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productType: string;
}

const productTypes = [
  { value: 'Clothing', label: 'Clothing' },
];

function ProductForm() {
  const [formProductValues] = useState();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<IFormInput>({
    defaultValues: formProductValues,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const productBody = {
        product_name: data.productName,
        product_description: data.productDescription,
        product_price: data.productPrice,
        product_quantity: data.productQuantity,
        product_type: data.productType,
        product_thumb: '',
        product_slug: ''
    }
    postProduct(productBody).then(() => {
      dispatch(showToast({ message: 'Tạo sản phẩm thành công' }));
    }).catch(() => {
      dispatch(showToast({ message: 'Tạo sản phẩm thất bại' }));
    })
  };

  return (
    <div className="flex justify-center h-screen w-100">
      <Card color="transparent" shadow={false} className="w-full">
        <>
          <Typography variant="h4" color="blue-gray" className="mb-4">
            Tạo Sản Phẩm
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              size="lg"
              label="Tên Sản Phẩm"
              {...register('productName', { required: 'Tên sản phẩm là bắt buộc' })}
              error={!!errors.productName}
              crossOrigin=""
            />
            <Textarea
              size="lg"
              label="Chi Tiết Sản Phẩm"
              {...register('productDescription', { required: 'Chi tiết sản phẩm là bắt buộc' })}
              error={!!errors.productDescription}
            />
            <Input
              size="lg"
              label="Giá Sản Phẩm"
              type="number"
              {...register('productPrice', { required: 'Giá sản phẩm là bắt buộc' })}
              error={!!errors.productPrice}
              crossOrigin=""
            />
            <Input
              size="lg"
              label="Số lượng sản phẩm"
              type="number"
              {...register('productQuantity', { required: 'Số lượng sản phẩm là bắt buộc' })}
              error={!!errors.productQuantity}
              crossOrigin=""
            />
            <Select
              label="Chọn loại sản phẩm"
              {...register('productType', { required: 'Loại sản phẩm là bắt buộc' })}
              onChange={(event) => setValue('productType', event || '')}
            >
              {productTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
            <Button className='w-100px' disabled={!isValid} type="submit">
              Tạo
            </Button>
          </form>
        </>
      </Card>
    </div>
  );
}

export default ProductForm;
