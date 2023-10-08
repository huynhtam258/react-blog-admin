import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 10000,
      headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHRhbTI1OEBnbWFpbC5jb20iLCJrZXkiOiJjZTI5NzRjZjY4N2MwZWM3NjMwNiIsImlhdCI6MTY5NjY5NDg5NiwiZXhwIjoxNjk2Njk4NDk2fQ.KoDYVweDeAmEvsImhJMdvXrd5gobd9SFxqXM-xgRoxU',
        'x-api-key': 'ce2974cf687c0ec76306'
      }
    })
  }
}

const http = new Http().instance

export default http
