import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import PostItem from '../PostItem';
import { Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { deletePost, getPostList } from './../../blog.thunk';
import { useNavigate } from 'react-router-dom';

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList);
  const [page] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const promise = dispatch(getPostList({ page, items_per_page: itemsPerPage }));
    return () => {
      promise.abort();
    };
  }, [dispatch, page, itemsPerPage]); // Include 'page' and 'itemsPerPage' in the dependency array

  const handleDelete = (postId: number) => {
    dispatch(deletePost(postId));
    dispatch(getPostList({ page, items_per_page: itemsPerPage }));
  };

  const handleEditingPost = (postId: number) => {
    // dispatch(startEditingPost(postId));
    navigate(`/edit/${postId}`);
  };

  const handleReadMorePost = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  // table
  const TABLE_HEAD = ['Tên bài viết', 'Hình ảnh', 'Tác giả', 'Ngày tạo', ''];

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
          {postList.map((post, index) => {
            const isLast = index === postList.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
            return (
              <PostItem
                post={post}
                classes={classes}
                handleDelete={handleDelete}
                handleEditingPost={handleEditingPost}
                handleReadMorePost={handleReadMorePost}
                key={`postItem-${index}`}
              />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
