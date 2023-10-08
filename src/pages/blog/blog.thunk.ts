import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/http";
import { Post } from './../../types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: BlogState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}

export const getPostList = createAsyncThunk('blog/getBlogList', async (_, thunkApi) => {
  const response = await http.get('/post', {
    signal: thunkApi.signal
  })
  return response.data
})

export const addPost = createAsyncThunk('blog/addPost', async(body: Post, thunkApi) => {
  try {
    const response = await http.post('/post', {  title: body.title, description: body.description, status: 1, user: 1}, {
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
    const response = await http.delete<Post>(`/post/${postId}`, {
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
        state.postList = action.payload.data
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
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
