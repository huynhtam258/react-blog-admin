import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Button, Typography, Textarea, Select, Option } from '@material-tailwind/react';

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
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<IFormInput>({
    defaultValues: formProductValues,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
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
