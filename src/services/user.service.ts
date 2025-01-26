import http from "../utils/http"

export const updateProfile = async (data: any) => {
  const response = await http.put('/user/profile', { ...data })

  return response.data
}

export const uploadAvatarProfile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await http.patch('/user/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}