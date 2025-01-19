import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Button, Typography } from '@material-tailwind/react';
import Input from '../../../components/common/input/input'; // Adjust the import path as needed

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  // bio: string;
  avatar: File | null;
}

const Profile: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<ProfileFormValues>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    // Set temporary values for the form fields
    setValue('firstName', 'John');
    setValue('lastName', 'Doe');
    setValue('email', 'john.doe@example.com');
    // setValue('bio', 'This is a temporary bio.');
  }, [setValue]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setValue('avatar', file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">Thông tin cá nhân</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer">
            <input {...getInputProps()} />
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar Preview" className="mx-auto h-24 w-24 rounded-full" />
            ) : (
              <p>Kéo thả hình ảnh của bạn vào đây</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Tên"
            {...register('firstName', { required: true })}
          />

          <Input
            type="text"
            placeholder="Họ"
            {...register('lastName', { required: true })}
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
        </div>
        {/* <div className="mb-4">
          <Input
            type="text"
            placeholder="Bio"
            {...register('bio')}
          />
        </div> */}
        <Button type="submit">Cập nhật thông tin</Button>
      </form>
    </div>
  );
};

export default Profile;