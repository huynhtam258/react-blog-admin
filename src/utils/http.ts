import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    const token = localStorage.getItem('access_token')
    const clientKey = localStorage.getItem('client_key')
    this.instance = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 10000,
      headers: {
        'authorization': `Bearer ${token}`,
        'x-client-id': clientKey
      }
    })
  }
}

const http = new Http().instance

export default http
