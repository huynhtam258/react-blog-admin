import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Button, Typography } from '@material-tailwind/react';
import Input from '../../../components/common/input/input'; // Adjust the import path as needed
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import { updateProfile, uploadAvatarProfile } from '../../../services/user.service';
import { getUserProfile } from '../user.thunk';

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
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setValue('firstName', userProfile?.first_name || '');
    setValue('lastName', userProfile?.last_name || '');
    setValue('email', userProfile?.email || '');
    setAvatarPreview(userProfile?.avatar || '');
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

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {

    try {
      if (data.avatar) {
        await uploadAvatarProfile(data.avatar)
      }
      await updateProfile({ first_name: data.firstName, last_name: data.lastName })
    } catch (error) { } finally {
      await dispatch(getUserProfile()).unwrap();
    }

  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">Thông tin cá nhân</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer">
            <input {...getInputProps()} />
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar Preview" className="mx-auto h-40 w-40 rounded-full" />
            ) : (
              <p>Kéo thả hình ảnh của bạn vào đây</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Họ"
            style={{ width: 600, margin: 'auto' }}
            {...register('lastName', { required: true })}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Tên"
            style={{ width: 600, margin: 'auto' }}
            {...register('firstName', { required: true })}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            type="email"
            placeholder="Email"
            readOnly
            style={{ width: 600, margin: 'auto' }}
            {...register('email', { required: true })}
          />
        </div>
        <div className='w-full flex justify-center'>
          <Button type="submit">Cập nhật thông tin</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;