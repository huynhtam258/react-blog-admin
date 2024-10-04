import { Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
import { Post } from "../../../../types/blog.type"
import { ListBulletIcon } from "@heroicons/react/24/solid"
import { convertCommonDate } from "../../../../utils/date"

interface PostItemType {
  post: Post,
  classes: string,
  handleDelete: (postId: number) => void,
  handleEditingPost: (postId: number) => void
  handleReadMorePost: (postId: number) => void
}

export default function PostItem({ post, classes, handleDelete, handleEditingPost, handleReadMorePost }: PostItemType) {
  return (
    <tr>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {post.title}
        </Typography>
      </td>
      <td className={classes}>
        <img
          className="w-100px h-100px object-cover object-center"
          src={post.thumbnail}
        />
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {`${post.user?.first_name} ${post.user?.last_name}`}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {convertCommonDate(post.created_at)}
        </Typography>
      </td>
      <td className={classes}>
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <ListBulletIcon width={24}></ListBulletIcon>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => handleReadMorePost(post.id)}>Read More</MenuItem>
            <MenuItem onClick={() => handleEditingPost(post.id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(post.id)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  )
}