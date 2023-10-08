import { createAsyncThunk } from "@reduxjs/toolkit";
import http from './../../utils/http'

interface ILogin {
  email: string,
  password: string
}
export const login = createAsyncThunk('auth/login', async ({ email, password }: ILogin, thunkApi) => {
  try {
    const response = await http.post('/auth/login', {
      email, password
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})