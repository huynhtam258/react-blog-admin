import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography, Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import { deleteMedia, getMediaList } from '../../../services/media.service';
import { useNavigate } from 'react-router-dom';

export default function PhotoListPage () {
  const [mediaList, setMediaList] = useState<string[]>([])
  const [isOpenMediaDialog, setIsOpenMediaDialog] = useState<boolean>(false)
  const [imageSelected, setImageSelected] = useState<any>()
  const navigate = useNavigate();

  async function fetchMedia() {
    const responseMedia = await getMediaList()
    setMediaList(responseMedia)
  }
  
  useEffect(() => {
    fetchMedia()
  }, []);

  
  const handleOpen = (image: any) => {
    setImageSelected(image)
    setIsOpenMediaDialog(true)
  }

  const deleteImage = async () => {
    await deleteMedia(imageSelected.image_id)
    await fetchMedia()
    setIsOpenMediaDialog(false)
  } 
  return (
    <div className="">
      <Typography variant="h4" color="blue-gray" className="mb-4 flex justify-between">
        Danh sách hình ảnh
        <Button onClick={() => { navigate('/upload-image') }}>Upload ảnh</Button>
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
        {mediaList.map((image: any, index) => (
          <Card key={index} className="w-full h-300px overflow-hidden">
            <CardBody className="p-0">
              <img src={image.media_url} className="w-full h-300px object-cover cursor-pointer" onClick={() => handleOpen(image)} />
            </CardBody>
          </Card>
        ))}
      </div>
      <Dialog open={isOpenMediaDialog} handler={handleOpen}>
        <DialogHeader>Media</DialogHeader>
        <DialogBody>
          <p>Bạn có muốn xóa ảnh không</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => { setIsOpenMediaDialog(false) }}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => deleteImage()}>
            <span>Đồng ý</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};