import { Button, Card, CardBody, CardFooter, CardHeader, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
import { Post } from "../../../../types/blog.type"

interface PostItemType {
  post: Post,
  handleDelete: (postId: number) => void,
  handleEditingPost: (postId: number) => void
  handleReadMorePost: (postId: number) => void
}

export default function PostItem({ post, handleDelete, handleEditingPost, handleReadMorePost }: PostItemType) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={post.thumbnail}
          loading='lazy'
          alt={post.title}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {post.title}
        </Typography>
        <Typography>
          {post.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <Button className="w-fit">Options</Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => handleEditingPost(post.id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(post.id)}>Delete</MenuItem>
            <MenuItem onClick={() => handleReadMorePost(post.id)}>Read More</MenuItem>
          </MenuList>
        </Menu>
      </CardFooter>
    </Card>
  )
}