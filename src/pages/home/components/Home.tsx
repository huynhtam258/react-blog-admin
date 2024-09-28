import { Typography } from "@material-tailwind/react";
import PostList from "../../blog/components/PostList";

export default function Home() {
  return (
    <>
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Danh sách bài viết
      </Typography>
      <PostList />
    </>
  )
}