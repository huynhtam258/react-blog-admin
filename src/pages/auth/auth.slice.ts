import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface TokenState {
  accessToken: string,
  refreshToken: string
}
const initialState: TokenState = {
  accessToken: '',
  refreshToken: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    }
  }
})

export const { setToken } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer