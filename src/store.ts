import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// reducer
import authReducer from "./pages/auth/auth.slice";
import blogReducer from "./pages/blog/blog.thunk";
import userReducer from "./pages/user/user.slice"
import toastReducer from './stores/toast.slice'
export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    user: userReducer,
    toast: toastReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()