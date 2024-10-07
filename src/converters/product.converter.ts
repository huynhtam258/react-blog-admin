import { Product, ProductApi } from "../types/product.type";

export const converterProduct = (product: ProductApi): Product => {
  return {
    id: product.id,
    productName: product.product_name,
    productThumb: product.product_thumb,
    productSlug: product.product_slug,
    productDescription: product.product_description,
    productPrice: product.product_price,
    productQuantity: product.product_quantity,
    productType: product.product_type,
    isDraft: product.isDraft,
    isPublish: product.isPublish,
    createdAt: product.created_at
  }
}