import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./pages/blog/blog.thunk";
import { useDispatch } from "react-redux";
import authReducer from "./pages/auth/auth.slice";

export const store = configureStore({
    reducer: { blog: blogReducer, auth: authReducer }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()