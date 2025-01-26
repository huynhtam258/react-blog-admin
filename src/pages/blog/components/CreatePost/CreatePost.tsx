import { Fragment, useEffect, useState } from "react"
import { Post } from "../../../../types/blog.type"
import { useSelector } from "react-redux"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RootState, useAppDispatch } from "../../../../store"
import { addPost, getPostList, startEditingPost, updatePost } from "../../blog.thunk"
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { getMediaList } from "../../../../services/media.service";

import './CreatePost.scss'
import { useNavigate, useParams } from "react-router-dom";
const initialState: Post = {
  id: 0,
  title: '',
  description: '',
  thumbnail: '',
  created_at: '',
  status: 0,
  updated_at: '',
  content: '',
  publish_date: '',
  publish: false,
  user: null
}
export default function CreatePost() {
  const [formData, setFormData] = useState<Post>(initialState)
  const [isOpenMediaDialog, setIsOpenMediaDialog] = useState<boolean>(false)
  const [tempThumbnail, setTempThumbnail] = useState<string>('')

  const editingPost = useSelector((state: RootState) => state.blog.editingPost)
  const [mediaList, setMediaList] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== null && id !== undefined) {
      dispatch(startEditingPost(+id));
    } else {
      dispatch(startEditingPost(null));
    }
  }, [id])
  
  useEffect(() => {
    setFormData(editingPost || initialState)
  }, [editingPost])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingPost) {

      dispatch(
        updatePost({
          postId: editingPost.id,
          body: formData
        })
      )
        .unwrap()
        .then(() => {
          setFormData(initialState)
          dispatch(getPostList({ page: 1, items_per_page: 10 }))
        })
      // dispatch(finishEditingPost(formData))
    } else {
      try {
        await dispatch(addPost(formData)).unwrap()
        setFormData(initialState)
      } catch (error) {

      }
      // dispatch(addPost(formData))
    }

    setFormData(initialState)
    navigate('/posts')
  }

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // dispatch(cancelEditingPost(null))
  }

  const handleOpen = async () => {
    const responseMedia = await getMediaList()
    setMediaList(responseMedia)
    setIsOpenMediaDialog(true)
  }

  const resetMedia = () => {
    setTempThumbnail('')
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Typography variant="h4" color="blue-gray" className="mb-4">
        { id !== null && id !== undefined ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
      </Typography>
      <div className="mb-6">
        <label
          htmlFor='title'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Tiêu đề
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor='featuredImage'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Hình ảnh bài viết
        </label>
        <input
          type='text'
          id='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Featured Image'
          readOnly
          value={formData.thumbnail}
          required
          onChange={(event) => setFormData((prev) => ({ ...prev, thumbnail: event.target.value }))}
          onClick={() => handleOpen()}
        />
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Chú thích bài viết
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            value={formData.description}
            required
            onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
      </div>
      <div className='mb-6'>
        <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Nôi dung bài viết
        </label>
        <ReactQuill theme="snow" value={formData.content} onChange={(event) => setFormData((prev) => ({ ...prev, content: event }))} />
      </div>
      <div className='mb-6'>
        <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Ngày phát hành
        </label>
        <input
          type='datetime-local'
          id='publishDate'
          className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Publish date'
          value={formData.publish_date[formData.publish_date.length - 1] === 'Z' ? formData.publish_date.slice(0, -3) : formData.publish_date}
          required
          onChange={(event) => setFormData((prev) => ({ ...prev, publish_date: event.target.value }))}
        />
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          checked={formData.publish}
          onChange={(event) => setFormData((prev) => ({ ...prev, publish: event.target.checked }))}
        />
        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Phát hành
        </label>
      </div>
      <div>
        {editingPost && (
          <Fragment>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cập nhật bài viết
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
              onClick={() => { navigate('/posts') }}
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Hủy bỏ
              </span>
            </button>
          </Fragment>
        )}
        {!editingPost && (
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Phát hành bài viết
            </span>
          </button>
        )}
      </div>

      {/* upload media */}
      <Dialog open={isOpenMediaDialog} handler={handleOpen}>
        <DialogHeader>Media</DialogHeader>
        <DialogBody>
          <p>Choose your image</p>
          <div className="imageList">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mediaList.map((media: any, index) => (
                <div className="imageItem" key={index} onClick={() => setTempThumbnail(media.media_url)}>
                  <img
                    className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                    src={media?.media_url || ''}
                    alt="gallery-photo"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setIsOpenMediaDialog(false)
            }}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            if (tempThumbnail) {
              formData.thumbnail = tempThumbnail
            }
            setIsOpenMediaDialog(false)
            resetMedia()
          }}>
            <span>Chấp nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </form>
  )
}