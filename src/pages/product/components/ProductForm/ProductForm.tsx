import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

interface IFormInput {
  productName: string;
  productDetails: string;
  productPrice: number;
}

function ProductForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setStep(step + 1);
  };

  return (
    <div className="flex justify-center h-screen w-100">
      <Card color="transparent" shadow={false} className="w-full">
        {step === 1 && (
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
              <Input
                size="lg"
                label="Chi Tiết Sản Phẩm"
                {...register('productDetails', { required: 'Chi tiết sản phẩm là bắt buộc' })}
                error={!!errors.productDetails}
                crossOrigin=""
              />
              <Input
                size="lg"
                label="Giá Sản Phẩm"
                type="number"
                {...register('productPrice', { required: 'Giá sản phẩm là bắt buộc' })}
                error={!!errors.productPrice}
                crossOrigin=""
              />
              <Button type="submit" fullWidth>
                OK
              </Button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <Typography variant="h4" color="blue-gray" className="mb-4">
              Đăng Hình Ảnh Sản Phẩm
            </Typography>
            <form className="flex flex-col gap-4">
              <Input size="lg" label="Hình Ảnh Sản Phẩm" type="file" crossOrigin="" />
              <Button fullWidth>
                Đăng
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

export default ProductForm;
