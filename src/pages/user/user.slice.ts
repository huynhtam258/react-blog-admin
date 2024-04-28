import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "./user.thunk";
import { User } from "../../types/user.type";

interface UserState {
  userProfile: User | null
}

const initialState: UserState = {
  userProfile: null
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<any>) => {
      state = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload
      })
  }
})

const userReducer = userSlice.reducer
export default userReducer