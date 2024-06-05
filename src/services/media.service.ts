import http from "../utils/http"

export const getMediaList = async () => {
  const response = await http.get('/media')
  
  return response.data
}

export const postMedia = async (file: any) => {
  const response = await http.post('/media/upload', { file })

  return response
}