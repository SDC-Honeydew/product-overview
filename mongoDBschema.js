let productSchema = {
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [features]
}

let featuresSchema = {
  id: Number,
  product_id: Number,
  feature: String,
  value: String
}

let stylesSchema = {
  style_id: Number,
  product_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: [photos],
  skus: {
    skus
  }
}

let photosSchema = {
  id: Number,
  style_id: Number,
  thumbnail_url: String,
  url: String
}

let skuSchema = {
  style_id: Number,
  sku_number: String,
  quantity: String,
  size: String
}