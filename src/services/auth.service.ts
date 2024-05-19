import { NavigateFunction } from "react-router-dom"
import { AppDispatch } from "../store"
import { setUserProfile } from "../pages/user/user.slice"
import { setToken } from "../pages/auth/auth.slice"

export const logout = (dispatch: AppDispatch, navigate: NavigateFunction): void => {
	dispatch(setUserProfile({ userProfile: null }))
	dispatch(setToken(''))
	localStorage.clear()

	navigate('/auth/login')
}