import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import PostItem from '../PostItem';
import { Card } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { deletePost, getPostList } from './../../blog.thunk';
import { useNavigate } from 'react-router-dom';
import { PAGINATION } from '../../../../enums';
import { DebouncedInput } from '../../../../components/common/input';
import TableHeaderCell from '../../../../components/common/table/TableHeaderCell';
import './PostList.scss'
const PostList = () => {
  const postList = useSelector((state: RootState) => state.blog.postList);

  const [page] = useState<number>(PAGINATION.PAGE);
  const [itemsPerPage] = useState<number>(PAGINATION.ITEM_PER_PAGE);
  const [searchText, setSearchText] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const promise = dispatch(getPostList({ page, items_per_page: itemsPerPage, search: searchText }));
    return () => {
      promise.abort();
    };
  }, [dispatch, page, itemsPerPage, searchText]); // Include 'page' and 'itemsPerPage' in the dependency array

  const handleDelete = (postId: number) => {
    dispatch(deletePost(postId));
    dispatch(getPostList({ page, items_per_page: itemsPerPage }));
  };

  const handleEditingPost = (postId: number) => {
    navigate(`/edit/${postId}`);
  };

  const handleReadMorePost = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  // table
  const TABLE_HEAD = [
    {
      text: 'Tên bài viết',
      className: ''
    }, 
    {
      text: 'Hình ảnh',
      className: ''
    }, 
    {
      text: 'Tác giả',
      className: 'author-col'
    }, 
    {
      text: 'Ngày tạo',
      className: 'date-col'
    }, 
    {
      text: '',
      className: 'menu-col'
    }, 
  ];
  return (
    <>
      <div className='mb-4'>
        <DebouncedInput
          type="text"
          placeholder="Tìm kiếm bài viết"
          value={searchText}
          onChange={(value: string) => setSearchText(value)}
        />
      </div>
      <Card className="h-full w-full overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <TableHeaderCell key={`table-head-${index}`} className={head.className}>
                  {head.text}
                </TableHeaderCell>
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
    </>
  );
}

export default PostList