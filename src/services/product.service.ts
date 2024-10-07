import http from "../utils/http"

export const getProductList = async () => {
  const response = await http.get('/products')
  
  return response.data
}

export const postProduct = async (product: any) => {
  const response = await http.post('/products', { ...product })

  return response
}

export const publishProduct = async (productId: number) => {
  const response = await http.put(`/products/publish/${productId}`)

  return response
}

export const unPublishProduct = async (productId: number) => {
  const response = await http.put(`/products/unpublish/${productId}`)

  return response
}

export const draftProduct = async (productId: number) => {
  const response = await http.put(`/products/draft/${productId}`)

  return response
}