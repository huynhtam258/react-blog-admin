import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from "../../../../store"
import PostItem from '../PostItem'
// import { deletePost, startEditingPost } from '../../blog.reducer'
import { useEffect, useState } from 'react'
import { deletePost, getPostList, startEditingPost } from './../../blog.thunk'
import { useNavigate } from 'react-router-dom'

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const [page, setPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const promise = dispatch(getPostList({ page: page, items_per_page: itemsPerPage}))
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleDelete = (postId: number) => {
    dispatch(deletePost(postId))
    dispatch(getPostList({ page: page, items_per_page: itemsPerPage}))
  }
  const handleEditingPost = (postId: number) => {
    dispatch(startEditingPost(postId))
    navigate('editor-blog')
  }
  const handleReadMorePost = (postId: number) => {
    navigate(`/blog/${postId}`)
  }
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-left text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Blog</h2>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {postList.map((post, index) => {
            return <PostItem 
              post={post} 
              handleDelete={handleDelete} 
              handleEditingPost={handleEditingPost}
              handleReadMorePost={handleReadMorePost} 
              key={`postItem-${index}`} 
            />
          })}
        </div>
      </div>
    </div>
  )
}