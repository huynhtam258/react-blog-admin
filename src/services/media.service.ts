import http from "../utils/http"

export const getMediaList = async () => {
  const response = await http.get('/media')
  
  return response.data
}

export const postMedia = async (file: File) => {
  // Tạo một đối tượng FormData
  const formData = new FormData();
  
  // Append file vào FormData. 'file' là tên trường mà API yêu cầu (thay đổi nếu cần)
  formData.append('file', file);

  // Gửi POST request với FormData
  const response = await http.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Thiết lập header Content-Type
    },
  });

  return response;
};

export const deleteMedia = async (id: string) => {
  const response = await http.patch( `/media/delete/${id}`)

  return response
}