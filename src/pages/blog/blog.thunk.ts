import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/http";
import { Post } from './../../types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
  postDetail: Post | null
}

interface CreatePost {
  title: string, 
  description: string, 
  status: number, 
  user: number, 
  content: string, 
  thumbnail: string, 
  publish: boolean,
  publish_date: string
}
const initialState: BlogState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined,
  postDetail: null
}

export const getPostList = createAsyncThunk('blog/getBlogList', async (params: any, thunkApi) => {
  const response = await http.get(`/post?page=${params.page || 1}&items_per_page=${params.items_per_page || 10}`, {
    signal: thunkApi.signal
  })
  return response.data
})

export const getPostDetail = createAsyncThunk('blog/getPostDetail', async (postId: number, thunkApi) => {
  const response = await http.get(`/post/${postId}`, {
    signal: thunkApi.signal
  })
  return response.data
})

export const addPost = createAsyncThunk('blog/addPost', async(body: Post, thunkApi) => {
  try {
    const post = {  
      title: body.title, 
      description: body.description, 
      status: 1, 
      user: 1, 
      content: body.content, 
      thumbnail: body.thumbnail, 
      publish: body.publish ,
      publish_date: body.publish_date
    } as CreatePost
    const response = await http.post('/post', post, {
      signal: thunkApi.signal
    })
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError' && error.response.status === 422) {
      return thunkApi.rejectWithValue(error.response.data)
    }
    throw error
  }

})

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: number, body: Post }, thunkApi) => {
    try {
      const response = await http.put<Post>(`/post/${postId}`, body)
      return response.data
    } catch (error: any) {
      if(error.name === 'AxiosError') {
        return thunkApi.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (postId: number, thunkApi) => {
    const response = await http.patch<Post>(`/post/delete/${postId}`, {
      signal: thunkApi.signal
    })
    return response.data
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        const postList = action.payload.data
        state.postList = postList.map((post: Post) => ({
          ...post,
          thumbnail: post.thumbnail || '/img/image-placeholder.png'
        }))
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(getPostDetail.fulfilled, (state, action) => {
        state.postDetail = action.payload
      })
      // .addCase(updatePost.fulfilled, (state, action) => {
      //   state.postList.find((post, index) => {
      //     if (post.id === action.payload.id) {
      //       state.postList[index] = action.payload
      //     }
      //   })
      //   state.editingPost = null
      // })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.meta.arg
        const deletePostIndex = state.postList.findIndex((post) => post.id === postId)
        if (deletePostIndex !== -1) {
          state.postList.splice(deletePostIndex, 1)
        }
      })
  }
})

export const { cancelEditingPost, startEditingPost } = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer
