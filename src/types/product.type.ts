export interface Product {
  id: number
  productName: string
  productThumb: string,
  productSlug: string,
  productDescription: string
  productPrice: number,
  productQuantity: number
  productType: string,
  isDraft: false,
  isPublish: true
}

export interface ProductApi {
  id: number
  product_name: string
  product_thumb: string,
  product_slug: string,
  product_description: string
  product_price: number,
  product_quantity: number
  product_type: string,
  isDraft: false,
  isPublish: true
}