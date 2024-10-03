import { Checkbox, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
// import { Post } from "../../../../types/blog.type"
import { ListBulletIcon } from "@heroicons/react/24/solid"
import { Product } from "../../../../types/product.type"
import { formatVND } from "../../../../utils/currency"
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
          <div className="flex items-center">
            <Checkbox defaultChecked={product.isPublish} crossOrigin={false} />
            <p>Công khai</p>
          </div>
        </Typography>
      </td>
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
        <img
          className="w-100px h-100px object-cover object-center"
          src={product.productThumb}
        />
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          { product.productSlug}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          { product.productType }
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          { formatVND(product.productPrice || 0) }
        </Typography>
      </td>
      <td>
        {/* TODO */}
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
            {/* <MenuItem onClick={() => handleReadMorePost(product.id)}>Read More</MenuItem> */}
            <MenuItem onClick={() => handleEditingPost(product.id)}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={() => handleDelete(product.id)}>Xóa</MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  )
}