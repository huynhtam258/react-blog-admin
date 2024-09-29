import http from "../utils/http"

export const getProductList = async () => {
  const response = await http.get('/products')
  
  return response.data
}

export const postProduct = async (product: any) => {
  const response = await http.post('/products', { ...product })

  return response
}