import { Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
// import { Post } from "../../../../types/blog.type"
import { ListBulletIcon } from "@heroicons/react/24/solid"
import { Product } from "../../../../types/product.type"
// import { convertCommonDate } from "../../../../utils/date"

interface ProductItemType {
  product: Product,
  classes: string,
  handleDelete: (postId: number) => void,
  handleEditingPost: (postId: number) => void
  handleReadMorePost: (postId: number) => void
}

export default function PostItem({ product, classes, handleDelete, handleEditingPost, handleReadMorePost }: ProductItemType) {
  return (
    <tr>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {product.productName}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          { product.productPrice }
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
            <MenuItem onClick={() => handleReadMorePost(product.id)}>Read More</MenuItem>
            <MenuItem onClick={() => handleEditingPost(product.id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(product.id)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  )
}