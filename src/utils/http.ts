import axios, { AxiosInstance } from 'axios'
import { useNavigate } from "react-router-dom";
import { BASE_KEY } from './../enums/index'

class Http {
  instance: AxiosInstance
  constructor() {
    const token = localStorage.getItem(BASE_KEY.ACCESS_TOKEN)
    const clientKey = localStorage.getItem(BASE_KEY.CLIENT_KEY)
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      timeout: Number(process.env.REACT_APP_TIMEOUT || 0),
      headers: {
        'authorization': `Bearer ${token}`,
        'x-client-id': clientKey
      }
    })

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response.config.url === '/user/profile') {
          localStorage.clear()
          const navigate = useNavigate()
          navigate('/auth/login')
        }
      }
    )
  }
}

const http = new Http().instance

export default http
