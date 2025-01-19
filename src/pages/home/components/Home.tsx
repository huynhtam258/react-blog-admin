import { Button, Typography } from "@material-tailwind/react";
import PostList from "../../blog/components/PostList";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const navigate = useNavigate()
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" color="blue-gray">
          Danh sách bài viết
        </Typography>
        
        <Button onClick={() => { navigate('/create-blog') }}>
          <p className='flex items-center gap-1'>Tạo bài viết mới <PlusIcon className="h-5 w-5" /></p>
        </Button>
      </div>
      <PostList />
    </section>
  )
}