import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../store"
import { useEffect } from "react"
import { getPostDetail } from "../blog.thunk"
import { useParams } from "react-router-dom"

export default function BlogDetail() {
  const postDetail = useSelector((state: RootState) => state.blog.postDetail)
  const params = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { id } = params
    dispatch(getPostDetail(Number(id)))
  }, [dispatch])

  function createMarkup() {
    return { __html: postDetail?.content || '' };
  }

  function contentComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img className="mr-4 w-16 h-16 rounded-full" src={postDetail?.user?.avatar || ''} alt="Jese Leos" />
                <div>
                  <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">
                    {postDetail?.user?.first_name} {postDetail?.user?.last_name}
                  </a>
                  {/* <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p> */}
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time title="February 8th, 2022">{postDetail?.updated_at}</time></p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Best practices for successful prototypes</h1>
          </header>
          <p className="lead text-gray-500 text-2xl mt-4 mb-4">
            {postDetail?.description}
          </p>
          <figure>
            <img src={postDetail?.thumbnail} alt="" />
            <figcaption className="text-center text-gray-500">Digital art by Anonymous</figcaption>
          </figure>
          {contentComponent()}
        </article>
      </div>
    </main>
  )
}