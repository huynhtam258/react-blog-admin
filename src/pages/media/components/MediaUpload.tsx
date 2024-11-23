import React, { useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import { postMedia } from '../../../services/media.service';

const ImageUpload: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const handleUpload = async () => {
    selectedImages.forEach(async (file) => {
      await postMedia(file)
    })
    // postMedia()
    // const formData = new FormData();
    
    // // Thêm tất cả các hình ảnh vào formData
    // selectedImages.forEach((image) => {
    //   formData.append('images', image);
    // });

    // try {
    //   // Gọi API upload (thay thế URL dưới bằng URL API của bạn)
    //   const response = await fetch(process.env.REACT_APP_BASE_URL + '/media/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     alert('Upload successful');
    //   } else {
    //     alert('Upload failed');
    //   }
    // } catch (error) {
    //   console.error('Error uploading images:', error);
    //   alert('Error uploading images');
    // }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      {/* Tiêu đề */}
      <Typography variant="h4" color="blue-gray">Upload Your Images</Typography>

      {/* Input để chọn file */}
      <div>
        <Input
          type="file"
          multiple
          label="Select images"
          onChange={handleFileChange}
          color="teal"
          crossOrigin={""}
        />
      </div>

      {/* Hiển thị danh sách hình ảnh đã chọn */}
      <div className="space-y-2">
        <Typography variant="h6" color="blue-gray">Selected Images:</Typography>
        <div className="flex space-x-4 overflow-x-auto">
          {selectedImages.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={URL.createObjectURL(image)}
                alt={`selected-img-${index}`}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nút Upload */}
      {selectedImages.length > 0 && (
        <Button onClick={handleUpload} fullWidth color="teal">
          Upload Images
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
