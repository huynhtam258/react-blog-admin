import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_, thunkApi) => {
    const response = await http.get('/user/profile', {
        signal: thunkApi.signal
    })
    
    return response.data
})